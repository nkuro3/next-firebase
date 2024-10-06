import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href="/login">ログイン</Link>
      <Link href="/signup">サインアップ</Link>
    </div>
  );
}
