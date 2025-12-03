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
import { signIn } from "next-auth/react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"

export function SignUpForm() {
  const router = useRouter()
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpValues>({
    // @ts-expect-error: Complex type mismatch with react-hook-form resolver
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

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()

      const signInResult = await signIn("google-firebase", {
        redirect: false,
        idToken,
      })

      if (signInResult?.error) {
        setFeedback({ type: "error", message: "Erreur lors de l'inscription avec Google." })
        return
      }

      // Wait a bit for session to be available
      await new Promise((resolve) => setTimeout(resolve, 100))
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Google sign up error:", error)
      setFeedback({ type: "error", message: "Erreur lors de l'inscription avec Google." })
    }
  }

  return (
    <Form {...form}>
      {/* @ts-expect-error: Complex type mismatch with react-hook-form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            // @ts-expect-error: Complex type mismatch with react-hook-form
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
            // @ts-expect-error: Complex type mismatch with react-hook-form
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
          // @ts-expect-error: Complex type mismatch with react-hook-form
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
          // @ts-expect-error: Complex type mismatch with react-hook-form
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
            // @ts-expect-error: Complex type mismatch with react-hook-form
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
            // @ts-expect-error: Complex type mismatch with react-hook-form
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
          // @ts-expect-error: Complex type mismatch with react-hook-form
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
          // @ts-expect-error: Complex type mismatch with react-hook-form
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

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#A8A8A8]/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-[#1a1a1a]/50 font-body">Ou s&apos;inscrire avec</span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="mt-6 h-12 w-full font-body border-[#A8A8A8]/20 hover:bg-[#A6CFE3]/10 hover:text-[#1a1a1a]"
        onClick={handleGoogleSignIn}
      >
        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
        Google
      </Button>
    </Form>
  )
}
