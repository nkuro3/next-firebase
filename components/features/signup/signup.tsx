"use client";

import { Alert } from "@/components/common/alert";
import SignupFrom from "@/components/forms/signup-form";
import { useSignup } from "@/hooks/use-signup";

const Signup = () => {
  const { alertState, register, handler, errors, password, email, pending, previewImage, handleImageChange } =
    useSignup();
  const props = { register, handler, errors, password, email, pending, previewImage, handleImageChange };
  return (
    <div className="w-fit">
      <Alert {...alertState} />
      <SignupFrom {...props} />
    </div>
  );
};

export default Signup;
