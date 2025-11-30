"use server"

import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { signUpSchema, type SignUpValues } from "@/lib/validators/auth"

export async function registerUser(values: SignUpValues) {
  const parsed = signUpSchema.safeParse(values)
  if (!parsed.success) {
    return { error: "Champs invalides, merci de vérifier vos informations." }
  }

  try {
    const { email, password, firstName, lastName, phone, termsAccepted, marketingOptOut } = parsed.data
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return { error: "Un compte existe déjà avec cet email." }
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        phone,
        role: "CLIENT",
        termsAccepted: termsAccepted ?? false,
        marketingOptOut: marketingOptOut ?? false,
        profile: {
          create: {
            preferences: "",
            lifestyleNotes: "",
            favoriteServices: [],
            tags: [],
          },
        },
      },
    })

    revalidatePath("/sign-in")
    return {
      success: "Compte créé, vous pouvez vous connecter.",
      userId: user.id,
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    
    // Vérifier si c'est une erreur de connexion à la base de données
    const isDatabaseError =
      (error && typeof error === "object" && "code" in error && error.code === "P1001") ||
      (error instanceof Error && error.message.includes("Can't reach database server"))
    
    if (isDatabaseError) {
      return {
        error: "Impossible de se connecter à la base de données. Veuillez vérifier votre configuration DATABASE_URL dans le fichier .env",
      }
    }
    
    return {
      error: "Une erreur est survenue lors de la création du compte. Veuillez réessayer.",
    }
  }
}




