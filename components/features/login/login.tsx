"use client";

import { Alert } from "@/components/common/alert";
import LoginFrom from "@/components/forms/login-form";
import { useLogin } from "@/hooks/use-login";

const Login = () => {
  const { alertState, register, handler, errors, pending } = useLogin();
  const props = { register, handler, errors, pending };
  return (
    <div className="mx-auto max-w-120">
      <Alert {...alertState} />
      <div className="mb-10 border p-7 rounded-lg">
        <LoginFrom {...props} />
      </div>
    </div>
  );
};

export default Login;
