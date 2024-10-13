import { Metadata } from "next";
import Login from "@/components/features/login/login";

const LoginPage = () => {
  return (
    <div>
      <h1 className="my-10">ログイン</h1>
      <Login />
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "ログイン"
};
