"use server";

import { z } from "zod";
import { createFeed } from "@/lib/firebase/server";

const schema = z.object({
  content: z.string({ required_error: "Required" }).max(140)
});

type Schema = z.infer<typeof schema>;

export const createFeedAction = async (uid: string, args: Schema) => {
  const validatedFields = schema.safeParse(args);

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return false;
  }

  const { content } = validatedFields.data;

  return !!createFeed(uid, content);
};
