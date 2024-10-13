"use client";

import { Alert } from "@/components/common/alert";
import CreateFeedForm from "@/components/forms/create-feed-form";
import { useCreateFeed } from "@/hooks/use-create-feed";

const CreateFeed = () => {
  const { alertState, user, numOfCharacters, handlerSetNumOfCharacters, register, handler, errors, pending } =
    useCreateFeed();
  const props = { numOfCharacters, handlerSetNumOfCharacters, register, handler, errors, pending };

  if (!user || !user.uid) return null;

  return (
    <div className="mx-auto max-w-120">
      <h3 className="py-10">フィードを作成</h3>
      <Alert {...alertState} />
      <CreateFeedForm {...props} />
    </div>
  );
};

export default CreateFeed;
