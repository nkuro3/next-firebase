"use client";

import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { SignupInputs } from "@/hooks/use-signup";
import { TERMS_URL } from "@/lib/constant";

type Props = {
  register: UseFormRegister<SignupInputs>;
  handler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<SignupInputs>;
  password: string;
  email: string;
  pending: boolean;
  previewImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupFrom = ({
  register,
  handler,
  errors,
  password,
  email,
  pending,
  previewImage,
  handleImageChange
}: Props) => {
  return (
    <form onSubmit={handler} noValidate>
      <label htmlFor="confirmPassword">ユーザーアイコン</label>
      <div className="mb-[24px]">
        {previewImage && (
          <img src={previewImage} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full border" />
        )}
        <div>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            multiple={false}
            {...register("profileImage", {
              required: "この項目は必須です。",
              validate: {
                fileSize: (file) => {
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
            className="mt-2 cursor-pointer"
          />
          {errors.profileImage && <div>{errors.profileImage.message}</div>}
        </div>
      </div>

      <div>
        <label htmlFor="username">ユーザー名</label>
        <br />
        <input id="username" className="border" {...register("username", { required: "この項目は必須です。" })} />
        <div className="h-[24px]">{errors.username && errors.username.message}</div>
      </div>

      <div>
        <label htmlFor="email">メールアドレス</label>
        <br />
        <input
          id="email"
          className="border"
          type="email"
          {...register("email", {
            required: "この項目は必須です。",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              message: "正しいメールアドレスを入力してください。"
            }
          })}
        />
        <div className="h-[24px]">{errors.email && errors.email.message}</div>
      </div>

      <div>
        <label htmlFor="confirmEmail">メールアドレス（確認）</label>
        <br />
        <input
          id="confirmEmail"
          className="border"
          type="email"
          {...register("confirmEmail", {
            required: "この項目は必須です。",
            validate: (value) => value === email || "メールアドレスが一致しません。"
          })}
        />
        <div className="h-[24px]">{errors.confirmEmail && errors.confirmEmail.message}</div>
      </div>

      <div>
        <label htmlFor="password">パスワード</label>
        <br />
        <input
          type="password"
          className="border"
          {...register("password", {
            required: "この項目は必須です。",
            minLength: { value: 8, message: "パスワードは8文字以上で設定してください。" }
          })}
        />
        <div className="h-[24px]">{errors.password && errors.password.message}</div>
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
        <div className="h-[24px]">{errors.confirmPassword && errors.confirmPassword.message}</div>
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
        <div className="h-[24px]">{errors.birth && errors.birth.message}</div>
      </div>

      <div>
        <div>性別</div>
        <div className="flex gap-3">
          <div>
            <input id="male" type="radio" value="male" {...register("gender", { required: "この項目は必須です。" })} />
            <label htmlFor="male" className="hover:cursor-pointer">
              男性
            </label>
          </div>
          <div>
            <input
              id="female"
              type="radio"
              value="female"
              {...register("gender", {
                required: "この項目は必須です。"
              })}
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
        <div className="h-[24px]">{errors.gender && errors.gender.message}</div>
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
        <div className="h-[24px]">{errors.isAgreeTerms && errors.isAgreeTerms.message}</div>
      </div>
      <div className="mt-5 text-right">
        <SubmitButton pending={pending}>サインアップ</SubmitButton>
      </div>
    </form>
  );
};

export default SignupFrom;
