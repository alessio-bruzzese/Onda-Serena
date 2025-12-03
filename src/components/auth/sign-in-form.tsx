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
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"

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
        setError("Erreur lors de la connexion avec Google.")
        return
      }

      // Wait a bit for session to be available
      await new Promise((resolve) => setTimeout(resolve, 100))
      router.push(redirectTo)
      router.refresh()
    } catch (error) {
      console.error("Google sign in error:", error)
      setError("Erreur lors de la connexion avec Google.")
    }
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#A8A8A8]/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-[#1a1a1a]/50 font-body">Ou continuer avec</span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="h-12 w-full font-body border-[#A8A8A8]/20 hover:bg-[#A6CFE3]/10 hover:text-[#1a1a1a]"
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
