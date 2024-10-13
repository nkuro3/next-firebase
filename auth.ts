/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authConfig from "@/auth.config";
import { firebaseAuth } from "@/lib/firebase/server";

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: updateSession
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: { label: "idToken" }
      },
      async authorize(credentials) {
        const { idToken } = credentials;
        try {
          const decoded = await firebaseAuth.verifyIdToken(idToken as string);
          const { uid, email } = decoded;
          return { uid, email };
        } catch (e: any) {
          console.error(e);
          throw new Error("Auth Error");
        }
      }
    })
  ]
});
