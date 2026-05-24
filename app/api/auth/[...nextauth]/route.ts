import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // We should use relative path or configured alias

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
