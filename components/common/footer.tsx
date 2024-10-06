"use client";

import Link from "next/link";
import { TERMS_URL } from "@/lib/constant";
import { Logo } from "./logo";

const Footer = () => {
  return (
    <footer className="p-10 h-80 border border-t flex flex-col items-center justify-center z-10">
      <div className="mb-10">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>
      </div>

      <div className="mb-10 flex flex-col items-center md:flex-row md:divide-x">
        <Link className="px-3 py-1 hover:underline" href={TERMS_URL}>
          利用規約
        </Link>
      </div>

      <div>© 2024</div>
    </footer>
  );
};

export default Footer;
