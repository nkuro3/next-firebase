"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { EditUserInputs } from "@/hooks/use-profile";

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
      <div className="mb-3 text-xs text-gray-400">更新する項目のみ入力してください</div>
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
            placeholder="変更する場合は選択してください。"
            {...register("profileImage", {
              validate: {
                fileSize: (file) => {
                  console.log(file);
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
            className="mt-2 cursor-pointer"
          />
          {errors.profileImage && <div>{errors.profileImage.message}</div>}
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 mb-3">
          <div className="col-span-1">ユーザー名</div>
          <div className="col-span-2">
            <input id="username" className="border w-full" {...register("username")} />
          </div>
        </div>

        <div className="grid grid-cols-3 mb-3">
          <div className="col-span-1">性別</div>
          <div className="col-span-2">
            <div className="flex justify-between">
              <div>
                <input id="male" type="radio" value="male" {...register("gender")} />
                <label htmlFor="male" className="hover:cursor-pointer">
                  男性
                </label>
              </div>
              <div>
                <input id="female" type="radio" value="female" {...register("gender")} />
                <label htmlFor="female" className="hover:cursor-pointer">
                  女性
                </label>
              </div>
              <div>
                <input id="other" type="radio" value="other" {...register("gender")} />
                <label htmlFor="other" className="hover:cursor-pointer">
                  その他
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="col-span-1">誕生日</div>
          <div className="col-span-2">
            <input id="birth" type="date" className="border hover:cursor-pointer" {...register("birth")} />
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
  );
};

export default EditUserForm;
