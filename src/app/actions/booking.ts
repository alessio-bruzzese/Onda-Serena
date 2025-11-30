"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getCurrentSession } from "@/lib/session"

export async function cancelBooking(bookingId: string) {
    const session = await getCurrentSession()
    if (!session?.user?.id) {
        return { error: "Non autorisé" }
    }

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        })

        if (!booking) {
            return { error: "Réservation non trouvée" }
        }

        if (booking.userId !== session.user.id) {
            return { error: "Non autorisé" }
        }

        if (booking.status === "CANCELLED") {
            return { error: "Réservation déjà annulée" }
        }

        await prisma.booking.update({
            where: { id: bookingId },
            data: { status: "CANCELLED" },
        })

        revalidatePath("/dashboard")
        return { success: "Réservation annulée avec succès" }
    } catch (error) {
        console.error("Error cancelling booking:", error)
        return { error: "Une erreur est survenue" }
    }
}
