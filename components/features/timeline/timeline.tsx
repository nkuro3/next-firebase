"use client";

import { Button } from "@/components/ui/button";
import { useTimeline } from "@/hooks/use-timeline";

const Timeline = () => {
  const { memoizedNewFeeds, handlerShowNewItems, memoizedFeeds, loading, ref, hasMore } = useTimeline();

  return (
    <div className="max-w-2xl mx-auto border-collapse border-x border-b">
      {!!memoizedNewFeeds.length && (
        <div className="max-w-2xl mx-auto border-b">
          <div className="px-5 py-3 text-center">
            <Button link className="text-blue-500" onClick={handlerShowNewItems}>
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
