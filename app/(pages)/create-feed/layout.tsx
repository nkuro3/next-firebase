import Menu from "@/components/common/menu";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<Props>) => {
  return (
    <>
      <div className="hidden lg:block fixed p-7">
        <Menu />
      </div>
      {children}
    </>
  );
};

export default Layout;
