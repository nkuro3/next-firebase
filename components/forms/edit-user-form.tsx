"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { EditUserInputs } from "@/hooks/use-profile";
import styles from "./styles/edit-user-form.module.css";

type Props = {
  onCancel: () => void;
  register: UseFormRegister<EditUserInputs>;
  handler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<EditUserInputs>;
  pending: boolean;
  previewImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditUserForm = ({ onCancel, register, handler, errors, pending, previewImage, handleImageChange }: Props) => {
  return (
    <form onSubmit={handler} noValidate>
      <div className={styles.instructionText}>更新する項目のみ入力してください</div>
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
            placeholder="変更する場合は選択してください。"
            {...register("profileImage", {
              validate: {
                fileSize: (file) => {
                  return !file?.length || file[0].size <= 5000000 || "ファイルサイズは5MB以下にしてください。";
                },
                fileType: (file) => {
                  return (
                    !file?.length ||
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

      <div className={styles.formGroup}>
        <div className={styles.gridLabel}>ユーザー名</div>
        <input id="username" className={styles.input} {...register("username")} />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.gridLabel}>性別</div>
        <div className={styles.genderContainer}>
          <div>
            <input id="male" type="radio" value="male" {...register("gender")} />
            <label htmlFor="male" className={styles.radioLabel}>
              男性
            </label>
          </div>
          <div>
            <input id="female" type="radio" value="female" {...register("gender")} />
            <label htmlFor="female" className={styles.radioLabel}>
              女性
            </label>
          </div>
          <div>
            <input id="other" type="radio" value="other" {...register("gender")} />
            <label htmlFor="other" className={styles.radioLabel}>
              その他
            </label>
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.gridLabel}>誕生日</div>
        <input id="birth" type="date" className={styles.input} {...register("birth")} />
      </div>

      <div className={styles.buttonContainer}>
        {onCancel && (
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <SubmitButton pending={pending}>更新</SubmitButton>
      </div>
    </form>
  );
};

export default EditUserForm;
