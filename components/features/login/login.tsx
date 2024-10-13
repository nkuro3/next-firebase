"use client";

import { Alert } from "@/components/common/alert";
import LoginFrom from "@/components/forms/login-form";
import { useLogin } from "@/hooks/use-login";

const Login = () => {
  const { alertState, register, handler, errors, pending } = useLogin();
  const props = { register, handler, errors, pending };
  return (
    <div className="w-fit">
      <Alert {...alertState} />
      <LoginFrom {...props} />
    </div>
  );
};

export default Login;
