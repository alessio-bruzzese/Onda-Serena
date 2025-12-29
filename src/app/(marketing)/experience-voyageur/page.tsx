import { Gift, Anchor, Utensils, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/marketing/footer"

const services = [
  {
    title: "Kits d'accueil premium",
    description:
      "Accueillez vos voyageurs avec des produits locaux de qualité : brousses du Rove, confitures artisanales, et spécialités de la Côte Bleue.",
    icon: <Gift className="h-6 w-6 text-[#E9B676]" />,
  },
  {
    title: "Activités locales",
    description:
      "Nous nous chargeons de réserver pour vos clients des activités nautiques, des expériences dégustations ... Nous proposons également des visites guidées sur des parcours de randonnées des calanques.",
    icon: <Anchor className="h-6 w-6 text-[#A6CFE3]" />,
  },
  {
    title: "Recommandations gastronomiques",
    description:
      "Guide personnalisé des meilleurs restaurants, bars à vin et adresses secrètes de la Côte Bleue.",
    icon: <Utensils className="h-6 w-6 text-[#E9B676]" />,
  },
]

export default function ExperienceVoyageurPage() {
  return (
    <>
      <div className="min-h-screen bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
          <div className="mb-12 text-center">
            <Badge className="bg-white/80 text-[#1a1a1a] border border-[#A8A8A8]/20 font-body tracking-wider uppercase text-xs px-4 py-1 mb-4">
              Expérience Voyageur
            </Badge>
            <h1 className="text-4xl font-light md:text-5xl text-[#1a1a1a] mb-4">
              Chouchouter vos voyageurs
            </h1>
            <p className="text-lg text-[#1a1a1a]/80 font-body max-w-2xl mx-auto">
              Même si notre objectif principal est de faciliter les démarches des propriétaires, nous savons que des voyageurs
              satisfaits sont la clé de revenus locatifs durables. Découvrez nos services dédiés
              à l&apos;expérience de vos locataires.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-16">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`border-[#A8A8A8]/20 bg-white shadow-lg hover:shadow-xl transition-shadow ${index === 2 ? "md:col-span-2 md:w-[calc(50%-0.75rem)] md:justify-self-center" : ""
                  }`}
              >
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#A6CFE3]/30 bg-[#A6CFE3]/10">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-light">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1a1a1a]/70 font-body leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-[32px] border-2 border-white/50 bg-white/80 backdrop-blur p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-light mb-6 text-center">
              Pourquoi investir dans l&apos;expérience voyageur ?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-light text-[#A6CFE3] mb-2">+25%</div>
                <p className="text-[#1a1a1a]/70 font-body">de revenus moyens</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#E9B676] mb-2">4.9/5</div>
                <p className="text-[#1a1a1a]/70 font-body">note moyenne voyageurs</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-[#A6CFE3] mb-2">85%</div>
                <p className="text-[#1a1a1a]/70 font-body">taux de récurrence</p>
              </div>
            </div>
            <p className="text-center text-[#1a1a1a]/70 font-body mt-8 max-w-2xl mx-auto">
              Des voyageurs satisfaits laissent de meilleurs avis, reviennent plus souvent,
              et recommandent votre bien. C&apos;est un investissement qui se rentabilise rapidement.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

