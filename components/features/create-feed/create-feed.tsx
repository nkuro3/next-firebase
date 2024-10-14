"use client";

import { Alert } from "@/components/common/alert";
import CreateFeedForm from "@/components/forms/create-feed-form";
import { useCreateFeed } from "@/hooks/use-create-feed";
import styles from "./styles/create-feed.module.css";

const CreateFeed = () => {
  const { alertState, user, numOfCharacters, handlerSetNumOfCharacters, register, handler, errors, pending } =
    useCreateFeed();
  const props = { numOfCharacters, handlerSetNumOfCharacters, register, handler, errors, pending };

  if (!user || !user.uid) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>フィードを作成</h3>
      <Alert {...alertState} />
      <CreateFeedForm {...props} />
    </div>
  );
};

export default CreateFeed;
