import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"container p-10"}>{children}</body>
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
