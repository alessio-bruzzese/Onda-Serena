import { PhoneCall } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-transparent text-[#1a1a1a]">


      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 md:px-12 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-8">
          <Badge className="bg-white/80 text-[#1a1a1a] backdrop-blur border border-[#A8A8A8]/20 font-body tracking-wider uppercase text-xs px-4 py-1">
            Conciergerie Premium Côte Bleue
          </Badge>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[#1a1a1a]/70 font-body">
              Votre tranquillité, notre mission
            </p>
            <h1 className="text-4xl leading-tight text-[#001F3F] font-heading-alt md:text-5xl lg:text-6xl">
              La conciergerie de confiance sur la Côte Bleue
            </h1>
            <p className="text-lg text-[#1a1a1a]/80 md:text-xl font-body">
              Nous aidons les propriétaires à rentabiliser leur bien sans les tracas de la gestion.
              Gestion complète, décoration et services voyageurs pour maximiser vos revenus locatifs.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 bg-[#E9B676] text-base font-semibold text-white hover:bg-[#d4a565] font-body">
                Estimer mes revenus locatifs
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="outline"
                size="lg"
                className="h-14 border-2 border-[#1a1a1a] text-base text-[#1a1a1a] hover:bg-white/70 font-body"
              >
                S&apos;inscrire
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 border-t border-b border-[#A8A8A8]/30 py-6 text-sm text-[#1a1a1a]/70 font-body">
            <div>
              <p className="text-3xl font-light text-[#1a1a1a]">+50</p>
              <p>Biens gérés avec succès</p>
            </div>
            <div>
              <p className="text-3xl font-light text-[#1a1a1a]">24/7</p>
              <p>Disponibilité conciergerie</p>
            </div>
            <div>
              <p className="text-3xl font-light text-[#1a1a1a]">98%</p>
              <p>Taux de satisfaction</p>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-[32px] border-2 border-white/50 bg-white/60 p-8 backdrop-blur shadow-xl">
          <div className="space-y-6 rounded-3xl border border-[#A8A8A8]/20 bg-white/80 p-8">
            <div className="flex items-center justify-between text-sm text-[#1a1a1a]/70 font-body">
              <span>Conciergerie disponible</span>
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                En ligne
              </span>
            </div>
            <div className="space-y-4">
              {[
                "Check-in/out professionnel",
                "Ménage et linge soigné",
                "Maintenance réactive",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[#A8A8A8]/20 bg-[#F5E9D4]/50 p-4 text-sm text-[#1a1a1a] font-body">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-[#A6CFE3] bg-[#A6CFE3]/20 p-4 text-sm text-[#1a1a1a]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9B676] text-white">
                <PhoneCall className="h-5 w-5" />
              </div>
              <div className="font-body">
                <p className="font-medium">Contactez-nous</p>
                <p className="text-[#1a1a1a]/70">+33 (0)X XX XX XX XX</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
