import "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"];
    uid: string;
  }

  interface User {
    uid: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string | undefined;
  }
}
