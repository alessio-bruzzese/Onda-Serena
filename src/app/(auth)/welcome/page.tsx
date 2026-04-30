import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="space-y-8 text-[#1a1a1a] text-center">
      <div className="space-y-4">
        <Badge className="bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body">
          Bienvenue !
        </Badge>
        <h1 className="text-4xl font-light md:text-5xl font-heading-alt">
          Inscription réussie
        </h1>
        <p className="text-[#1a1a1a]/70 font-body">
          Merci de nous rejoindre. Votre compte Onda Serena a été créé avec succès. 
          Vous pouvez maintenant découvrir nos services de conciergerie ou accéder à votre espace membre.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Link href="/services">
          <Button className="w-full h-14 bg-[#E9B676] text-white hover:bg-[#d4a565] font-body font-semibold text-lg">
            Découvrir les offres de la conciergerie
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="w-full h-14 font-body font-semibold text-lg border-[#A8A8A8]/20 hover:bg-[#A6CFE3]/10 hover:text-[#1a1a1a]">
            Accéder au dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
