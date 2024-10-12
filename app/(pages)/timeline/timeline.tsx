"use client";

import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter
} from "firebase/firestore";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Feed } from "@/components/ui/feed";
import { ITEMS_PER_PAGE } from "@/lib/constant";
import { queryFeedItems, getUserData, FeedItem, UserData, firestore } from "@/lib/firebase/client";

const Timeline = () => {
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
      const { items, lastDoc: newLastDoc } = await queryFeedItems(lastDoc);
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
    () =>
      feedItems
        .map((feed) => (users[feed.authorId] ? <Feed key={feed.id} feed={feed} user={users[feed.authorId]} /> : null))
        .filter(Boolean),
    [feedItems, users]
  );

  const handlerShowNewItems = useCallback(() => {
    if (!newFeedItems.length) return;
    setFeedItems((prevItems) => [...newFeedItems, ...prevItems]);
    setNewFeedItems([]);
  }, [newFeedItems]);

  useEffect(() => {
    if (!latestCreatedAt) return;

    const feedCollection = collection(firestore, "feeds");
    const feedQuery = query(feedCollection, orderBy("createdAt", "asc"), startAfter(latestCreatedAt));

    const unsubscribe = onSnapshot(feedQuery, async (snapshot) => {
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

  return (
    <div className="max-w-2xl mx-auto border-collapse border-x border-b">
      {!!memoizedNewFeeds.length && (
        <div className="max-w-2xl mx-auto border-b">
          <div className="px-5 py-3 text-center">
            <Button variant="link" className="text-blue-500" onClick={handlerShowNewItems}>
              Show more {memoizedNewFeeds.length} feeds
            </Button>
          </div>
        </div>
      )}
      <div>{memoizedFeeds}</div>
      {loading && <div className="py-10 text-gray-400 text-center">Loading more...</div>}
      <div ref={ref}></div>
      {!hasMore && <div className="py-10 text-gray-400 text-center">これ以上投稿はありません</div>}
    </div>
  );
};

export default Timeline;
