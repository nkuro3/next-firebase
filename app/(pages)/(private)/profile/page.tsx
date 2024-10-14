import { Metadata } from "next";
import { Suspense } from "react";
import Profile from "@/components/features/profile/profile";

const ProfilePage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">マイページ</h1>
      <Suspense
        fallback={
          <div className="min-h-[calc(100vh-80px)] flex items-center justify-center text-gray-400">Loading...</div>
        }
      >
        <Profile />
      </Suspense>
    </div>
  );
};

export default ProfilePage;

export const metadata: Metadata = {
  title: "マイページ"
};
