import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-transparent py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[32px] border-2 border-white/50 bg-white/60 backdrop-blur px-8 py-16 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A8A8A8] font-body">
          Guide gratuit
        </p>
        <h3 className="text-4xl font-light text-[#1a1a1a]">
          Téléchargez votre guide essentiel pour rentabiliser votre location saisonnière
        </h3>
        <p className="text-[#1a1a1a]/70 font-body max-w-2xl mx-auto">
          Découvrez nos conseils exclusifs pour maximiser vos revenus locatifs sur la Côte Bleue.
          Stratégies de tarification, décoration, et gestion optimale.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="#lead-magnet" className="w-full max-w-xs">
            <Button size="lg" className="h-14 w-full bg-[#E9B676] text-base font-semibold text-white hover:bg-[#d4a565] font-body">
              <Download className="mr-2 h-5 w-5" />
              Télécharger le guide gratuit
            </Button>
          </Link>
          <Link href="/sign-up" className="w-full max-w-xs">
            <Button
              variant="outline"
              size="lg"
              className="h-14 w-full border-2 border-[#1a1a1a] bg-transparent text-base text-[#1a1a1a] hover:bg-white/70 font-body"
            >
              S&apos;inscrire
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
