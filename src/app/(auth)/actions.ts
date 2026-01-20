"use server"

import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { signUpSchema, type SignUpValues } from "@/lib/validators/auth"
import { sendWelcomeEmail } from "@/lib/mail"

export async function registerUser(values: SignUpValues) {
  const parsed = signUpSchema.safeParse(values)
  if (!parsed.success) {
    return { error: "Champs invalides, merci de vérifier vos informations." }
  }

  try {
    const { email, password, firstName, lastName, phone, termsAccepted, marketingOptOut } = parsed.data

    const { db } = await import("@/lib/firebase-admin");
    const existingSnapshot = await db.collection("users").where("email", "==", email.toLowerCase()).get();

    if (!existingSnapshot.empty) {
      return { error: "Un compte existe déjà avec cet email." }
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const newUserRef = db.collection("users").doc();
    await newUserRef.set({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      phone,
      role: "CLIENT",
      termsAccepted: termsAccepted ?? false,
      marketingOptOut: marketingOptOut ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Profile fields
      preferences: "",
      lifestyleNotes: "",
      favoriteServices: [],
      tags: [],
    });

    const userId = newUserRef.id;

    // Send welcome email
    try {
      await sendWelcomeEmail(email, firstName)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // We don't block registration if email fails, but we log it
    }

    revalidatePath("/sign-in")
    return {
      success: "Compte créé, vous pouvez vous connecter.",
      userId: userId,
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)

    // Vérifier si c'est une erreur de connexion à la base de données
    const isDatabaseError =
      (error && typeof error === "object" && "code" in error && error.code === "P1001") ||
      (error instanceof Error && error.message.includes("Can't reach database server"))

    if (isDatabaseError) {
      console.error("Database connection error during registration:", error);
      return {
        error: "Impossible de se connecter à la base de données. Veuillez vérifier votre configuration DATABASE_URL dans le fichier .env",
      }
    }

    if (error instanceof Error) {
      console.error("Registration error message:", error.message);
      console.error("Registration error stack:", error.stack);
    }

    return {
      error: "Une erreur est survenue lors de la création du compte. Veuillez réessayer.",
    }
  }
}




