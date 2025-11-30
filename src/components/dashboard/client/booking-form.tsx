"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createBooking } from "@/app/(dashboard)/dashboard/actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type BookingFormProps = {
  services: {
    id: string
    name: string
    category: string
    price: number
    priceType: "PERCENTAGE" | "QUOTE"
  }[]
}

const formSchema = z.object({
  serviceId: z.string().min(1, "Choisir un service"),
  date: z.string().min(1, "Sélectionner une date"),
  notes: z.string().max(500).optional(),
})

type BookingFormValues = z.infer<typeof formSchema>

// Helper to format price display
const formatPrice = (price: number, type: string) => {
  if (type === "QUOTE") return "Sur devis"
  if (type === "PERCENTAGE") return `Commission : ${price}%`
  return `${Number(price).toFixed(2)} €`
}

export function BookingForm({ services }: BookingFormProps) {
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: services[0]?.id ?? "",
      date: new Date().toISOString().slice(0, 16),
      notes: "",
    },
  })

  const onSubmit = (values: BookingFormValues) => {
    setFeedback(null)
    startTransition(async () => {
      const result = await createBooking({
        serviceId: values.serviceId,
        date: values.date,
        notes: values.notes,
      })
      if (result?.error) {
        setFeedback({ type: "error", message: result.error })
        return
      }
      setFeedback({ type: "success", message: "Demande transmise à votre concierge." })
      form.reset()
    })
  }

  if (!services.length) {
    return (
      <div className="rounded-3xl border border-[#A8A8A8]/20 bg-white/50 p-6 text-[#1a1a1a]/70">
        <h2 className="text-2xl font-light text-[#1a1a1a] font-heading-alt">Réserver une prestation</h2>
        <p className="mt-4 text-sm font-body">
          Aucun service n&apos;est encore configuré. Ajoutez des services via Prisma ou Supabase pour activer les demandes.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-[#A8A8A8]/20 bg-white/50 p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A8A8A8] font-body">Nouvelle demande</p>
        <h2 className="text-2xl font-light text-[#1a1a1a] font-heading-alt">Réserver une prestation</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5 text-[#1a1a1a]">
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body">Service</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white border-[#A8A8A8]/30 text-[#1a1a1a] font-body">
                      <SelectValue placeholder="Choisir un service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body">
                      {services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id}
                          className="text-[#1a1a1a] focus:bg-[#F5E9D4]/50 focus:text-[#1a1a1a] cursor-pointer"
                        >
                          {service.name} — {formatPrice(service.price, service.priceType)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body">Date souhaitée du rendez-vous téléphonique</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    value={field.value ?? ""}
                    onChange={(event) => field.onChange(event.target.value)}
                    className="bg-white border-[#A8A8A8]/30 text-[#1a1a1a] font-body"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body">Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Contexte, préférences, contraintes horaires..."
                    className="bg-white border-[#A8A8A8]/30 text-[#1a1a1a] font-body"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {feedback && (
            <p className={`text-sm font-body ${feedback.type === "error" ? "text-red-500" : "text-emerald-600"}`}>{feedback.message}</p>
          )}

          <Button
            type="submit"
            className="h-12 w-full bg-[#E9B676] text-white hover:bg-[#d4a565] font-body"
            disabled={isPending || !services.length}
          >
            {isPending ? "Enregistrement..." : "Envoyer la demande"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

