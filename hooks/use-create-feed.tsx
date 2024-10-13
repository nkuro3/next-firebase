"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { createFeedAction } from "@/lib/actions/action-create-feed";
import { useAlert } from "./common/use-alert";

export type CreateFeedFormInputs = {
  content: string;
};

export function useCreateFeed() {
  const router = useRouter();
  const { user } = useAuth();
  const { alertState, showAlert } = useAlert();
  const [numOfCharacters, setNumOfCharacters] = useState(0);
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateFeedFormInputs>();

  const onSubmit: SubmitHandler<CreateFeedFormInputs> = async (data) => {
    startTransition(async () => {
      if (!user || !user.uid) return;
      const { content } = data;
      const isSuccess = createFeedAction.bind(null, user.uid)({ content });
      if (!isSuccess) {
        reset();
        showAlert({ message: "投稿できませんでした。" });
        return;
      }
      router.push("/timeline");
    });
  };

  const handlerSetNumOfCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNumOfCharacters(e.target.value.length);
  };

  return {
    alertState,
    user,
    numOfCharacters,
    handlerSetNumOfCharacters,
    register,
    handler: handleSubmit(onSubmit),
    errors,
    pending
  };
}
