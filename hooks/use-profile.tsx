"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAlert } from "@/hooks/common/use-alert";
import { editUserAction } from "@/lib/actions/action-edit-user";
import { useFetchUser } from "./use-fetch-user";

export type EditUserInputs = {
  username: string;
  profileImage: FileList | undefined;
  birth: string;
  gender: string;
};

export const useProfile = () => {
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { user, mutate } = useFetchUser();
  const [pending, startTransition] = useTransition();
  const { alertState, showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EditUserInputs>();
  const onSubmit: SubmitHandler<EditUserInputs> = async (data) => {
    if (!user?.uid) {
      setIsOpenEditUser(false);
      return;
    }
    const { username, profileImage, birth, gender } = data;

    if (!username && !profileImage?.length && !birth && !gender) {
      setIsOpenEditUser(false);
      return;
    }

    let base64 = "";
    if (profileImage?.length) {
      const buffer = Buffer.from(await profileImage[0].arrayBuffer());
      base64 = buffer.toString("base64");
    }

    startTransition(async () => {
      const isSuccess = await editUserAction.bind(
        null,
        user.uid
      )({
        username: username || "",
        birth: birth || "",
        gender: gender || "",
        profileImage: base64
      });

      if (!isSuccess) {
        showAlert({ message: "変更できませんでした。" });
        return;
      }

      mutate();
      setIsOpenEditUser(false);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlerCloseEditUser = () => {
    setIsOpenEditUser(false);
    reset();
    setPreviewImage("");
  };

  return {
    isOpenEditUser,
    setIsOpenEditUser,
    user,
    alertState,
    register,
    handler: handleSubmit(onSubmit),
    errors,
    pending,
    previewImage,
    handleImageChange,
    handlerCloseEditUser
  };
};
