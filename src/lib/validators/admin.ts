import { z } from "zod"

export const userUpdateSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email().max(254).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  role: z.enum(["ADMIN", "CLIENT"]).optional(),
})

export const serviceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  price: z.coerce.number().min(0, "Le prix doit être positif ou nul"),
  priceType: z.enum(["PERCENTAGE", "QUOTE", "FIXED"]),
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

export const blogPostSchema = z.object({
  slug: z.string().min(1, "Le slug est requis"),
  title: z.string().min(1, "Le titre est requis"),
  excerpt: z.string().min(1, "L'extrait est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  date: z.string().min(1, "La date est requise"),
  coverImage: z.string().url().optional().or(z.literal("")),
})

export const blogPostUpdateSchema = blogPostSchema.extend({
  postId: z.string(),
})

export type BlogPostValues = z.infer<typeof blogPostSchema>
export type BlogPostUpdateValues = z.infer<typeof blogPostUpdateSchema>
