"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFetchUser } from "@/hooks/use-fetch-user";
import { MAX_CHARACTERS } from "@/lib/constant";
import { firestore } from "@/lib/firebase/client";

type CreateFeedFormInputs = {
  content: string;
};

const createFeed = async (data: CreateFeedFormInputs, authorId: string) => {
  try {
    const { content } = data;
    const docRef = await addDoc(collection(firestore, "feed"), {
      content,
      authorId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const CreateFeedForm = () => {
  const router = useRouter();
  const { user } = useFetchUser();
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
      const feedId = await createFeed(data, user?.uid);
      if (!feedId) {
        reset();
        return;
      }
      router.push("/");
    });
  };

  if (!user) return null;

  return (
    <div>
      {isFeedSuccess && <div>送信に失敗しました。</div>}
      <Card className="p-5 w-fit">
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
