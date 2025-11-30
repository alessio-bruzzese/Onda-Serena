import { z } from "zod"

export const bookingRequestSchema = z.object({
  serviceId: z.string().cuid("Service invalide"),
  date: z.coerce.date({ message: "Date invalide" }),
  notes: z.string().max(500).optional(),
})

export const bookingStatusSchema = z.object({
  bookingId: z.string().cuid(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]),
})

export type BookingRequestValues = z.infer<typeof bookingRequestSchema>
export type BookingStatusValues = z.infer<typeof bookingStatusSchema>

