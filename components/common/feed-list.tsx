"use client";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { Feed } from "@/components/ui/feed";
import { ITEMS_PER_PAGE } from "@/lib/constant";
import { getUserData, FeedItem, UserData, QueryFeedItemsResponse } from "@/lib/firebase/client";

type Props = {
  handlerGetFeeds: (lastDoc?: QueryDocumentSnapshot) => Promise<QueryFeedItemsResponse>;
};

const FeedList = ({ handlerGetFeeds }: Props) => {
  const [loading, setLoading] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

  const loadMoreFeed = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network latency
      const { items, lastDoc: newLastDoc } = await handlerGetFeeds(lastDoc);
      setLastDoc(newLastDoc);
      setFeedItems((prevItems) => [...prevItems, ...items]);
      setHasMore(items.length === ITEMS_PER_PAGE);

      const newUserIds = items.map((item) => item.authorId).filter((id) => !users[id]);
      const uniqueNewUserIds = Array.from(new Set(newUserIds));
      const newUsers = await Promise.all(uniqueNewUserIds.map(getUserData));
      setUsers((prevUsers) => ({
        ...prevUsers,
        ...Object.fromEntries(newUsers.filter(Boolean).map((user) => [user!.uid, user!]))
      }));
    } catch (error) {
      console.error("Error loading feed items:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastDoc, users, handlerGetFeeds]);

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

  return (
    <div className="max-w-2xl mx-auto border-collapse border-x border-b">
      {memoizedFeeds}
      {loading && <div className="py-10 text-gray-400 text-center">Loading more...</div>}
      <div ref={ref}></div>
      {!hasMore && <div className="py-10 text-gray-400 text-center">これ以上投稿はありません</div>}
    </div>
  );
};

export default FeedList;
