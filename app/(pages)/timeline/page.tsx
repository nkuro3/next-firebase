import { Metadata } from "next";
import Timeline from "@/components/features/timeline/timeline";

const FeedListPage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">タイムライン</h1>
      <Timeline />
    </div>
  );
};

export default FeedListPage;

export const metadata: Metadata = {
  title: "タイムライン"
};
