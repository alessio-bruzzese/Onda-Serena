import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CancelBookingButton } from "./cancel-booking-button"

type BookingHistoryProps = {
  bookings: {
    id: string
    status: "PENDING" | "CONFIRMED" | "CANCELLED"
    date: string
    notes: string | null
    service: {
      name: string
      category: string
    }
  }[]
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "En attente", className: "bg-[#E9B676]/20 text-[#1a1a1a] border border-[#E9B676]/40 font-body" },
  CONFIRMED: { label: "Confirmée", className: "bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body" },
  CANCELLED: { label: "Annulée", className: "bg-[#A8A8A8]/20 text-[#1a1a1a] border border-[#A8A8A8]/40 font-body" },
}

export function BookingHistory({ bookings }: BookingHistoryProps) {
  // ... (existing code)

  return (
    <Card className="border-[#A8A8A8]/20 bg-white/50 text-[#1a1a1a] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-light font-heading-alt">Historique des réservations</CardTitle>
        <p className="text-sm text-[#1a1a1a]/50 font-body">{bookings.length} missions suivies</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => {
          const status = statusConfig[booking.status]
          const isActive = booking.status === "PENDING" || booking.status === "CONFIRMED"

          return (
            <div key={booking.id} className="rounded-2xl border border-[#A8A8A8]/20 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold font-body">{booking.service.name}</p>
                  <p className="text-sm text-[#1a1a1a]/60 font-body">{booking.service.category}</p>
                </div>
                <Badge className={status.className}>{status.label}</Badge>
              </div>
              <div className="mt-4 text-sm text-[#1a1a1a]/70 font-body">
                <p>Prévu le {new Date(booking.date).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })}</p>
                {booking.notes && <p className="mt-2 text-[#1a1a1a]/60 italic">&quot;{booking.notes}&quot;</p>}
              </div>

              {isActive && (
                <div className="mt-4 flex justify-end border-t border-[#A8A8A8]/10 pt-4">
                  <CancelBookingButton bookingId={booking.id} />
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}






