import Link from "next/link"
import { SignInForm } from "@/components/auth/sign-in-form"
import { Badge } from "@/components/ui/badge"

export default function SignInPage() {
  return (
    <div className="space-y-8 text-[#1a1a1a]">
      <div className="space-y-4 text-center">
        <Badge className="bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body">
          Connexion
        </Badge>
        <h1 className="text-4xl font-light md:text-5xl">Connexion à votre espace</h1>
        <p className="text-[#1a1a1a]/70 font-body">
          Accédez à votre tableau de bord pour gérer vos biens et suivre vos réservations.
        </p>
      </div>

      <SignInForm />

      <p className="text-center text-sm text-[#1a1a1a]/70 font-body">
        Pas encore membre ?{" "}
        <Link href="/sign-up" className="text-[#A6CFE3] hover:text-[#E9B676] font-semibold transition">
          Créer un compte
        </Link>
      </p>
    </div>
  )
}
