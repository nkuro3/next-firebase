"use client";

import { Alert } from "@/components/common/alert";
import LoginFrom from "@/components/forms/login-form";
import { useLogin } from "@/hooks/use-login";
import styles from "./styles/login.module.css";

const Login = () => {
  const { alertState, register, handler, errors, pending } = useLogin();
  const props = { register, handler, errors, pending };
  return (
    <div className={styles.container}>
      <Alert {...alertState} />
      <div className={styles.formContainer}>
        <LoginFrom {...props} />
      </div>
    </div>
  );
};

export default Login;
