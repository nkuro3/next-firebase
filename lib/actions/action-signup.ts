"use server";

import { z } from "zod";
import { createUser, registerUserToStorage, uploadIcon } from "@/lib/firebase/server";

const schema = z
  .object({
    username: z.string({
      required_error: "Required"
    }),
    email: z
      .string({
        required_error: "Required"
      })
      .email({ message: "Invalid Email" }),
    confirmEmail: z
      .string({
        required_error: "Required"
      })
      .email({ message: "Invalid Email" }),
    password: z
      .string({
        required_error: "Required",
        invalid_type_error: "Invalid Password"
      })
      .regex(
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{9,}$/,
        "Please set a password of at least 9 digits including upper and lower case letters and numbers."
      ),
    confirmPassword: z.string({
      required_error: "Required"
    }),
    birth: z
      .string({
        required_error: "Required"
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/),
    gender: z
      .string({
        required_error: "Required"
      })
      .regex(/^(male|female|other)$/),
    isAgreeTerms: z.boolean(),
    profileImage: z.string({
      required_error: "Required"
    })
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email don't match"
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match"
  });

type Schema = z.infer<typeof schema>;

export const signupAction = async (args: Schema) => {
  const validatedFields = schema.safeParse(args);

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return false;
  }

  const { username, email, password, birth, gender, isAgreeTerms, profileImage } = validatedFields.data;

  const user = await createUser(email, password);

  if (!user) return false;

  const buffer = Buffer.from(profileImage, "base64");
  const imageUrl = (await uploadIcon(user.uid, buffer)) || "";

  await registerUserToStorage(user.uid, username, email, imageUrl, birth, gender, isAgreeTerms);

  return true;
};
