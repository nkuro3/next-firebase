"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { CreateFeedFormInputs } from "@/hooks/use-create-feed";
import { MAX_CHARACTERS } from "@/lib/constant";
import styles from "./styles/create-feed-form.module.css";

type Props = {
  numOfCharacters: number;
  handlerSetNumOfCharacters: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register: UseFormRegister<CreateFeedFormInputs>;
  handler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<CreateFeedFormInputs>;
  pending: boolean;
};

const CreateFeedForm = ({ numOfCharacters, handlerSetNumOfCharacters, register, handler, errors, pending }: Props) => {
  return (
    <form onSubmit={handler} noValidate>
      <div>
        <div className={styles.flexLabelContainer}>
          <label htmlFor="content" className={styles.label}>
            内容
          </label>
          <div>
            <span className={numOfCharacters > MAX_CHARACTERS ? styles.overLimit : ""}>{numOfCharacters}</span> /{" "}
            {MAX_CHARACTERS}
          </div>
        </div>
        <textarea
          id="content"
          className={styles.textarea}
          {...register("content", {
            required: "この項目は必須です。",
            maxLength: { value: MAX_CHARACTERS, message: `${MAX_CHARACTERS}文字以内で入力してください。` }
          })}
          onChange={handlerSetNumOfCharacters}
        />
        <div className={styles.errorText}>{errors.content && errors.content.message}</div>
      </div>
      <div className={styles.buttonContainer}>
        <SubmitButton pending={pending} disabled={numOfCharacters > MAX_CHARACTERS || numOfCharacters === 0}>
          送信
        </SubmitButton>
      </div>
    </form>
  );
};

export default CreateFeedForm;
