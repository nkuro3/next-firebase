import { Metadata } from "next";
import { LinkButton } from "@/components/ui/LinkButton";
import PostFeed from "./post-feed";
import Timeline from "./timeline";

const FeedListPage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">タイムライン</h1>
      <div className="fixed p-7">
        <div className="flex flex-col">
          <LinkButton href="/timeline" variant="transparent" className="font-bold rounded-full">
            ホーム
          </LinkButton>
          <LinkButton href="/profile" variant="transparent" className="font-bold rounded-full">
            プロフィール
          </LinkButton>
        </div>
      </div>
      <div>
        <PostFeed />
        <div className="max-w-2xl mx-auto border">
          <div className="px-5 py-3 font-semibold">Show Latest Feeds</div>
        </div>
        <Timeline />
      </div>
    </div>
  );
};

export default FeedListPage;

export const metadata: Metadata = {
  title: "タイムライン"
};
