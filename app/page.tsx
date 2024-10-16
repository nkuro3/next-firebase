import Image from "next/image";
import { LinkButton } from "@/components/ui/link-button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
      <Image src="/掲示板.png" alt="no image" height={300} width={300} className="self-center" />
      <div className="flex gap-6 mt-10">
        <LinkButton href="/signup" variant="outline">
          Signup
        </LinkButton>
        <LinkButton href="/login" variant="outline">
          ログイン
        </LinkButton>
      </div>
    </div>
  );
}
