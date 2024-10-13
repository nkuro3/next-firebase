"use client";

import CreateFeedForm from "@/components/forms/create-feed-form";
import { Alert } from "@/components/ui/alert";
import { useCreateFeed } from "@/hooks/use-create-feed";

const CreateFeed = () => {
  const { alertState, user, numOfCharacters, handlerSetNumOfCharacters, register, handler, errors, pending } =
    useCreateFeed();
  const props = { numOfCharacters, handlerSetNumOfCharacters, register, handler, errors, pending };

  if (!user || !user.uid) return null;

  return (
    <div className="mx-auto w-fit">
      <h3 className="my-10">フィードを作成</h3>
      <Alert {...alertState} />
      <CreateFeedForm {...props} />
    </div>
  );
};

export default CreateFeed;
