import Image from "next/image";
import { LinkButton } from "@/components/ui/LinkButton";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
      <Image src="/掲示板.png" alt="no image" height={300} width={300} className="self-center" />
      <div className="flex gap-6 mt-10">
        <LinkButton href="/signup" variant="outline" className="rounded-lg">
          Signup
        </LinkButton>
        <LinkButton href="/login" variant="outline" className="rounded-lg">
          ログイン
        </LinkButton>
      </div>
    </div>
  );
}
