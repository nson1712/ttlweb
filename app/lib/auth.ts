import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  // …các thiết lập khác nếu có
};

/**
 * Khi import từ "next-auth/next", NextAuth() trả ra một handler
 * có kiểu (req: Request | NextRequest) => Promise<Response>.
 * Bạn chỉ cần export default nó để tái sử dụng trong App Router.
 */
export default NextAuth(authOptions);