import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="jp">
        <body className="overscroll-none">
          <Header />
          <main className="mt-20 min-h-[calc(100vh-80px)] container">{children}</main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}

export const metadata: Metadata = {
  title: {
    template: "%s | みんなの掲示板",
    default: "みんなの掲示板"
  },
  description: "みんなの掲示板 | 匿名 | Some key words"
};
