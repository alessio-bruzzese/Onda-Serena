//import type { NextAuthConfig } from "next-auth"
import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
type NextAuthConfig = any;
import Credentials from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { signInSchema } from "@/lib/validators/auth"

const providers = [
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ]
    : []),
  ...(process.env.EMAIL_SERVER
    ? [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM ?? "concierge@maison-nova.app",
      }),
    ]
    : []),
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const parsed = signInSchema.safeParse(credentials)
      if (!parsed.success) {
        return null
      }

      const { db } = await import("@/lib/firebase-admin");
      const usersRef = db.collection("users");
      const snapshot = await usersRef.where("email", "==", parsed.data.email.toLowerCase()).get();

      if (snapshot.empty) {
        return null;
      }

      const userDoc = snapshot.docs[0];
      const user = userDoc.data();

      if (!user || !user.passwordHash) {
        return null
      }
      const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash)
      if (!isValid) {
        return null
      }
      return {
        id: userDoc.id,
        email: user.email,
        name: [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined,
        role: user.role,
      }
    },
  }),
]

export const authConfig = {
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id
        session.user.role = (token.role as "ADMIN" | "CLIENT") ?? session.user.role
      }
      return session
    },
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.role = ((user as { role?: string }).role as "ADMIN" | "CLIENT" | undefined) ?? token.role
      }
      return token
    },
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig


