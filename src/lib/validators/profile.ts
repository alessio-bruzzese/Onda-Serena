import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  preferences: z.string().max(1000).optional(),
  lifestyleNotes: z.string().max(2000).optional(),
  favoriteServices: z.array(z.string().max(100)).max(20).default([]),
  tags: z.array(z.string().max(50)).max(20).default([]),
})

export type ProfileValues = z.infer<typeof profileSchema>





