import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

declare module "next-auth" {
  interface Session {
    idToken?: string;
    accessToken?: string;
    provider?: string;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };