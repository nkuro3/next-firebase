import { Metadata } from "next";
import CreateFeedForm from "./create-feed-form";

const CreateFeedPage = () => {
  return (
    <div>
      <h1 className="my-10">フィードを作成</h1>
      <CreateFeedForm />
    </div>
  );
};

export default CreateFeedPage;

export const metadata: Metadata = {
  title: "フィード作成"
};
