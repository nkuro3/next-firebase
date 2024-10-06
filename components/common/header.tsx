"use client";

import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { useFetchUser } from "@/hooks/use-fetch-user";

const Header = () => {
  const { user, signOut } = useFetchUser();

  return (
    <header className="sticky top-0 h-20 px-5 bg-white shadow-lg flex items-center justify-between z-10">
      <div>
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>
      </div>
      <div>
        {!user ? (
          <>
            <Link className="mr-5 hover:underline" href="/signup">
              サインアップ
            </Link>
            <Link className="hover:underline" href="/login">
              ログイン
            </Link>
          </>
        ) : (
          <Button className="hover:underline" variant={"link"} onClick={signOut}>
            ログアウト
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
