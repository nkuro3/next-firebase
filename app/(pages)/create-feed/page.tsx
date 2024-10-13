import { Metadata } from "next";
import Menu from "@/components/common/menu";
import CreateFeed from "@/components/features/create-feed/create-feed";

const CreateFeedPage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">フィードを作成</h1>
      <Menu />
      <CreateFeed />
    </div>
  );
};

export default CreateFeedPage;

export const metadata: Metadata = {
  title: "フィード作成"
};
