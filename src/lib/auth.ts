//import type { NextAuthConfig } from "next-auth"
import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NextAuthConfig = any;
import Credentials from "next-auth/providers/credentials"
// import EmailProvider from "next-auth/providers/email"

import bcrypt from "bcryptjs"
import { signInSchema } from "@/lib/validators/auth"

const providers = [

  // EmailProvider removed as it requires an Adapter and we only use credentials/google
  // ...(process.env.EMAIL_SERVER
  //   ? [
  //     EmailProvider({
  //       server: process.env.EMAIL_SERVER,
  //       from: process.env.EMAIL_FROM ?? "concierge@maison-nova.app",
  //     }),
  //   ]
  //   : []),
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        const parsed = signInSchema.safeParse(credentials)
        if (!parsed.success) {
          console.error("Invalid credentials format:", parsed.error);
          return null
        }

        const { db } = await import("@/lib/firebase-admin");
        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("email", "==", parsed.data.email.toLowerCase()).get();

        if (snapshot.empty) {
          console.warn("User not found:", parsed.data.email);
          return null;
        }

        const userDoc = snapshot.docs[0];
        const user = userDoc.data();

        if (!user || !user.passwordHash) {
          console.warn("User has no password hash or data is missing:", parsed.data.email);
          return null
        }
        const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!isValid) {
          console.warn("Invalid password for user:", parsed.data.email);
          return null
        }
        return {
          id: userDoc.id,
          email: user.email,
          name: [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined,
          role: user.role,
        }
      } catch (error) {
        console.error("Error in credentials authorize:", error);
        return null;
      }
    },
  }),
  Credentials({
    id: "google-firebase",
    name: "Google Firebase",
    credentials: {
      idToken: { label: "ID Token", type: "text" },
    },
    async authorize(credentials) {
      if (!credentials?.idToken) return null;

      try {
        const { auth, db } = await import("@/lib/firebase-admin");
        const decodedToken = await auth.verifyIdToken(credentials.idToken as string);
        const email = decodedToken.email;

        if (!email) return null;

        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("email", "==", email.toLowerCase()).get();

        if (snapshot.empty) {
          // Create new user
          const newUser = {
            email: email.toLowerCase(),
            firstName: decodedToken.name?.split(" ")[0] || "",
            lastName: decodedToken.name?.split(" ").slice(1).join(" ") || "",
            image: decodedToken.picture,
            role: "CLIENT",
            createdAt: new Date().toISOString(),
            provider: "google"
          };
          const docRef = await usersRef.add(newUser);

          // Send welcome email
          try {
            const { sendWelcomeEmail } = await import("@/lib/mail");
            await sendWelcomeEmail(newUser.email, newUser.firstName);
          } catch (emailError) {
            console.error("Failed to send welcome email during Google sign-up:", emailError);
            // Don't block registration
          }

          return {
            id: docRef.id,
            email: newUser.email,
            name: decodedToken.name,
            image: newUser.image,
            role: newUser.role,
          };
        } else {
          // Existing user
          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();
          return {
            id: userDoc.id,
            email: userData.email,
            name: [userData.firstName, userData.lastName].filter(Boolean).join(" "),
            image: userData.image,
            role: userData.role,
          };
        }
      } catch (error) {
        console.error("Error verifying Firebase ID token:", error);
        return null;
      }
    },
  }),
]

export const authConfig = {
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async signIn() {
      // Logic moved to authorize for google-firebase provider
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id
        session.user.role = (token.role as "ADMIN" | "CLIENT") ?? session.user.role
      }
      return session
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role ?? token.role
      }
      return token
    },
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig


