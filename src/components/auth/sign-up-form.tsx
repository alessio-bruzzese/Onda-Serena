"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Checkbox } from "@/components/ui/checkbox"
import { registerUser } from "@/app/(auth)/actions"
import type { SignUpValues } from "@/lib/validators/auth"
import { signUpSchema } from "@/lib/validators/auth"
import Link from "next/link"

export function SignUpForm() {
  const router = useRouter()
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpValues>({
    // @ts-ignore
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      termsAccepted: false,
      marketingOptOut: false,
    },
  })

  const onSubmit = (values: SignUpValues) => {
    setFeedback(null)
    startTransition(async () => {
      const result = await registerUser(values)
      if (result?.error) {
        setFeedback({ type: "error", message: result.error })
        return
      }
      setFeedback({ type: "success", message: result?.success ?? "Compte créé." })
      router.push("/sign-in")
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body text-[#1a1a1a]">Prénom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jean"
                    className="font-body border-[#A8A8A8]/20 focus:border-[#A6CFE3] focus:ring-[#A6CFE3]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body text-[#1a1a1a]">Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dupont"
                    className="font-body border-[#A8A8A8]/20 focus:border-[#A6CFE3] focus:ring-[#A6CFE3]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-[#1a1a1a]">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jean.dupont@example.com"
                  className="font-body border-[#A8A8A8]/20 focus:border-[#A6CFE3] focus:ring-[#A6CFE3]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-[#1a1a1a]">Téléphone (optionnel)</FormLabel>
              <FormControl>
                <Input
                  placeholder="+33 6 12 34 56 78"
                  className="font-body border-[#A8A8A8]/20 focus:border-[#A6CFE3] focus:ring-[#A6CFE3]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body text-[#1a1a1a]">Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="font-body border-[#A8A8A8]/20 focus:border-[#A6CFE3] focus:ring-[#A6CFE3]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body text-[#1a1a1a]">Confirmation</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="font-body border-[#A8A8A8]/20 focus:border-[#A6CFE3] focus:ring-[#A6CFE3]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-[#A8A8A8]/20 data-[state=checked]:bg-[#A6CFE3] data-[state=checked]:border-[#A6CFE3]"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal text-[#1a1a1a]/80 font-body">
                  J&apos;accepte les{" "}
                  <Link href="/terms" className="text-[#A6CFE3] hover:text-[#E9B676] underline transition" target="_blank">
                    conditions d&apos;utilisation
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketingOptOut"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-[#A8A8A8]/20 data-[state=checked]:bg-[#A6CFE3] data-[state=checked]:border-[#A6CFE3]"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal text-[#1a1a1a]/80 font-body">
                  Je ne souhaite pas recevoir la newsletter et les communications marketing
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {feedback && (
          <p className={`text-sm font-body ${feedback.type === "error" ? "text-red-500" : "text-green-600"}`}>
            {feedback.message}
          </p>
        )}

        <Button
          type="submit"
          className="h-12 w-full bg-[#E9B676] text-white hover:bg-[#d4a565] font-body font-semibold"
          disabled={isPending}
        >
          {isPending ? "Inscription en cours..." : "Créer mon compte"}
        </Button>
      </form>
    </Form>
  )
}
