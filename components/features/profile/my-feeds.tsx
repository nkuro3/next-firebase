"use client";

import { useMyFeeds } from "@/hooks/use-my-feeds";
import styles from "./styles/my-feeds.module.css";

type Props = {
  uid: string;
};

const MyFeeds = ({ uid }: Props) => {
  const { loading, ref, hasMore, memoizedFeeds } = useMyFeeds({ uid });

  return (
    <div className={styles.container}>
      <div>{memoizedFeeds}</div>
      {loading && <div className={styles.loadingText}>Loading more...</div>}
      <div ref={ref}></div>
      {!hasMore && <div className={styles.noMoreText}>これ以上投稿はありません</div>}
    </div>
  );
};

export default MyFeeds;
