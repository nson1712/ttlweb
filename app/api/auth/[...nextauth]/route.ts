import authHandler from "@/app/lib/auth";


// NextAuth’s returned function already handles both GET and POST internally,
// so we just re‐export it under those two names:
export { authHandler as GET, authHandler as POST };