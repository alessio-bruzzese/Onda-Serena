import { Check, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Footer } from "@/components/marketing/footer"

const forfaits = [
  {
    name: "Formula Essenziale",
    price: "18%",
    description: "Gestion basique",
    features: [
      "Check-in/out",
      "Ménage professionnel",
      "Linge soigné",
      "Maintenance réactive",
      "Support client",
    ],
    popular: false,
  },
  {
    name: "Formula Serena",
    price: "20%",
    description: "Standard",
    features: [
      "Tout de la Formula Essenziale",
      "Optimisation tarifaire",
      "Gestion des réservations",
      "Reporting mensuel",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    name: "Formula Prestigio",
    price: "25%",
    description: "Premium/Luxe",
    features: [
      "Tout de la Formula Serena",
      "Service décoration inclus",
      "Aménagement du bien",
      "Conciergerie voyageurs premium",
      "Gestionnaire dédié",
      "Support 24/7",
    ],
    popular: false,
  },
]

const prestations = [
  {
    title: "Check-in/out professionnel",
    description: "Accueil personnalisé des voyageurs, remise des clés, présentation du bien et des équipements.",
  },
  {
    title: "Ménage professionnel",
    description: "Nettoyage approfondi après chaque séjour, respect des normes d'hygiène et de qualité.",
  },
  {
    title: "Linge soigné",
    description: "Lavage, repassage et rangement du linge de maison. Draps et serviettes de qualité premium.",
  },
  {
    title: "Maintenance réactive",
    description: "Intervention rapide en cas de problème technique. Réseau d'artisans locaux de confiance.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <div className="min-h-screen bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <div className="mb-20 text-center">
            <Badge className="mb-6 bg-white/80 text-[#1a1a1a] border border-[#A8A8A8]/20 font-body tracking-wider uppercase text-xs px-4 py-1">
              Nos Services
            </Badge>
            <h1 className="text-4xl font-light md:text-6xl text-[#1C1917] mb-6 font-heading-alt tracking-tight">
              L&apos;Excellence à l&apos;Italienne
            </h1>
            <p className="text-lg text-[#1C1917]/60 font-body max-w-2xl mx-auto leading-relaxed">
              Des formules conçues pour votre tranquillité d&apos;esprit.
              Une gestion transparente et haut de gamme.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-24 items-start">
            {forfaits.map((forfait) => (
              <Card
                key={forfait.name}
                className={`relative border transition-all duration-300 ${forfait.popular
                  ? "border-[#D4AF37] shadow-xl bg-white scale-105 z-10"
                  : "border-[#E5E5E5] bg-white/50 hover:border-[#D4AF37]/30 hover:bg-white shadow-sm"
                  }`}
              >
                {forfait.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#D4AF37] text-white hover:bg-[#C4A030] font-body px-4 py-1">Recommandé</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8 pb-6">
                  <CardTitle className="text-2xl mb-4 font-heading-alt text-[#1C1917]">{forfait.name}</CardTitle>
                  <div className="mb-2 flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-light text-[#1C1917]">{forfait.price}</span>
                  </div>
                  <p className="text-sm text-[#1C1917]/40 font-body uppercase tracking-widest">{forfait.description}</p>
                </CardHeader>
                <CardContent className="pb-8 px-8">
                  <ul className="space-y-4 mb-8">
                    {forfait.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 font-body text-sm text-[#1C1917]/70">
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${forfait.popular ? "text-[#D4AF37]" : "text-[#1C1917]/30"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up" className="block">
                    <Button
                      className={`w-full font-body h-12 text-sm tracking-wide transition-all ${forfait.popular
                        ? "bg-[#1C1917] text-white hover:bg-[#333]"
                        : "bg-transparent border border-[#1C1917]/20 text-[#1C1917] hover:bg-[#1C1917] hover:text-white"
                        }`}
                    >
                      Choisir cette formule
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light md:text-4xl text-[#1C1917] mb-4 font-heading-alt">
                Détail des prestations
              </h2>
              <div className="h-px w-24 bg-[#D4AF37]/30 mx-auto mb-6"></div>
              <p className="text-[#1C1917]/60 font-body">
                L&apos;art de recevoir, maîtrisé dans les moindres détails
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {prestations.map((prestation, index) => (
                <div key={index} className="group p-8 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D4AF37]/30 transition-colors">
                  <h3 className="text-xl font-light mb-3 font-heading-alt text-[#1C1917]">{prestation.title}</h3>
                  <p className="text-[#1C1917]/60 font-body leading-relaxed">{prestation.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/60 backdrop-blur-md border border-[#A6CFE3]/30 p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#A6CFE3]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5E9D4]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A6CFE3]/20 border border-[#A6CFE3]/40">
                  <Sparkles className="h-5 w-5 text-[#1C1917]" />
                </div>
                <h2 className="text-3xl font-light font-heading-alt text-[#1C1917]">Le &quot;Plus&quot; ONDA SERENA</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 font-body text-[#1C1917]/80 leading-relaxed">
                <div>
                  <strong className="block text-[#1C1917] mb-2 font-heading-alt tracking-wide">Forfait Décoration</strong>
                  <p>
                    Transformez votre bien avec notre service de décoration sur-mesure.
                    Nous optimisons l&apos;espace, choisissons le mobilier et les accessoires
                    pour créer une ambiance premium qui augmente la valeur locative.
                  </p>
                </div>
                <div>
                  <strong className="block text-[#1C1917] mb-2 font-heading-alt tracking-wide">Aménagement du bien</strong>
                  <p>
                    Nous vous accompagnons dans l&apos;aménagement complet de votre bien
                    pour maximiser son potentiel locatif. De la conception à la réalisation,
                    nous gérons tout pour vous.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#1C1917]/10 text-sm text-[#1C1917]/60 font-body">
                Ces services additionnels sont disponibles en option ou inclus dans la Formula Prestigio.
                Contactez-nous pour un devis personnalisé.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

