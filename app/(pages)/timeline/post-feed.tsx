"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
    const docRef = await addDoc(collection(firestore, "feeds"), {
      content,
      authorId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const PostFeed = () => {
  const router = useRouter();
  const { user } = useFetchUser();
  const [numOfCharacters, setNumOfCharacters] = useState(0);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<CreateFeedFormInputs>();
  const watchContent = watch("content");

  const onSubmit: SubmitHandler<CreateFeedFormInputs> = async (data) => {
    startTransition(async () => {
      if (!user || !user.uid) return;
      const feedId = await createFeed(data, user.uid);
      if (!feedId) {
        reset();
        return;
      }
      router.push("/");
    });
  };

  const autoResize = useCallback((element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    autoResize(textarea);
  }, [watchContent, autoResize]);

  useEffect(() => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (textarea) textarea.focus();
  }, []);

  return (
    <div className="max-w-2xl mx-auto border">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex p-4 ">
          <img src={user?.imageUrl} alt="User avatar" className="w-12 h-12 rounded-full mr-4" />
          <div className="flex-grow">
            <textarea
              id="content"
              {...register("content", {
                required: "この項目は必須です。",
                maxLength: { value: MAX_CHARACTERS, message: `${MAX_CHARACTERS}文字以内で入力してください。` }
              })}
              placeholder="What is happening?!"
              className="w-full p-2 border-none outline-none resize-none overflow-hidden whitespace-pre-wrap"
              onChange={(e) => {
                setValue("content", e.target.value);
                setNumOfCharacters(e.target.value.length);
              }}
              rows={1}
            />
            {errors.content && <div className="text-red-500 mt-2">{errors.content.message}</div>}
            <div className="flex items-center justify-end gap-4 mt-2">
              <span className={`text-sm ${numOfCharacters > MAX_CHARACTERS ? "text-red-500" : "text-gray-500"}`}>
                {numOfCharacters} / {MAX_CHARACTERS}
              </span>
              <SubmitButton
                size="sm"
                pending={pending}
                disabled={numOfCharacters > MAX_CHARACTERS || numOfCharacters === 0}
              >
                送信
              </SubmitButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostFeed;
