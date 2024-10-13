"use client";

import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 h-20 px-5 bg-white border-b border-gray-200 flex items-center justify-between z-10">
      <div>
        <Link className="flex items-center" href={user ? "/timeline" : "/"}>
          <Logo />
        </Link>
      </div>
      <div>
        {!user ? (
          <>
            <Link className="mr-5 hover:underline" href="/signup">
              Signup
            </Link>
            <Link className="hover:underline" href="/login">
              ログイン
            </Link>
          </>
        ) : (
          <Button link onClick={signOut}>
            ログアウト
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
