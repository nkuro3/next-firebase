"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { useAuth } from "@/hooks/use-auth";
import { updateUserData } from "@/lib/firebase/client";

type SignupInputs = {
  username: string;
  email: string;
  birth: string;
  gender: string;
};

type Props = {
  username: string;
  birth: string;
  gender: string;
  update: () => void;
  onCancel: () => void;
};

const EditUserForm = ({ username, birth, gender, update, onCancel }: Props) => {
  const { user } = useAuth();
  const [pending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignupInputs>();
  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const { username, birth, gender } = data;
    startTransition(async () => {
      if (!user) return;
      const isSuccess = await updateUserData(user.uid, { username, birth, gender });

      if (!isSuccess) {
        reset();
        setErrorMessage("ユーザー情報の更新に失敗しました。");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      update();
    });
  };

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <Card className="p-5">
        <h5 className="mb-5">プロフィール変更</h5>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <div className="grid grid-cols-3 mb-3 gap-7">
              <div className="col-span-1">ユーザー名</div>
              <div className="col-span-2">
                <input
                  id="username"
                  className="border w-full"
                  {...register("username", { required: "この項目は必須です。" })}
                  defaultValue={username}
                />
                {errors.username && <div>{errors.username.message}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3 mb-3">
              <div className="col-span-1">性別</div>
              <div className="col-span-2">
                <div className="flex justify-between">
                  <div>
                    <input
                      id="male"
                      type="radio"
                      value="male"
                      {...register("gender", { required: "この項目は必須です。" })}
                      defaultChecked={gender === "male"}
                    />
                    <label htmlFor="male" className="hover:cursor-pointer">
                      男性
                    </label>
                  </div>
                  <div>
                    <input
                      id="female"
                      type="radio"
                      value="female"
                      {...register("gender", { required: "この項目は必須です。" })}
                      defaultChecked={gender === "female"}
                    />
                    <label htmlFor="female" className="hover:cursor-pointer">
                      女性
                    </label>
                  </div>
                  <div>
                    <input
                      id="other"
                      type="radio"
                      value="other"
                      {...register("gender", { required: "この項目は必須です。" })}
                      defaultChecked={gender === "other"}
                    />
                    <label htmlFor="other" className="hover:cursor-pointer">
                      その他
                    </label>
                  </div>
                </div>
                {errors.gender && <div>{errors.gender.message}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="col-span-1">誕生日</div>
              <div className="col-span-2">
                <input
                  id="birth"
                  type="date"
                  className="border hover:cursor-pointer"
                  {...register("birth", { required: "この項目は必須です。" })}
                  defaultValue={birth}
                />
                {errors.birth && <div>{errors.birth.message}</div>}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-10 justify-end self-end ml-auto">
            {onCancel && (
              <Button onClick={onCancel} variant="secondary">
                Cancel
              </Button>
            )}
            <SubmitButton pending={pending}>更新</SubmitButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditUserForm;
