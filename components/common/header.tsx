"use client";

import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import styles from "./styles/header.module.css";

const Header = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={user ? "/timeline" : "/"}>
          <Logo />
        </Link>
        <div className={styles.desktopMenu}>
          {!user ? (
            <>
              <Link className={styles.link} href="/login">
                ログイン
              </Link>
              <Link className={styles.link} href="/signup">
                サインアップ
              </Link>
            </>
          ) : (
            <Button link onClick={signOut} className={styles.logoutButton}>
              ログアウト
            </Button>
          )}
        </div>
        <div className={styles.mobileMenuButton}>
          <Button
            variant="none"
            size="icon"
            onClick={() => {
              setIsOpenMenu(!isOpenMenu);
            }}
          >
            <Menu size={32} color="#777" />
          </Button>
        </div>
      </div>
      <div className={styles.mobileMenuContainer}>
        <div className={`${styles.mobileMenu} ${isOpenMenu ? styles.mobileMenuOpen : styles.mobileMenuClosed}`}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileLinksContainer}>
              {!user ? (
                <>
                  <Link className={styles.link} href="/login">
                    ログイン
                  </Link>
                  <Link className={styles.link} href="/signup">
                    サインアップ
                  </Link>
                </>
              ) : (
                <>
                  <Link className={styles.link} href="/timeline">
                    タイムライン
                  </Link>
                  <Link className={styles.link} href="/profile">
                    プロフィール
                  </Link>
                  <Link className={styles.link} href="/create-feed">
                    投稿する
                  </Link>
                  <Button link onClick={signOut} className={styles.logoutButtonMobile}>
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
              className={styles.toggleButton}
            >
              {isOpenMenu ? <ChevronUp size={20} color="#aaa" /> : <ChevronDown size={20} color="#aaa" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
