import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  preferences: z.string().max(1000).optional(),
  lifestyleNotes: z.string().max(2000).optional(),
  favoriteServices: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
})

export type ProfileValues = z.infer<typeof profileSchema>





