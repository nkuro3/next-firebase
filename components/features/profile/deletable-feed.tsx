"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/common/use-modal";
import { deleteFeed, FeedItem, UserData } from "@/lib/firebase/client";
import styles from "./styles/deletable-feed.module.css";

type Props = {
  feed: FeedItem;
  user: UserData;
};

export const DeletableFeed = ({ feed, user }: Props) => {
  const [pending, startTransition] = useTransition();
  const { modalState, showModal, closeModal } = useModal();

  const handlerDelete = async () => {
    showModal({
      title: "削除",
      message: (
        <>
          <div className={styles.deleteMessage}>こちらのフィードを削除しますか？</div>
          <div>{feed.content}</div>
        </>
      ),
      onOk: async () => {
        startTransition(async () => {
          const isSuccess = await deleteFeed(feed.id);
          if (isSuccess) window.location.reload();
          closeModal();
        });
      },
      onCancel: closeModal
    });
  };

  return (
    <>
      <Modal {...modalState} pending={pending} />
      <div className={styles.feedContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.userContainer}>
            <img
              src={user.imageUrl}
              alt={`${user.username}'s avatar`}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.content}>{feed.content}</p>
            </div>
          </div>
          <div>
            <Button variant="none" size="icon" onClick={handlerDelete}>
              <Trash2 size={20} color="#999" />
            </Button>
          </div>
        </div>
        <p className={styles.timestamp}>{feed.createdAt?.toLocaleString()}</p>
      </div>
    </>
  );
};
