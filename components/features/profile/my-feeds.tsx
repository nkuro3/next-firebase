"use client";

import { useMyFeeds } from "@/hooks/use-my-feeds";

type Props = {
  uid: string;
};

const MyFeeds = ({ uid }: Props) => {
  const { loading, ref, hasMore, memoizedFeeds } = useMyFeeds({ uid });

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
