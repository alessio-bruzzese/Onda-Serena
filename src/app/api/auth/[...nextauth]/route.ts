import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth"

// @ts-expect-error: NextAuth type mismatch workaround
const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }



