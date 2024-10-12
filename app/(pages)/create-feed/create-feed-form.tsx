"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { useAuth } from "@/hooks/use-auth";
import { MAX_CHARACTERS } from "@/lib/constant";
import { createFeed } from "@/lib/firebase/client";

type CreateFeedFormInputs = {
  content: string;
};

const CreateFeedForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [numOfCharacters, setNumOfCharacters] = useState(0);
  const [isFeedSuccess] = useState(false);
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
      const feedId = await createFeed(content, user.uid);
      if (!feedId) {
        reset();
        return;
      }
      router.push("/timeline");
    });
  };

  if (!user || !user.uid) return null;

  return (
    <div className="mx-auto w-fit">
      <h3 className="my-10">フィードを作成</h3>
      {isFeedSuccess && <div>送信に失敗しました。</div>}
      <Card className="p-5 ">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <div className="flex justify-between">
              <label htmlFor="content">内容</label>
              <div>
                <span className={numOfCharacters > MAX_CHARACTERS ? "text-red-500" : ""}>{numOfCharacters}</span> /{" "}
                {MAX_CHARACTERS}
              </div>
            </div>
            <textarea
              id="content"
              className="border rounded w-120 h-32"
              {...register("content", {
                required: "この項目は必須です。",
                maxLength: { value: MAX_CHARACTERS, message: `${MAX_CHARACTERS}文字以内で入力してください。` }
              })}
              onChange={(e) => setNumOfCharacters(e.target.value.length)}
            />
          </div>
          <div className="mt-5 text-right">
            <SubmitButton pending={pending} disabled={numOfCharacters > MAX_CHARACTERS || numOfCharacters === 0}>
              送信
            </SubmitButton>
          </div>
          <div>{errors.content && errors.content.message}</div>
        </form>
      </Card>
    </div>
  );
};

export default CreateFeedForm;
