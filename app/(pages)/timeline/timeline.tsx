"use client";

import FeedList from "@/components/common/feed-list";
import { queryFeedItems } from "@/lib/firebase/client";

const Timeline = () => {
  return <FeedList handlerGetFeeds={queryFeedItems} />;
};

export default Timeline;
