import { LinkButton } from "../ui/link-button";
import styles from "./styles/menu.module.css";

const Menu = () => {
  return (
    <div className={styles.menuContainer}>
      <LinkButton href="/timeline" variant="transparent" className={styles.linkButton}>
        タイムライン
      </LinkButton>
      <LinkButton href="/profile" variant="transparent" className={styles.linkButton}>
        プロフィール
      </LinkButton>
      <LinkButton href="/create-feed" variant="transparent" className={styles.linkButton}>
        投稿する
      </LinkButton>
    </div>
  );
};

export default Menu;
