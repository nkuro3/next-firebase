"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { TERMS_URL } from "@/lib/constant";
import { auth, firestore, storage } from "@/lib/firebase/client";

type SignupInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
  birth: string;
  gender: string;
  isAgreeTerms: boolean;
};

const SignupForm = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<SignupInputs>();
  const password = watch("password");
  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const { username, email, profileImage, birth, gender, isAgreeTerms } = data;
    console.log({ username, email, profileImage, birth, gender, isAgreeTerms });
    startTransition(async () => {
      const userCredencial = await createUserWithEmailAndPassword(auth, data.email, data.password).catch((e) => {
        console.error(e);
        reset();
        setErrorMessage("ユーザーが存在します。");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
      if (!userCredencial) return;

      const { uid } = userCredencial.user;
      let imageUrl = "";
      if (profileImage.length) {
        const profileImageRef = ref(storage, `profileImages/${uid}`);
        await uploadBytes(profileImageRef, profileImage[0]);
        imageUrl = await getDownloadURL(profileImageRef);
      }

      const userDocRef = doc(firestore, "users", uid);
      await setDoc(userDocRef, {
        uid,
        username,
        email,
        imageUrl,
        birth,
        gender,
        isAgreeTerms,
        createdAt: new Date()
      });

      router.push("/");
    });
  };
  const [previewImage, setPreviewImage] = useState("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <Card className="p-5 w-fit">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="confirmPassword">ユーザーアイコン</label>
            <br />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full border" />
            )}
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              multiple={false}
              {...register("profileImage", {
                required: "この項目は必須です。",
                validate: {
                  fileSize: (file) => {
                    console.log(file);
                    return !file.length || file[0].size <= 5000000 || "ファイルサイズは5MB以下にしてください。";
                  },
                  fileType: (file) => {
                    return (
                      !file.length ||
                      ["image/jpeg", "image/png", "image/gif"].includes(file[0].type) ||
                      "JPG、PNG、GIF形式のみアップロード可能です。"
                    );
                  }
                }
              })}
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            <div className="h-[24px]"> {errors.profileImage && errors.profileImage.message}</div>
          </div>

          <div>
            <label htmlFor="username">ユーザー名</label>
            <br />
            <input id="username" className="border" {...register("username", { required: "この項目は必須です。" })} />
            <div className="h-[24px]"> {errors.email && errors.email.message}</div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input id="email" className="border" {...register("email", { required: "この項目は必須です。" })} />
            <div className="h-[24px]"> {errors.email && errors.email.message}</div>
          </div>

          <div>
            <label htmlFor="password">パスワード</label>
            <br />
            <input
              type="password"
              className="border"
              {...register("password", {
                required: "この項目は必須です。",
                minLength: { value: 8, message: "パスワードは8文字以上で設定してください。" },
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{3,}$/,
                  message: "パスワードは大文字、小文字、数字を含めて設定してください。"
                }
              })}
            />
            <div className="h-[24px]"> {errors.password && errors.password.message}</div>
          </div>

          <div>
            <label htmlFor="confirmPassword">パスワード（確認）</label>
            <br />
            <input
              type="password"
              className="border"
              {...register("confirmPassword", {
                required: "この項目は必須です。",
                validate: (value) => value === password || "パスワードと一致しません。"
              })}
            />
            <div className="h-[24px]"> {errors.confirmPassword && errors.confirmPassword.message}</div>
          </div>

          <div>
            <label htmlFor="birth">誕生日</label>
            <br />
            <input
              id="birth"
              type="date"
              className="border hover:cursor-pointer"
              {...register("birth", { required: "この項目は必須です。" })}
            />
            <div className="h-[24px]"> {errors.birth && errors.birth.message}</div>
          </div>

          <div>
            <div>性別</div>
            <div className="flex gap-3">
              <div>
                <input
                  id="male"
                  type="radio"
                  value="male"
                  {...register("gender", { required: "この項目は必須です。" })}
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
                />
                <label htmlFor="other" className="hover:cursor-pointer">
                  その他
                </label>
              </div>
            </div>
            <div className="h-[24px]"> {errors.gender && errors.gender.message}</div>
          </div>

          <div>
            <div>
              <input
                id="isAgreeTerms"
                type="checkbox"
                className="border"
                {...register("isAgreeTerms", { required: "この項目は必須です。" })}
              />
              <label htmlFor="isAgreeTerms" className="ml-3 hover:cursor-pointer">
                <Link href={TERMS_URL} className="text-gray-700 underline">
                  利用規約
                </Link>
                に同意します。
              </label>
            </div>
            <div className="h-[24px]"> {errors.isAgreeTerms && errors.isAgreeTerms.message}</div>
          </div>

          <SubmitButton pending={pending}>サインアップ</SubmitButton>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
