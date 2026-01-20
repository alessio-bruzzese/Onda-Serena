import { Home, Sparkles, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Prise en charge du logement",
    description:
      "Check-in/out professionnel, ménage soigné, linge de qualité et maintenance réactive pour votre bien.",
    badge: "Essentielle",
    icon: <Home className="h-5 w-5 text-[#D4AF37]" />,
  },
  {
    title: "Services Voyageurs",
    description:
      "Kits d'accueil avec produits locaux, services de réservations d'activités auprès de nos partenaires, et livrets d'accueil dans chaque logement.",
    badge: "Prestige",
    icon: <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />,
  },
  {
    title: "Décoration & Aménagement",
    description:
      "Forfait décoration pour transformer votre bien et augmenter sa valeur locative.",
    badge: "Sur devis",
    icon: <Sparkles className="h-5 w-5 text-[#D4AF37]" />,
  },
]

export function ServicesShowcase() {
  return (
    <section id="services" className="bg-transparent py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:px-12">
        <div className="space-y-4 text-center">
          <Badge className="bg-white/80 text-[#1a1a1a] border border-[#A8A8A8]/20 font-body tracking-wider uppercase text-xs px-4 py-1">
            Nos prestations
          </Badge>
          <div className="space-y-4">
            <h2 className="text-3xl font-light md:text-5xl font-heading-alt text-[#1C1917]">
              Des offres diversifiées pour répondre à tous vos besoins
            </h2>
            <p className="text-lg text-[#1C1917]/60 font-body max-w-2xl mx-auto leading-relaxed">
              Nous prenons en charge tous les aspects de l'intendance de votre location saisonnière,
              de l&apos;accueil des voyageurs à la maintenance, en passant par la décoration et l&apos;aménagement.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border border-[#E5E5E5] bg-white shadow-sm transition-all hover:border-[#D4AF37]/30 hover:shadow-md"
            >
              <CardHeader className="pt-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAF9] border border-[#E5E5E5] group-hover:border-[#D4AF37]/20 transition-colors">
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="bg-[#FAFAF9] text-[#1C1917] font-body">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-heading-alt text-[#1C1917]">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-[#1C1917]/60 font-body pb-8 leading-relaxed">{service.description}</CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link href="/services">
            <Button size="lg" className="bg-[#1C1917] text-white hover:bg-[#333] font-body px-8 h-12 tracking-wide">
              Découvrir nos forfaits détaillés
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
