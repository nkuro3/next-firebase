import { Metadata } from "next";
import PostFeed from "./post-feed";
import Timeline from "./timeline";

const FeedListPage = () => {
  return (
    <div>
      <h1 className="my-10 fixed">タイムライン</h1>
      <PostFeed />
      <Timeline />
    </div>
  );
};

export default FeedListPage;

export const metadata: Metadata = {
  title: "タイムライン"
};
