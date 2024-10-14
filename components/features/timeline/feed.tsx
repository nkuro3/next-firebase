import { FeedItem, UserData } from "@/lib/firebase/client";
import styles from "./styles/feed.module.css";

type Props = {
  feed: FeedItem;
  user: UserData;
};

export const Feed = ({ feed, user }: Props) => {
  return (
    <div className={styles.feedContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.userContainer}>
          <img src={user.imageUrl} alt={`${user.username}'s avatar`} width={40} height={40} className={styles.avatar} />
          <div className={styles.userInfo}>
            <p className={styles.username}>{user.username}</p>
            <p className={styles.content}>{feed.content}</p>
          </div>
        </div>
      </div>
      <p className={styles.timestamp}>{feed.createdAt?.toLocaleString()}</p>
    </div>
  );
};
