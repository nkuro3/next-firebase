"use client";

import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { SignupInputs } from "@/hooks/use-signup";
import { TERMS_URL } from "@/lib/constant";
import styles from "./styles/signup-form.module.css";

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
      <label htmlFor="confirmPassword" className={styles.label}>
        ユーザーアイコン
      </label>
      <div>
        {previewImage && <img src={previewImage} alt="Preview" className={styles.previewImage} />}
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
            className={styles.fileInput}
          />
          <div className={styles.errorText}>{errors.profileImage && errors.profileImage.message}</div>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="username" className={styles.label}>
            ユーザー名
          </label>
        </div>
        <input id="username" {...register("username", { required: "この項目は必須です。" })} className={styles.input} />
        <div className={styles.errorText}>{errors.username && errors.username.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="email" className={styles.label}>
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
          className={styles.input}
        />
        <div className={styles.errorText}>{errors.email && errors.email.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="confirmEmail" className={styles.label}>
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
          className={styles.input}
        />
        <div className={styles.errorText}>{errors.confirmEmail && errors.confirmEmail.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="password" className={styles.label}>
            パスワード
          </label>
        </div>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "この項目は必須です。",
            minLength: { value: 8, message: "パスワードは8文字以上で設定してください。" },
            pattern: {
              value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{3,}$/,
              message: "パスワードは大文字、小文字、数字を含めて設定してください。"
            }
          })}
          className={styles.input}
        />
        <div className={styles.errorText}>{errors.password && errors.password.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="confirmPassword" className={styles.label}>
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
          className={styles.input}
        />
        <div className={styles.errorText}>{errors.confirmPassword && errors.confirmPassword.message}</div>
      </div>

      <div>
        <div>
          <label htmlFor="birth" className={styles.label}>
            誕生日
          </label>
        </div>
        <input
          id="birth"
          type="date"
          className={styles.input}
          {...register("birth", { required: "この項目は必須です。" })}
        />
        <div className={styles.errorText}>{errors.birth && errors.birth.message}</div>
      </div>

      <div>
        <div className={styles.label}>性別</div>
        <div className={styles.genderContainer}>
          <div>
            <input id="male" type="radio" value="male" {...register("gender", { required: "この項目は必須です。" })} />
            <label htmlFor="male" className={styles.radioLabel}>
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
            <label htmlFor="female" className={styles.radioLabel}>
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
            <label htmlFor="other" className={styles.radioLabel}>
              その他
            </label>
          </div>
        </div>
        <div className={styles.errorText}>{errors.gender && errors.gender.message}</div>
      </div>

      <div>
        <div>
          <input
            id="isAgreeTerms"
            type="checkbox"
            className={styles.checkbox}
            {...register("isAgreeTerms", { required: "この項目は必須です。" })}
          />
          <label htmlFor="isAgreeTerms" className={styles.termsLabel}>
            <Link href={TERMS_URL} className={styles.termsLink}>
              利用規約
            </Link>
            に同意します。
          </label>
        </div>
        <div className={styles.errorText}>{errors.isAgreeTerms && errors.isAgreeTerms.message}</div>
      </div>
      <div className={styles.submitContainer}>
        <SubmitButton pending={pending}>サインアップ</SubmitButton>
      </div>
    </form>
  );
};

export default SignupFrom;
