"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useModal } from "@/hooks/use-modal";
import { deleteFeed, FeedItem, UserData } from "@/lib/firebase/client";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";

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
          <div className="mb-2 font-semibold">こちらのフィードを削除しますか？</div>
          <div>{feed.content}</div>
        </>
      ),
      onOk: async () => {
        startTransition(async () => {
          const isSuccess = await deleteFeed(feed.id);
          await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network latency
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
      <div className="p-6">
        <div className="flex">
          <div className="grow flex space-x-4">
            <img
              src={user.imageUrl}
              alt={`${user.username}'s avatar`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border"
            />
            <div className="w-full">
              <p className="font-bold">{user.username}</p>
              <p className="my-3">{feed.content}</p>
            </div>
          </div>
          <div>
            <Button variant="ghost" size="icon" onClick={handlerDelete}>
              <Trash2 size={20} color="#999" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-end">{feed.createdAt?.toLocaleString()}</p>
      </div>
    </>
  );
};
