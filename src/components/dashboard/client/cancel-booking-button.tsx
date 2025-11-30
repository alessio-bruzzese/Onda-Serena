"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, XCircle } from "lucide-react"
import { cancelBooking } from "@/app/actions/booking"
import { toast } from "sonner"

interface CancelBookingButtonProps {
    bookingId: string
}

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
    const [isPending, setIsPending] = useState(false)

    const handleCancel = async () => {
        if (!confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
            return
        }

        setIsPending(true)
        try {
            const result = await cancelBooking(bookingId)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(result.success)
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={isPending}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
            {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <XCircle className="mr-2 h-4 w-4" />
            )}
            Annuler
        </Button>
    )
}
