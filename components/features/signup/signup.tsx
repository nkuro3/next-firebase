"use client";

import { Alert } from "@/components/common/alert";
import SignupFrom from "@/components/forms/signup-form";
import { useSignup } from "@/hooks/use-signup";

const Signup = () => {
  const { alertState, register, handler, errors, password, email, pending, previewImage, handleImageChange } =
    useSignup();
  const props = { register, handler, errors, password, email, pending, previewImage, handleImageChange };
  return (
    <div className="mx-auto max-w-120">
      <Alert {...alertState} />
      <div className="mb-10 border p-7 rounded-lg">
        <SignupFrom {...props} />
      </div>
    </div>
  );
};

export default Signup;
