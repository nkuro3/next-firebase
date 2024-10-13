import { Metadata } from "next";
import Signup from "@/components/features/signup/signup";

const SignupPage = () => {
  return (
    <div>
      <h1 className="my-10">サインアップ</h1>
      <Signup />
    </div>
  );
};

export default SignupPage;

export const metadata: Metadata = {
  title: "サインアップ"
};
