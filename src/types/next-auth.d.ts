declare module "next-auth" {
  interface User {
    role: "ADMIN" | "CLIENT"
  }

  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      role?: "ADMIN" | "CLIENT"
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "CLIENT"
  }
}

