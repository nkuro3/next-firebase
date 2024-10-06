import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className="overscroll-y-none">
        <main className="min-h-screen p-20">{children}</main>
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
