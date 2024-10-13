"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { LoginInputs } from "@/hooks/use-login";

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
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" className="border" {...register("email", { required: "この項目は必須です。" })} />
        <div className="h-[24px]">{errors.email && errors.email.message}</div>
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <br />
        <input
          className="border"
          type="password"
          {...register("password", {
            required: "この項目は必須です。",
            minLength: { value: 8, message: "パスワードは8文字以上で設定してください。" },
            pattern: {
              value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{3,}$/,
              message: "パスワードは大文字、小文字、数字を含めて設定してください。"
            }
          })}
        />
        <div className="h-[24px]">{errors.password && errors.password.message}</div>
      </div>
      <div className="text-center">
        <SubmitButton pending={pending}>ログイン</SubmitButton>
      </div>
    </form>
  );
};

export default LoginFrom;
