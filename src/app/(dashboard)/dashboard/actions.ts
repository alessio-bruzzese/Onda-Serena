"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
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

  await prisma.booking.create({
    data: {
      userId: session.user.id,
      serviceId: parsed.data.serviceId,
      date: parsed.data.date,
      notes: parsed.data.notes,
    },
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
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      phone: parsed.data.phone,
    },
  })

  // Update Profile info
  await prisma.clientProfile.upsert({
    where: { userId: session.user.id },
    update: {
      preferences: parsed.data.preferences,
      lifestyleNotes: parsed.data.lifestyleNotes,
      favoriteServices: parsed.data.favoriteServices,
      tags: parsed.data.tags,
    },
    create: {
      userId: session.user.id,
      preferences: parsed.data.preferences,
      lifestyleNotes: parsed.data.lifestyleNotes,
      favoriteServices: parsed.data.favoriteServices,
      tags: parsed.data.tags,
    },
  })

  revalidatePath("/profile")
  revalidatePath("/dashboard")
  return { success: "Profil mis à jour." }
}

