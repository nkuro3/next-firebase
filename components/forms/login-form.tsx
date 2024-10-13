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
        <div>
          <label htmlFor="email" className="text-gray-500">
            メールアドレス
          </label>
        </div>
        <input
          id="email"
          {...register("email", { required: "この項目は必須です。" })}
          className="border w-full rounded px-2"
        />
        <div className="h-5 text-xs text-red-500">{errors.email && errors.email.message}</div>
      </div>
      <div>
        <div>
          <label htmlFor="password" className="text-gray-500">
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
          className="border w-full rounded px-2"
        />
        <div className="h-5 text-xs text-red-500">{errors.password && errors.password.message}</div>
      </div>
      <div className="text-center">
        <SubmitButton pending={pending}>ログイン</SubmitButton>
      </div>
    </form>
  );
};

export default LoginFrom;
