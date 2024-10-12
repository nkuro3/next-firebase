"use client";

import { onAuthStateChanged } from "firebase/auth";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import useSWRImmtable from "swr/immutable";
import { Button } from "@/components/ui/button";
import { auth, getUserData } from "@/lib/firebase/client";
import dayjs from "@/lib/utils/dayjs";
import EditUserForm from "./edit-user-form";
import MyFeeds from "./my-feeds";
import NewFeedForm from "./new-feed-form";

const Profile = () => {
  const [docId, setDocId] = useState("");
  const { data: user, mutate } = useSWRImmtable(["user", docId], () => (docId ? getUserData(docId) : null));
  const [isOpenNewFeed, setIsOpenNewFeed] = useState(false);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setDocId(currentUser.uid);
      } else {
        setDocId("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user && (
        <>
          <div className="max-w-2xl mx-auto border-x border-b">
            <div className="text-end p-4">
              <Button variant={"ghost"} size={"icon"} onClick={() => setIsOpenEditUser(true)}>
                <Edit color="#aaa" size={26} />
              </Button>
            </div>
            <div className="flex justify-center gap-5">
              <img
                src={user.imageUrl}
                alt="profile image"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border"
              />
              <div className="my-auto text-4xl">{user.username}</div>
            </div>
            <div className="m-10 p-5 border rounded-xl">
              <h4 className="mb-5">プロフィール</h4>
              <div className="flex">
                <div className="grow">
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
              </div>
              {isOpenEditUser && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full z-10">
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-start z-20">
                    <EditUserForm
                      username={user.username}
                      gender={user.gender}
                      birth={user.birth}
                      update={() => {
                        mutate();
                        setIsOpenEditUser(false);
                      }}
                      onCancel={() => setIsOpenEditUser(false)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t flex items-center justify-between">
              <div className="font-semibold">Past Feeds</div>
              <Button size={"sm"} onClick={() => setIsOpenNewFeed(true)}>
                New Feed
              </Button>
              {isOpenNewFeed && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full z-10">
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-start z-20">
                    <NewFeedForm onCancel={() => setIsOpenNewFeed(false)} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <MyFeeds uid={user.uid} />
        </>
      )}
    </div>
  );
};

export default Profile;
