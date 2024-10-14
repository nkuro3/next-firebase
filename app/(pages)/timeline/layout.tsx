import Menu from "@/components/common/menu";
import styles from "./styles/layout.module.css";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<Props>) => {
  return (
    <>
      <div className={styles.menuContainer}>
        <Menu />
      </div>
      {children}
    </>
  );
};

export default Layout;
