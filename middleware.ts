import { NextResponse, type NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async (req: NextRequest) => {
  try {
    const res = NextResponse.next();

    // some process ...

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/timeline", "/profile", "/create-feed"]
};
