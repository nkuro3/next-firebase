import { Metadata } from "next";
import { Suspense } from "react";
import Profile from "./profile";

const ProfilePage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">マイページ</h1>
      <Suspense fallback={<div>loading...</div>}>
        <Profile />
      </Suspense>
    </div>
  );
};

export default ProfilePage;

export const metadata: Metadata = {
  title: "マイページ"
};
