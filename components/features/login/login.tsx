"use client";

import LoginFrom from "@/components/forms/login-form";
import { Alert } from "@/components/ui/alert";
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
