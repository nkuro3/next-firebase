"use server";

import { z } from "zod";
import { updateUserToStorage, uploadIcon } from "@/lib/firebase/server";

const schema = z.object({
  username: z.string(),
  birth: z.string().regex(/^(|\d{4}-\d{2}-\d{2})$/),
  gender: z.string().regex(/^(|male|female|other)$/),
  profileImage: z.string()
});

type Schema = z.infer<typeof schema>;

export const editUserAction = async (uid: string, args: Schema) => {
  const validatedFields = schema.safeParse(args);

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return false;
  }

  const { username, birth, gender, profileImage } = validatedFields.data;

  let imageUrl = "";
  if (profileImage) {
    const buffer = Buffer.from(profileImage, "base64");
    imageUrl = (await uploadIcon(uid, buffer)) || "";
  }

  await updateUserToStorage(uid, username, imageUrl, birth, gender);

  return true;
};
