import { LinkButton } from "../ui/LinkButton";

const Menu = () => {
  return (
    <>
      <div className="fixed p-7">
        <div className="flex flex-col">
          <LinkButton href="/timeline" variant="transparent" className="font-bold rounded-full">
            ホーム
          </LinkButton>
          <LinkButton href="/profile" variant="transparent" className="font-bold rounded-full">
            プロフィール
          </LinkButton>
          <LinkButton href="/create-feed" variant="transparent" className="font-bold rounded-full">
            投稿する
          </LinkButton>
        </div>
      </div>
    </>
  );
};

export default Menu;
