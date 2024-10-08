"use client";

import useSWRImmutable from "swr/immutable";
import { Button } from "@/components/ui/button";
import { auth, getUserData } from "@/lib/firebase/client";
import dayjs from "@/lib/utils/dayjs";
import MyFeeds from "./my-feeds";

import { Edit } from "lucide-react";

const Profile = () => {
  const docId = auth.currentUser?.uid;
  const { data: user } = useSWRImmutable(["user", docId], () => (docId ? getUserData(docId) : null));

  return (
    <div>
      {user && (
        <>
          <div className="max-w-2xl mx-auto border">
            <div className="flex justify-center gap-5 pt-20">
              <img src={user.imageUrl} alt="profile image" width={80} height={80} className="rounded-full border" />
              <div className="my-auto text-4xl">{user.username}</div>
            </div>
            <div className="m-10 p-5 border rounded-xl shadow flex">
              <div className="grow">
                <h4 className="mb-5">プロフィール</h4>
                <div className="grid grid-cols-3 mb-3">
                  <div className="col-span-1">メールアドレス</div>
                  <div className="col-span-2">{user.email}</div>
                </div>
                <div className="grid grid-cols-3 mb-3">
                  <div className="col-span-1">性別</div>
                  <div className="col-span-2">
                    {user.gender === "male" ? "男性" : user.gender === "female" ? "女性" : "その他"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-1">誕生日</div>
                  <div className="col-span-2">{dayjs(user.birth).format("YYYY年MM月DD日")}</div>
                </div>
              </div>
              <div className="self-end ml-auto">
                <Button size={"sm"}>Edit</Button>
              </div>
            </div>
            <div className="px-5 py-3 border-t flex items-center justify-between">
              <div className="font-semibold">Past Feeds</div>
              <Button size={"sm"}>New Feed</Button>
            </div>
          </div>
          <MyFeeds uid={user.uid} />
        </>
      )}
    </div>
  );
};

export default Profile;
