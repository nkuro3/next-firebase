"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAlert } from "@/hooks/common/use-alert";
import { loginAction } from "@/lib/actions/action-login";
import { auth } from "@/lib/firebase/client";

export type LoginInputs = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { alertState, showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { email, password } = data;
    startTransition(async () => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      if (!idToken) {
        showAlert({ message: "ユーザーが存在しません。" });
        return;
      }
      const isSuccess = await loginAction({ idToken });

      if (!isSuccess) {
        showAlert({ message: "ログインできませんでした。" });
        reset();
        return;
      }

      router.push("/timeline");
    });
  };

  return {
    alertState,
    register,
    handler: handleSubmit(onSubmit),
    errors,
    pending
  };
};
