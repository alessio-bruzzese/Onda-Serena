import { Sparkles, Rocket, Leaf } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/marketing/footer"
import { PricingSection } from "@/components/marketing/pricing-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
              Un accompagnement transparent et haut de gamme.
            </p>
          </div>

          <div className="mx-auto w-full max-w-5xl mb-12 grid gap-8 md:grid-cols-2">
            <Card className="border-[#D4AF37] bg-[#FAFAF9] shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-white text-xs px-3 py-1 rounded-bl-lg font-body font-medium">
                Obligatoire à la prise en charge
              </div>
              <CardHeader className="flex flex-row items-center gap-6 pb-2">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white border border-[#D4AF37]">
                  <Rocket className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-heading-alt text-[#1C1917]">Pack Starter</CardTitle>
                  <div className="flex flex-col">
                    <span className="text-lg font-light text-[#D4AF37]/60 line-through font-body">250€</span>
                    <span className="text-lg font-medium text-[#D4AF37] font-body">Offert jusqu&apos;au 1er mai</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-[#1C1917]/70 font-body pl-[5.5rem]">
                <p>
                  Mise en ligne de l&apos;annonce, photos professionnelles du logement, et mise à disposition du linge de qualité hôtelière.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#A6CFE3] bg-[#F0F9FF] shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#A6CFE3] text-[#1C1917] text-xs px-3 py-1 rounded-bl-lg font-body font-medium">
                Obligatoire à la prise en charge
              </div>
              <CardHeader className="flex flex-row items-center gap-6 pb-2">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white border border-[#A6CFE3]">
                  <Leaf className="h-8 w-8 text-[#A6CFE3]" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-heading-alt text-[#1C1917]">Pack Réapprovisionnement</CardTitle>
                  <p className="text-xl font-light text-[#5C8CA5] font-body">10€ / mois</p>
                </div>
              </CardHeader>
              <CardContent className="text-[#1C1917]/70 font-body pl-[5.5rem]">
                <p>
                  Fourniture de produits ménagers et d&apos;hygiène corporelle respectueux de l&apos;environnement pour le confort de vos voyageurs.
                </p>
              </CardContent>
            </Card>
          </div>

          <PricingSection />

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
                Ces services additionnels sont disponibles en option.
                Contactez-nous pour un devis personnalisé.
              </div>
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}

