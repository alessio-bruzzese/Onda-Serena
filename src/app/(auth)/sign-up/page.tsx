import Link from "next/link"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { Badge } from "@/components/ui/badge"

export default function SignUpPage() {
  return (
    <div className="space-y-8 text-[#1a1a1a]">
      <div className="space-y-4 text-center">
        <Badge className="bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body">
          Inscription
        </Badge>
        <h1 className="text-4xl font-light md:text-5xl">Créer votre compte</h1>
        <p className="text-[#1a1a1a]/70 font-body">
          Rejoignez ONDA SERENA et commencez à maximiser vos revenus locatifs sur la Côte Bleue.
        </p>
      </div>

      <SignUpForm />

      <p className="text-center text-sm text-[#1a1a1a]/70 font-body">
        Déjà inscrit ?{" "}
        <Link href="/sign-in" className="text-[#A6CFE3] hover:text-[#E9B676] font-semibold transition">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
