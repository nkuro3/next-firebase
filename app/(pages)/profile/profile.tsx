"use client";

import { doc, getDoc } from "firebase/firestore";
import useSWRImmutable from "swr/immutable";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { auth, firestore } from "@/lib/firebase/client";
import dayjs from "@/lib/utils/dayjs";

const fetchUser = async (docId: string) => {
  const userDocRef = doc(firestore, "users", docId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) return null;
  return userDoc.data();
};

const Profile = () => {
  const docId = auth.currentUser?.uid;
  const { data: user } = useSWRImmutable(["user", docId], () => (docId ? fetchUser(docId) : null));

  return (
    <div>
      {user && (
        <>
          <div className="flex justify-center gap-5 my-20">
            <img src={user.imageUrl} alt="profile image" width={80} height={80} className="rounded-full border" />
            <div className="my-auto text-4xl">{user.username}</div>
          </div>
          <Card className="p-7 w-[80%] mx-auto">
            <CardTitle className="mb-5">プロフィール</CardTitle>
            <CardContent>
              <div className="grid grid-cols-5 mb-3">
                <div className="col-span-2">メールアドレス</div>
                <div className="col-span-3">{user.email}</div>
              </div>
              <div className="grid grid-cols-5 mb-3">
                <div className="col-span-2">性別</div>
                <div className="col-span-3">
                  {user.gender === "male" ? "男性" : user.gender === "female" ? "女性" : "その他"}
                </div>
              </div>
              <div className="grid grid-cols-5">
                <div className="col-span-2">誕生日</div>
                <div className="col-span-3">{dayjs(user.birth).format("YYYY年MM月DD日")}</div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Profile;
