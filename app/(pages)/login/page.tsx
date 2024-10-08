import { Metadata } from "next";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <div>
      <h1 className="my-10">ログイン</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "ログイン"
};
