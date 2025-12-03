"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentSession } from "@/lib/session"
import { bookingRequestSchema } from "@/lib/validators/booking"
import { profileSchema } from "@/lib/validators/profile"

export async function createBooking(formData: FormData | Record<string, unknown>) {
  const session = await getCurrentSession()
  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  const parsed = bookingRequestSchema.safeParse({
    serviceId: formData instanceof FormData ? formData.get("serviceId") : formData.serviceId,
    date: formData instanceof FormData ? formData.get("date") : formData.date,
    notes: formData instanceof FormData ? formData.get("notes") : formData.notes,
  })

  if (!parsed.success) {
    return { error: "Merci de vérifier les informations de réservation." }
  }

  const { db } = await import("@/lib/firebase-admin");

  await db.collection("bookings").add({
    userId: session.user.id,
    serviceId: parsed.data.serviceId,
    date: parsed.data.date.toISOString(),
    notes: parsed.data.notes,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  revalidatePath("/client")
  return { success: "Demande envoyée, un concierge va la valider." }
}

export async function updateProfile(formData: FormData | Record<string, unknown>) {
  const session = await getCurrentSession()
  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  const payload =
    formData instanceof FormData
      ? {
        firstName: formData.get("firstName") ?? "",
        lastName: formData.get("lastName") ?? "",
        phone: formData.get("phone") ?? "",
        preferences: formData.get("preferences") ?? "",
        lifestyleNotes: formData.get("lifestyleNotes") ?? "",
        favoriteServices: ((formData.get("favoriteServices") as string) ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        tags: ((formData.get("tags") as string) ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }
      : (() => {
        const data = formData as Record<string, unknown>
        const favorites = data["favoriteServices"]
        const tags = data["tags"]
        return {
          firstName: (data["firstName"] as string) ?? "",
          lastName: (data["lastName"] as string) ?? "",
          phone: (data["phone"] as string) ?? "",
          preferences: (data["preferences"] as string) ?? "",
          lifestyleNotes: (data["lifestyleNotes"] as string) ?? "",
          favoriteServices: typeof favorites === "string"
            ? (favorites as string)
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
            : Array.isArray(favorites)
              ? (favorites as string[])
              : [],
          tags: typeof tags === "string"
            ? (tags as string)
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
            : Array.isArray(tags)
              ? (tags as string[])
              : [],
        }
      })()

  const parsed = profileSchema.safeParse(payload)

  if (!parsed.success) {
    return { error: "Impossible de sauvegarder, merci de vérifier les champs." }
  }

  // Update User info
  const { db } = await import("@/lib/firebase-admin");

  const userRef = db.collection("users").doc(session.user.id);

  await userRef.set({
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    phone: parsed.data.phone,
    preferences: parsed.data.preferences,
    lifestyleNotes: parsed.data.lifestyleNotes,
    favoriteServices: parsed.data.favoriteServices,
    tags: parsed.data.tags,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  revalidatePath("/profile")
  revalidatePath("/dashboard")
  return { success: "Profil mis à jour." }
}

