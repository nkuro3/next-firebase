import { Metadata } from "next";
import PostFeed from "./post-feed";
import Timeline from "./timeline";

const FeedListPage = () => {
  return (
    <div>
      <h1 className="fixed">タイムライン</h1>
      <div className="mt-10">
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
