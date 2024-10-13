"use client";

import { Edit } from "lucide-react";
import { Alert } from "@/components/common/alert";
import MyFeeds from "@/components/features/profile/my-feeds";
import EditUserForm from "@/components/forms/edit-user-form";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import dayjs from "@/lib/utils/dayjs";

const Profile = () => {
  const {
    isOpenEditUser,
    setIsOpenEditUser,
    user,
    alertState,
    register,
    handler,
    errors,
    pending,
    previewImage,
    handleImageChange,
    handlerCloseEditUser
  } = useProfile();
  const editUserProps = { register, handler, errors, pending, previewImage, handleImageChange };

  return (
    <div>
      {user && (
        <>
          <div className="max-w-2xl mx-auto border-x border-b">
            <div className="text-end p-4">
              <Button variant="none" size="icon" onClick={() => setIsOpenEditUser(true)}>
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
                    <div className="col-span-3 sm:col-span-1 text-gray-500">メールアドレス</div>
                    <div className="col-span-2">{user.email}</div>
                  </div>
                  <div className="grid grid-cols-3 mb-3">
                    <div className="col-span-3 sm:col-span-1 text-gray-500">性別</div>
                    <div className="col-span-2">
                      {user.gender === "male" ? "男性" : user.gender === "female" ? "女性" : "その他"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="col-span-3 sm:col-span-1 text-gray-500">誕生日</div>
                    <div className="col-span-2">{dayjs(user.birth).format("YYYY年MM月DD日")}</div>
                  </div>
                </div>
              </div>
              {isOpenEditUser && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full z-10">
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-start z-20">
                    <div className="bg-white p-7 rounded-lg border max-w-[92%] mx-auto">
                      <Alert {...alertState} />
                      <EditUserForm onCancel={handlerCloseEditUser} {...editUserProps} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t">
              <div className="font-semibold">Past Feeds</div>
            </div>
          </div>
          <MyFeeds uid={user.uid} />
        </>
      )}
    </div>
  );
};

export default Profile;
