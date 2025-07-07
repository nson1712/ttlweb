import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

declare module "next-auth" {
  interface Session {
    idToken?: string;
    accessToken?: string;
    provider?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "email,public_profile", // Thêm 'email' và 'public_profile'
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        token.idToken = account.id_token; // Lưu idToken
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.idToken = token.idToken as string;
      session.accessToken = token.accessToken as string; // Lưu accessToken vào session
      session.provider = token.provider as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
