"use client";

import FeedList from "@/components/common/feed-list";
import { queryFeedItems } from "@/lib/firebase/client";

type Props = {
  uid: string;
};

const MyFeeds = ({ uid }: Props) => {
  return <FeedList handlerGetFeeds={(doc) => queryFeedItems(doc, uid)} />;
};

export default MyFeeds;
