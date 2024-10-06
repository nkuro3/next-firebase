"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { auth } from "@/lib/firebase/client";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [isLoginFaled, setIsLoginFaled] = useState(false);
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    startTransition(async () => {
      const userCredencial = await signInWithEmailAndPassword(auth, data.email, data.password).catch((e) => {
        console.error(e);
        reset();
        setIsLoginFaled(true);
        setTimeout(() => {
          setIsLoginFaled(false);
        }, 3000);
      });
      if (!userCredencial) return;
      router.push("/");
    });
  };

  return (
    <div>
      {isLoginFaled && <div>ユーザーが存在しません。</div>}
      <Card className="p-5 w-fit">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <div className="mt-5 text-right">
            <SubmitButton pending={pending}>ログイン</SubmitButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
