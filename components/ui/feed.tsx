import { FeedItem, UserData } from "@/lib/firebase/client";

type Props = {
  feed: FeedItem;
  user: UserData;
};

export const Feed = ({ feed, user }: Props) => {
  return (
    <div className="flex items-start space-x-4 p-4 border-b">
      <img src={user.imageUrl} alt={`${user.username}'s avatar`} width={40} height={40} className="rounded-full" />
      <div>
        <p className="font-bold">{user.username}</p>
        <p>{feed.content}</p>
        <p className="text-sm text-gray-500">{feed.createdAt.toLocaleString()}</p>
      </div>
    </div>
  );
};
