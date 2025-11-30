"use client"

import { useState, useTransition } from "react"
import { signIn } from "next-auth/react"
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
import type { SignInValues } from "@/lib/validators/auth"
import { signInSchema } from "@/lib/validators/auth"

type SignInFormProps = {
  redirectTo?: string
}

export function SignInForm({ redirectTo = "/dashboard" }: SignInFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: SignInValues) => {
    setError(null)
    startTransition(async () => {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })
      if (result?.error) {
        setError("Identifiants incorrects.")
        return
      }
      // Wait a bit for session to be available, then check role
      await new Promise((resolve) => setTimeout(resolve, 100))
      try {
        const sessionResponse = await fetch("/api/auth/session")
        const session = await sessionResponse.json()
        const finalRedirect = session?.user?.role === "ADMIN" ? "/admin" : redirectTo
        router.push(finalRedirect)
        router.refresh()
      } catch {
        // Fallback to default redirect if session check fails
        router.push(redirectTo)
        router.refresh()
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-[#1a1a1a]">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="jean.dupont@example.com"
                  type="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-[#1a1a1a]">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  className="font-body border-[#A8A8A8]/20 focus:border-[#A6CFE3] focus:ring-[#A6CFE3]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-sm text-red-500 font-body">{error}</p>}

        <Button
          type="submit"
          className="h-12 w-full bg-[#E9B676] text-white hover:bg-[#d4a565] font-body font-semibold"
          disabled={isPending}
        >
          {isPending ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  )
}
