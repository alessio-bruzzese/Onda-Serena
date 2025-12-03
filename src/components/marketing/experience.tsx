import { CheckCircle2, Clock9, Globe2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"


const highlights = [
  {
    title: "Taux d'occupation moyen",
    value: "85%",
    detail: "sur l'année",
  },
  {
    title: "Temps de réponse",
    value: "2h",
    detail: "en moyenne",
  },
  {
    title: "Satisfaction voyageurs",
    value: "4.9/5",
    detail: "sur les plateformes",
  },
]

const pillars = [
  {
    icon: <CheckCircle2 className="h-5 w-5 text-[#A6CFE3]" />,
    title: "Proximité & Humain",
    description: "Conciergerie digitale mais humaine. Une équipe locale à votre écoute pour un service personnalisé.",
  },
  {
    icon: <Clock9 className="h-5 w-5 text-[#E9B676]" />,
    title: "Réactivité",
    description: "Intervention rapide pour la maintenance et le support. Disponibilité 24/7 pour vos voyageurs.",
  },
  {
    icon: <Globe2 className="h-5 w-5 text-[#A6CFE3]" />,
    title: "Engagement écologique",
    description: "Tri sélectif, gestion de l'eau, produits locaux. Nous respectons l'environnement de la Côte Bleue.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6 md:px-12">
        <div className="grid gap-8 rounded-3xl border border-[#A8A8A8]/20 bg-white/80 p-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm text-[#1a1a1a]/70 font-body mb-4">
              Résultats concrets
            </p>
            <h3 className="text-3xl font-light leading-tight md:text-4xl">
              Une gestion optimisée pour maximiser vos revenus locatifs
            </h3>
            <p className="text-[#1a1a1a]/70 font-body">
              Notre expertise de la Côte Bleue et notre réseau local nous permettent d&apos;optimiser
              chaque aspect de votre location : tarification, visibilité, qualité d&apos;accueil et maintenance.
            </p>
          </div>
          <div className="space-y-4 rounded-3xl border border-[#A8A8A8]/20 bg-white/80 p-6 shadow-md">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#A8A8A8]/20 bg-[#F5E9D4]/30 p-4">
                <p className="text-sm text-[#A8A8A8] font-body mb-1">{item.title}</p>
                <p className="text-3xl font-light text-[#1a1a1a]">{item.value}</p>
                <p className="text-sm text-[#A8A8A8] font-body">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 pt-12">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="border-[#A8A8A8]/20 bg-white shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#A6CFE3]/30 bg-[#A6CFE3]/10">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-light mb-2">{pillar.title}</h4>
                <p className="text-sm text-[#1a1a1a]/70 font-body">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section >
  )
}
