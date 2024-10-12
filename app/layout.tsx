import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className="overscroll-y-none">
        <Header />
        <main className="min-h-[calc(100vh-80px)] px-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: "%s | みんなの掲示板",
    default: "みんなの掲示板"
  },
  description: "みんなの掲示板 | 匿名 | Some key words"
};
