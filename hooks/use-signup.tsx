"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAlert } from "@/hooks/common/use-alert";
import { signupAction } from "@/lib/actions/action-signup";

export type SignupInputs = {
  username: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
  birth: string;
  gender: string;
  isAgreeTerms: boolean;
};

export const useSignup = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { alertState, showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<SignupInputs>();
  const password = watch("password");
  const email = watch("email");
  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const { username, email, confirmEmail, password, confirmPassword, profileImage, birth, gender, isAgreeTerms } =
      data;

    const buffer = Buffer.from(await profileImage[0].arrayBuffer());
    const base64 = buffer.toString("base64");

    startTransition(async () => {
      const isSuccess = await signupAction({
        username,
        email,
        confirmEmail,
        password,
        confirmPassword,
        birth,
        gender,
        isAgreeTerms,
        profileImage: base64
      });

      if (!isSuccess) {
        reset();
        showAlert({ message: "サインアップできませんでした。" });
        return;
      }

      router.push("/login");
    });
  };
  const [previewImage, setPreviewImage] = useState("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return {
    alertState,
    register,
    handler: handleSubmit(onSubmit),
    errors,
    password,
    email,
    pending,
    previewImage,
    handleImageChange
  };
};
