"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { LoginInputs } from "@/hooks/use-login";
import styles from "./styles/login-form.module.css";

type Props = {
  register: UseFormRegister<LoginInputs>;
  handler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<LoginInputs>;
  pending: boolean;
};

const LoginFrom = ({ register, handler, errors, pending }: Props) => {
  return (
    <form role="form" onSubmit={handler} noValidate>
      <div>
        <div>
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
        </div>
        <input id="email" {...register("email", { required: "この項目は必須です。" })} className={styles.input} />
        <div className={styles.errorText}>{errors.email && errors.email.message}</div>
      </div>
      <div>
        <div>
          <label htmlFor="password" className={styles.label}>
            パスワード
          </label>
        </div>
        <input
          type="password"
          {...register("password", {
            required: "この項目は必須です。",
            minLength: { value: 8, message: "パスワードは8文字以上で設定してください。" },
            pattern: {
              value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{3,}$/,
              message: "パスワードは大文字、小文字、数字を含めて設定してください。"
            }
          })}
          className={styles.input}
        />
        <div className={styles.errorText}>{errors.password && errors.password.message}</div>
      </div>
      <div className={styles.submitContainer}>
        <SubmitButton pending={pending}>ログイン</SubmitButton>
      </div>
    </form>
  );
};

export default LoginFrom;
