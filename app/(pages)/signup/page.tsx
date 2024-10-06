import { Metadata } from "next";
import SignupForm from "./signup-form";

const SignupPage = () => {
  return (
    <div>
      <h1 className="mb-10">サインアップ</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;

export const metadata: Metadata = {
  title: "サインアップ"
};
