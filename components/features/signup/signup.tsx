"use client";

import { Alert } from "@/components/common/alert";
import SignupFrom from "@/components/forms/signup-form";
import { useSignup } from "@/hooks/use-signup";
import styles from "./styles/signup.module.css";

const Signup = () => {
  const { alertState, register, handler, errors, password, email, pending, previewImage, handleImageChange } =
    useSignup();
  const props = { register, handler, errors, password, email, pending, previewImage, handleImageChange };
  return (
    <div className={styles.container}>
      <Alert {...alertState} />
      <div className={styles.formContainer}>
        <SignupFrom {...props} />
      </div>
    </div>
  );
};

export default Signup;
