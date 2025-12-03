"use server"

import { revalidatePath } from "next/cache"
import { getCurrentSession } from "@/lib/session"

export async function cancelBooking(bookingId: string) {
    const session = await getCurrentSession()
    if (!session?.user?.id) {
        return { error: "Non autorisé" }
    }

    try {
        const { db } = await import("@/lib/firebase-admin");
        const bookingRef = db.collection("bookings").doc(bookingId);
        const bookingDoc = await bookingRef.get();

        if (!bookingDoc.exists) {
            return { error: "Réservation non trouvée" }
        }

        const booking = bookingDoc.data();

        if (booking?.userId !== session.user.id) {
            return { error: "Non autorisé" }
        }

        if (booking?.status === "CANCELLED") {
            return { error: "Réservation déjà annulée" }
        }

        await bookingRef.update({
            status: "CANCELLED",
            updatedAt: new Date().toISOString(),
        })

        revalidatePath("/dashboard")
        return { success: "Réservation annulée avec succès" }
    } catch (error) {
        console.error("Error cancelling booking:", error)
        return { error: "Une erreur est survenue" }
    }
}
