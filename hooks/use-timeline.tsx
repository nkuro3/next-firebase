"use client";

import { DocumentData, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { Feed } from "@/components/features/timeline/feed";
import { ITEMS_PER_PAGE } from "@/lib/constant";
import { fetchFeedItems, getUserData, FeedItem, UserData, queryRealtimeFeedItems } from "@/lib/firebase/client";

export const useTimeline = () => {
  const [loading, setLoading] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

  const [newFeedItems, setNewFeedItems] = useState<FeedItem[]>([]);
  const [latestCreatedAt, setLatestCreatedAt] = useState<Date | null>(null);

  const fetchUsers = useCallback(async (newUserIds: string[]) => {
    const uniqueNewUserIds = Array.from(new Set(newUserIds));
    const newUsers = await Promise.all(uniqueNewUserIds.map(getUserData));
    setUsers((prevUsers) => ({
      ...prevUsers,
      ...Object.fromEntries(newUsers.filter(Boolean).map((user) => [user!.uid, user!]))
    }));
  }, []);

  const loadMoreFeed = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network latency
      const { items, lastDoc: newLastDoc } = await fetchFeedItems(lastDoc);
      setLastDoc(newLastDoc);
      setFeedItems((prevItems) => [...prevItems, ...items]);
      setHasMore(items.length === ITEMS_PER_PAGE);
      if (!latestCreatedAt) {
        setLatestCreatedAt(items[0].createdAt);
      }

      const newUserIds = items.map((item) => item.authorId).filter((id) => !users[id]);
      await fetchUsers(newUserIds);
    } catch (error) {
      console.error("Error loading feed items:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastDoc, users, fetchUsers, latestCreatedAt]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreFeed();
    }
  }, [inView, hasMore, loadMoreFeed]);

  const memoizedFeeds = useMemo(
    () => (
      <>
        {feedItems
          .map((feed) =>
            users[feed.authorId] ? (
              <div key={feed.id}>
                <Feed feed={feed} user={users[feed.authorId]} />
              </div>
            ) : null
          )
          .filter(Boolean)}
      </>
    ),
    [feedItems, users]
  );

  const handlerShowNewItems = useCallback(() => {
    if (!newFeedItems.length) return;
    setFeedItems((prevItems) => [...newFeedItems, ...prevItems]);
    setNewFeedItems([]);
  }, [newFeedItems]);

  useEffect(() => {
    if (!latestCreatedAt) return;

    const query = queryRealtimeFeedItems(latestCreatedAt);
    const unsubscribe = onSnapshot(query, async (snapshot) => {
      const newItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as FeedItem[];
      const newUserIds = newItems.map((item) => item.authorId).filter((id) => !users[id]);
      await fetchUsers(newUserIds);
      if (newItems.length > 0) {
        const sortedItems = newItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setNewFeedItems((prevItems) => [...sortedItems, ...prevItems]);
        setLatestCreatedAt(sortedItems[0].createdAt);
      }
    });

    return () => unsubscribe();
  }, [latestCreatedAt, setLatestCreatedAt, fetchUsers, users]);

  const memoizedNewFeeds = useMemo(
    () =>
      newFeedItems
        .map((feed) => (users[feed.authorId] ? <Feed key={feed.id} feed={feed} user={users[feed.authorId]} /> : null))
        .filter(Boolean),
    [newFeedItems, users]
  );

  return {
    memoizedNewFeeds,
    handlerShowNewItems,
    memoizedFeeds,
    loading,
    ref,
    hasMore
  };
};
