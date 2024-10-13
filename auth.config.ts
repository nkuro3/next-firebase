import { NextResponse } from "next/server";
import type { NextAuthConfig, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export default {
  session: {
    strategy: "jwt"
  },
  pages: {},
  callbacks: {
    async authorized({ auth, request }) {
      if (!auth?.uid) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid || "";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.uid = token?.uid || "";
      return session;
    }
  },
  trustHost: true,
  providers: []
} satisfies NextAuthConfig;
