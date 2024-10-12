"use client";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { DeletableFeed } from "@/app/(pages)/profile/deletable-feed";
import { ITEMS_PER_PAGE } from "@/lib/constant";
import { queryFeedItems, getUserData, FeedItem, UserData } from "@/lib/firebase/client";

type Props = {
  uid: string;
};

const MyFeeds = ({ uid }: Props) => {
  const [loading, setLoading] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

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
      const { items, lastDoc: newLastDoc } = await queryFeedItems(lastDoc, uid);
      setLastDoc(newLastDoc);
      setFeedItems((prevItems) => [...prevItems, ...items]);
      setHasMore(items.length === ITEMS_PER_PAGE);
      const newUserIds = items.map((item) => item.authorId).filter((id) => !users[id]);
      await fetchUsers(newUserIds);
    } catch (error) {
      console.error("Error loading feed items:", error);
    } finally {
      setLoading(false);
    }
  }, [uid, loading, hasMore, lastDoc, users, fetchUsers]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreFeed();
    }
  }, [inView, hasMore, loadMoreFeed]);

  const memoizedFeeds = useMemo(
    () =>
      feedItems
        .map((feed) =>
          users[feed.authorId] ? (
            <div key={feed.id} className="border-b">
              <DeletableFeed feed={feed} user={users[feed.authorId]} />
            </div>
          ) : null
        )
        .filter(Boolean),
    [feedItems, users]
  );

  return (
    <div className="max-w-2xl mx-auto border-collapse border-x border-b">
      <div>{memoizedFeeds}</div>
      {loading && <div className="py-10 text-gray-400 text-center">Loading more...</div>}
      <div ref={ref}></div>
      {!hasMore && <div className="py-10 text-gray-400 text-center">これ以上投稿はありません</div>}
    </div>
  );
};

export default MyFeeds;
