"use client";

import { Button } from "@/components/ui/button";
import { useTimeline } from "@/hooks/use-timeline";
import styles from "./styles/timeline.module.css";

const Timeline = () => {
  const { memoizedNewFeeds, handlerShowNewItems, memoizedFeeds, loading, ref, hasMore } = useTimeline();

  return (
    <div className={styles.timelineContainer}>
      {!!memoizedNewFeeds.length && (
        <div className={styles.newFeedsContainer}>
          <div className={styles.showMoreButtonContainer}>
            <Button link className={styles.showMoreButton} onClick={handlerShowNewItems}>
              Show more {memoizedNewFeeds.length} feeds
            </Button>
          </div>
        </div>
      )}
      <div>{memoizedFeeds}</div>
      {loading && <div className={styles.loadingText}>Loading more...</div>}
      <div ref={ref}></div>
      {!hasMore && <div className={styles.noMoreText}>これ以上投稿はありません</div>}
    </div>
  );
};

export default Timeline;
