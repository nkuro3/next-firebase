import { Metadata } from "next";
import { Suspense } from "react";
import Menu from "@/components/common/menu";
import Profile from "@/components/features/profile/profile";

const ProfilePage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">マイページ</h1>
      <Menu />
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
