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
      <label htmlFor="confirmPassword" className="text-gray-500">
        ユーザーアイコン
      </label>
      <div>
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
          <div className="h-5 text-xs text-red-500">{errors.profileImage && errors.profileImage.message}</div>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="username" className="text-gray-500">
            ユーザー名
          </label>
        </div>
        <input
          id="username"
          {...register("username", { required: "この項目は必須です。" })}
          className="border w-full rounded px-2"
        />
        <div className="h-5 text-xs text-red-500">{errors.username && errors.username.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="email" className="text-gray-500">
            メールアドレス
          </label>
        </div>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "この項目は必須です。",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              message: "正しいメールアドレスを入力してください。"
            }
          })}
          className="border w-full rounded px-2"
        />
        <div className="h-5 text-xs text-red-500">{errors.email && errors.email.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="confirmEmail" className="text-gray-500">
            メールアドレス（確認）
          </label>
        </div>
        <input
          id="confirmEmail"
          type="email"
          {...register("confirmEmail", {
            required: "この項目は必須です。",
            validate: (value) => value === email || "メールアドレスが一致しません。"
          })}
          className="border w-full rounded px-2"
        />
        <div className="h-5 text-xs text-red-500">{errors.confirmEmail && errors.confirmEmail.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="password" className="text-gray-500">
            パスワード
          </label>
        </div>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "この項目は必須です。",
            minLength: { value: 8, message: "パスワードは8文字以上で設定してください。" }
          })}
          className="border w-full rounded px-2"
        />
        <div className="h-5 text-xs text-red-500">{errors.password && errors.password.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="confirmPassword" className="text-gray-500">
            パスワード（確認）
          </label>
        </div>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "この項目は必須です。",
            validate: (value) => value === password || "パスワードと一致しません。"
          })}
          className="border w-full rounded px-2"
        />
        <div className="h-5 text-xs text-red-500">{errors.confirmPassword && errors.confirmPassword.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="birth" className="text-gray-500">
            誕生日
          </label>
        </div>
        <input
          id="birth"
          type="date"
          className="border rounded cursor-pointer px-2"
          {...register("birth", { required: "この項目は必須です。" })}
        />
        <div className="h-5 text-xs text-red-500">{errors.birth && errors.birth.message}</div>
      </div>

      <div>
        <div className="text-gray-500">性別</div>
        <div className="flex gap-3">
          <div>
            <input id="male" type="radio" value="male" {...register("gender", { required: "この項目は必須です。" })} />
            <label htmlFor="male" className="cursor-pointer">
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
            <label htmlFor="female" className="cursor-pointer">
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
            <label htmlFor="other" className="cursor-pointer">
              その他
            </label>
          </div>
        </div>
        <div className="h-5 text-xs text-red-500">{errors.gender && errors.gender.message}</div>
      </div>

      <div>
        <div>
          <input
            id="isAgreeTerms"
            type="checkbox"
            className="border"
            {...register("isAgreeTerms", { required: "この項目は必須です。" })}
          />
          <label htmlFor="isAgreeTerms" className="ml-3 cursor-pointer">
            <Link href={TERMS_URL} className="text-gray-700 underline">
              利用規約
            </Link>
            に同意します。
          </label>
        </div>
        <div className="h-5 text-xs text-red-500">{errors.isAgreeTerms && errors.isAgreeTerms.message}</div>
      </div>
      <div className="mt-5 text-right">
        <SubmitButton pending={pending}>サインアップ</SubmitButton>
      </div>
    </form>
  );
};

export default SignupFrom;
