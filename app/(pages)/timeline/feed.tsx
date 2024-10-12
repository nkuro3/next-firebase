import { FeedItem, UserData } from "@/lib/firebase/client";

type Props = {
  feed: FeedItem;
  user: UserData;
};

export const Feed = ({ feed, user }: Props) => {
  return (
    <div className="p-6">
      <div className="flex">
        <div className="grow flex space-x-4">
          <img
            src={user.imageUrl}
            alt={`${user.username}'s avatar`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border"
          />
          <div className="w-full">
            <p className="font-bold">{user.username}</p>
            <p className="my-3">{feed.content}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-end">{feed.createdAt?.toLocaleString()}</p>
    </div>
  );
};
