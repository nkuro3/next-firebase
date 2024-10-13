"use client";

import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <header className="fixed w-full top-0 min-h-20 px-5 bg-white shadow border-gray-200 z-10">
      <div className="flex justify-between items-center h-20">
        <Link href={user ? "/timeline" : "/"}>
          <Logo />
        </Link>
        <div className="hidden lg:flex items-center space-x-4 text-gray-500">
          {!user ? (
            <>
              <Link className="hover:underline" href="/login">
                ログイン
              </Link>
              <Link className="hover:underline" href="/signup">
                サインアップ
              </Link>
            </>
          ) : (
            <Button link onClick={signOut} className="text-gray-500">
              ログアウト
            </Button>
          )}
        </div>
        <div className="lg:hidden flex flex-col items-end">
          <div className="flex items-center">
            <Button
              variant="none"
              size="icon"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
              className="flex"
            >
              <Menu size={32} color="#777" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center lg:hidden">
        <div
          className={`overflow-hidden transition-all duration-0 w-full ${isOpenMenu ? "max-h-40 duration-500" : "max-h-0"}`}
        >
          <div className="mb-5 flex justify-between text-gray-500">
            <div className="flex flex-col space-y-2">
              {!user ? (
                <>
                  <Link className="hover:underline" href="/login">
                    ログイン
                  </Link>
                  <Link className="hover:underline" href="/signup">
                    サインアップ
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/timeline">タイムライン</Link>
                  <Link href="/profile">プロフィール</Link>
                  <Link href="/create-feed">投稿する</Link>
                  <Button link onClick={signOut} className="text-start text-gray-500">
                    ログアウト
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="none"
              size="icon"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
              className="flex justify-center my-atuo self-center"
            >
              {isOpenMenu ? (
                <ChevronUp size={20} color="#aaa" className="my-auto w-8" />
              ) : (
                <ChevronDown size={20} color="#aaa" className="my-auto w-8" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
