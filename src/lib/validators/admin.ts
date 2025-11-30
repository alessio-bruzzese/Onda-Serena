import { z } from "zod"

export const userUpdateSchema = z.object({
  userId: z.string().cuid(),
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(["ADMIN", "CLIENT"]).optional(),
})

export const serviceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  price: z.coerce.number().min(0, "Le prix doit être positif ou nul"),
  priceType: z.enum(["PERCENTAGE", "QUOTE"]),
  category: z.string().min(1, "La catégorie est requise"),
  imageUrl: z.string().url().optional().or(z.literal("")),
})

export const serviceUpdateSchema = serviceSchema.extend({
  serviceId: z.string().cuid(),
})

export const bookingUpdateSchema = z.object({
  bookingId: z.string().cuid(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]).optional(),
  date: z.coerce.date().optional(),
  notes: z.string().max(500).optional(),
  adminNotes: z.string().max(500).optional(),
})

export type UserUpdateValues = z.infer<typeof userUpdateSchema>
export type ServiceValues = z.infer<typeof serviceSchema>
export type ServiceUpdateValues = z.infer<typeof serviceUpdateSchema>
export type BookingUpdateValues = z.infer<typeof bookingUpdateSchema>





