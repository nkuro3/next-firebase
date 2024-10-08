import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href="/login">ログイン</Link>
      <Link href="/signup">サインアップ</Link>
      <Link href="/profile">マイページ</Link>
      <Link href="/feed/create">フィード作成</Link>
      <Link href="/timeline">タイムライン</Link>
    </div>
  );
}
