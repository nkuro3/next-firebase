"use server";

import { z } from "zod";
import { signIn } from "@/auth";

const schema = z.object({
  idToken: z.string({
    required_error: "Required"
  })
});

type Schema = z.infer<typeof schema>;

export const loginAction = async (args: Schema) => {
  const validatedFields = schema.safeParse(args);

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return false;
  }

  const { idToken } = validatedFields.data;

  await signIn("credentials", { idToken, redirectTo: "/timeline" });

  return true;
};
