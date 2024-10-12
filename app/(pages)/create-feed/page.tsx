import { Metadata } from "next";
import Menu from "@/components/common/menu";
import CreateFeedForm from "./create-feed-form";

const CreateFeedPage = () => {
  return (
    <div>
      <h1 className="h-0 opacity-0">フィードを作成</h1>
      <Menu />
      <CreateFeedForm />
    </div>
  );
};

export default CreateFeedPage;

export const metadata: Metadata = {
  title: "フィード作成"
};
