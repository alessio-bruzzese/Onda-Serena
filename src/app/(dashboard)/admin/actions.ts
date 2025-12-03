"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
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

  const { db } = await import("@/lib/firebase-admin");
  await db.collection("bookings").doc(parsed.data.bookingId).update({
    status: parsed.data.status,
    updatedAt: new Date().toISOString(),
  });

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

  const { db } = await import("@/lib/firebase-admin");
  await db.collection("bookings").doc(bookingId).update({
    ...updateData,
    date: updateData.date ? new Date(updateData.date).toISOString() : undefined,
    updatedAt: new Date().toISOString(),
  });

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

  const { db } = await import("@/lib/firebase-admin");
  await db.collection("bookings").doc(bookingId).delete();

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

  const { db } = await import("@/lib/firebase-admin");

  // Check if email is being changed and if it's already taken
  if (updateData.email) {
    const existingSnapshot = await db.collection("users")
      .where("email", "==", updateData.email.toLowerCase())
      .get();

    if (!existingSnapshot.empty) {
      const existingUser = existingSnapshot.docs[0];
      if (existingUser.id !== userId) {
        return { error: "Cet email est déjà utilisé." }
      }
    }
    updateData.email = updateData.email.toLowerCase()
  }

  await db.collection("users").doc(userId).update({
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

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

  const { db } = await import("@/lib/firebase-admin");
  await db.collection("users").doc(userId).delete();

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

  const { db } = await import("@/lib/firebase-admin");

  // Check if service name already exists
  const existingSnapshot = await db.collection("services")
    .where("name", "==", parsed.data.name)
    .get();

  if (!existingSnapshot.empty) {
    return { error: "Un service avec ce nom existe déjà." }
  }

  await db.collection("services").add({
    ...parsed.data,
    price: Number(parsed.data.price),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

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

  const { db } = await import("@/lib/firebase-admin");

  // Check if service name is being changed and if it's already taken
  if (updateData.name) {
    const existingSnapshot = await db.collection("services")
      .where("name", "==", updateData.name)
      .get();

    if (!existingSnapshot.empty) {
      const existingService = existingSnapshot.docs[0];
      if (existingService.id !== serviceId) {
        return { error: "Un service avec ce nom existe déjà." }
      }
    }
  }

  await db.collection("services").doc(serviceId).update({
    ...updateData,
    price: Number(updateData.price),
    updatedAt: new Date().toISOString(),
  });

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

  const { db } = await import("@/lib/firebase-admin");

  // Check if service has bookings
  const bookingsSnapshot = await db.collection("bookings")
    .where("serviceId", "==", serviceId)
    .limit(1)
    .get();

  if (!bookingsSnapshot.empty) {
    return { error: "Impossible de supprimer un service avec des réservations." }
  }

  await db.collection("services").doc(serviceId).delete();

  revalidatePath("/admin")
  revalidatePath("/client")
  return { success: "Service supprimé." }
}


