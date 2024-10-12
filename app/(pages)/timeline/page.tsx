import { Metadata } from "next";
import Menu from "@/components/common/menu";
import Timeline from "./timeline";

const FeedListPage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">タイムライン</h1>
      <Menu />
      <Timeline />
    </div>
  );
};

export default FeedListPage;

export const metadata: Metadata = {
  title: "タイムライン"
};
