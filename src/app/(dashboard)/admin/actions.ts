"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getCurrentSession } from "@/lib/session"
import { bookingStatusSchema } from "@/lib/validators/booking"
import {
  userUpdateSchema,
  serviceSchema,
  serviceUpdateSchema,
  bookingUpdateSchema,
} from "@/lib/validators/admin"

async function assertAdmin() {
  const session = await getCurrentSession()
  if (!session?.user?.id) {
    redirect("/sign-in")
  }
  if (session.user.role !== "ADMIN") {
    redirect("/")
  }
  return session
}

// Booking actions
export async function updateBookingStatus(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const parsed = bookingStatusSchema.safeParse(
    formData instanceof FormData
      ? {
        bookingId: formData.get("bookingId"),
        status: formData.get("status"),
      }
      : formData,
  )

  if (!parsed.success) {
    return { error: "Statut invalide." }
  }

  await prisma.booking.update({
    where: { id: parsed.data.bookingId },
    data: { status: parsed.data.status },
  })

  revalidatePath("/admin")
  revalidatePath("/client")
  return { success: "Réservation mise à jour." }
}

export async function updateBooking(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const data = formData instanceof FormData
    ? {
      bookingId: formData.get("bookingId"),
      status: formData.get("status") || undefined,
      date: formData.get("date") || undefined,
      notes: formData.get("notes") || undefined,
      adminNotes: formData.get("adminNotes") || undefined,
    }
    : formData

  const parsed = bookingUpdateSchema.safeParse(data)

  if (!parsed.success) {
    return { error: "Données invalides." }
  }

  const { bookingId, ...updateData } = parsed.data

  await prisma.booking.update({
    where: { id: bookingId },
    data: updateData,
  })

  revalidatePath("/admin")
  revalidatePath("/client")
  return { success: "Réservation mise à jour." }
}

export async function deleteBooking(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const bookingId = formData instanceof FormData
    ? formData.get("bookingId")
    : (formData as { bookingId: string }).bookingId

  if (typeof bookingId !== "string") {
    return { error: "ID de réservation invalide." }
  }

  await prisma.booking.delete({
    where: { id: bookingId },
  })

  revalidatePath("/admin")
  revalidatePath("/client")
  return { success: "Réservation supprimée." }
}

// User actions
export async function updateUser(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const data = formData instanceof FormData
    ? {
      userId: formData.get("userId"),
      email: formData.get("email") || undefined,
      firstName: formData.get("firstName") || undefined,
      lastName: formData.get("lastName") || undefined,
      phone: formData.get("phone") || undefined,
      role: formData.get("role") || undefined,
    }
    : formData

  const parsed = userUpdateSchema.safeParse(data)

  if (!parsed.success) {
    return { error: "Données invalides." }
  }

  const { userId, ...updateData } = parsed.data

  // Check if email is being changed and if it's already taken
  if (updateData.email) {
    const existing = await prisma.user.findFirst({
      where: {
        email: updateData.email.toLowerCase(),
        NOT: { id: userId },
      },
    })
    if (existing) {
      return { error: "Cet email est déjà utilisé." }
    }
    updateData.email = updateData.email.toLowerCase()
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  })

  revalidatePath("/admin")
  return { success: "Utilisateur mis à jour." }
}

export async function deleteUser(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const userId = formData instanceof FormData
    ? formData.get("userId")
    : (formData as { userId: string }).userId

  if (typeof userId !== "string") {
    return { error: "ID d'utilisateur invalide." }
  }

  // Prevent deleting yourself
  const session = await getCurrentSession()
  if (session?.user.id === userId) {
    return { error: "Vous ne pouvez pas supprimer votre propre compte." }
  }

  await prisma.user.delete({
    where: { id: userId },
  })

  revalidatePath("/admin")
  return { success: "Utilisateur supprimé." }
}

// Service actions
export async function createService(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const data = formData instanceof FormData
    ? {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      priceType: formData.get("priceType") || "FIXED",
      category: formData.get("category"),
      imageUrl: formData.get("imageUrl") || undefined,
    }
    : formData

  const parsed = serviceSchema.safeParse(data)

  if (!parsed.success) {
    return { error: "Données invalides." }
  }

  // Check if service name already exists
  const existing = await prisma.service.findUnique({
    where: { name: parsed.data.name },
  })
  if (existing) {
    return { error: "Un service avec ce nom existe déjà." }
  }

  await prisma.service.create({
    data: parsed.data,
  })

  revalidatePath("/admin")
  revalidatePath("/client")
  return { success: "Service créé." }
}

export async function updateService(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const data = formData instanceof FormData
    ? {
      serviceId: formData.get("serviceId"),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      priceType: formData.get("priceType") as "PERCENTAGE" | "QUOTE" | "FIXED",
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
    }
    : formData

  const parsed = serviceUpdateSchema.safeParse(data)

  if (!parsed.success) {
    return { error: "Données invalides." }
  }

  const { serviceId, ...updateData } = parsed.data

  // Check if service name is being changed and if it's already taken
  if (updateData.name) {
    const existing = await prisma.service.findFirst({
      where: {
        name: updateData.name,
        NOT: { id: serviceId },
      },
    })
    if (existing) {
      return { error: "Un service avec ce nom existe déjà." }
    }
  }

  await prisma.service.update({
    where: { id: serviceId },
    data: updateData,
  })

  revalidatePath("/admin")
  revalidatePath("/client")
  return { success: "Service mis à jour." }
}

export async function deleteService(formData: FormData | Record<string, unknown>) {
  await assertAdmin()

  const serviceId = formData instanceof FormData
    ? formData.get("serviceId")
    : (formData as { serviceId: string }).serviceId

  if (typeof serviceId !== "string") {
    return { error: "ID de service invalide." }
  }

  // Check if service has bookings
  const bookingsCount = await prisma.booking.count({
    where: { serviceId },
  })

  if (bookingsCount > 0) {
    return { error: "Impossible de supprimer un service avec des réservations." }
  }

  await prisma.service.delete({
    where: { id: serviceId },
  })

  revalidatePath("/admin")
  revalidatePath("/client")
  return { success: "Service supprimé." }
}


