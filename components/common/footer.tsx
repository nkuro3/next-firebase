"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { TERMS_URL } from "@/lib/constant";
import { Logo } from "./logo";
import styles from "./styles/footer.module.css";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.logoContainer}>
        <Link className={styles.link} href={user ? "/timeline" : "/"}>
          <Logo />
        </Link>
      </div>

      <div className={styles.linksContainer}>
        <Link className={styles.linkItem} href={TERMS_URL}>
          利用規約
        </Link>
      </div>

      <div>© 2024</div>
    </footer>
  );
};

export default Footer;
