import { Heart, Users, Leaf, History, Target, MapPin, Fingerprint } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/marketing/footer"

const storySections = [
  {
    icon: <History className="h-6 w-6 text-[#E9B676]" />,
    title: "Notre Genèse",
    content: "ONDA SERENA est le fruit d'un projet familial ancré dans les valeurs de la région. Également propriétaire d'un bien sur la Côte Bleue, nous avons à coeur de partager notre expérience locale.",
  },
  {
    icon: <Target className="h-6 w-6 text-[#A6CFE3]" />,
    title: "Notre Mission",
    content: "Aider les propriétaires à rentabiliser leur bien sans les tracas de l'intendance. Nous prenons en charge tous les aspects de la location saisonnière, de l'accueil des voyageurs à la maintenance, en passant par la décoration et l'aménagement.",
  },
  {
    icon: <MapPin className="h-6 w-6 text-[#E9B676]" />,
    title: "Notre Force",
    content: "Notre proximité avec les propriétaires et notre connaissance approfondie de la Côte Bleue. Nous sommes locaux, nous connaissons les spécificités de chaque commune, et nous avons construit un réseau de confiance avec les artisans de la région.",
  },
  {
    icon: <Fingerprint className="h-6 w-6 text-[#A6CFE3]" />,
    title: "Notre ADN",
    content: "Conciergerie digitale mais humaine. Nous utilisons les outils modernes pour optimiser l'organisation, mais chaque interaction reste personnalisée et chaleureuse. Chaque client est unique, et nous adaptons nos services à ses besoins spécifiques.",
  },
]

const valeurs = [
  {
    icon: <Heart className="h-6 w-6 text-[#E9B676]" />,
    title: "Proximité",
    description: "Une équipe locale qui connaît la Côte Bleue et ses spécificités. Nous sommes à votre écoute.",
  },
  {
    icon: <Users className="h-6 w-6 text-[#A6CFE3]" />,
    title: "Humain",
    description: "Conciergerie digitale mais humaine. Chaque client est unique et mérite une attention personnalisée.",
  },
  {
    icon: <Leaf className="h-6 w-6 text-[#A6CFE3]" />,
    title: "Engagement écologique",
    description: "Respect de l'environnement : tri sélectif, maîtrise de l'eau, produits locaux et durables.",
  },
]

const equipe = [
  {
    name: "Équipe ONDA SERENA",
    role: "Fondateurs",
    description: "Paul BRUZZESE"
  },
]

export default function AProposPage() {
  return (
    <>
      <div className="min-h-screen bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
          <div className="mb-12 text-center">
            <Badge className="bg-white/80 text-[#1a1a1a] border border-[#A8A8A8]/20 font-body tracking-wider uppercase text-xs px-4 py-1 mb-4">
              Notre Histoire
            </Badge>
            <h1 className="text-4xl font-light md:text-5xl text-[#1a1a1a] mb-6 font-heading-alt">
              À Propos d&apos;ONDA SERENA
            </h1>
            <p className="text-lg text-[#1a1a1a]/60 font-body max-w-2xl mx-auto">
              Plus qu&apos;une conciergerie, un partenaire de confiance pour votre patrimoine.
            </p>
          </div>

          <div className="mb-20 grid gap-8 md:grid-cols-2">
            {storySections.map((section, index) => (
              <Card key={index} className="border-[#A8A8A8]/20 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#E9B676]/30 group">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#A8A8A8]/20 bg-white group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-light font-heading-alt text-[#1a1a1a]">{section.title}</h3>
                  </div>
                  <p className="text-[#1a1a1a]/70 font-body leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center font-heading-alt">Nos Valeurs</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {valeurs.map((valeur, index) => (
                <Card key={index} className="border-[#A8A8A8]/20 bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#A6CFE3]/30 bg-[#A6CFE3]/10">
                        {valeur.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-light mb-2 font-heading-alt">{valeur.title}</h3>
                    <p className="text-sm text-[#1a1a1a]/70 font-body">{valeur.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="rounded-[32px] border-2 border-[#A6CFE3]/30 bg-gradient-to-br from-[#A6CFE3]/10 to-transparent p-8">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#E9B676] bg-[#E9B676]/20">
                    <Users className="h-10 w-10 text-[#E9B676]" />
                  </div>
                </div>
                <h3 className="text-2xl font-light mb-2 font-heading-alt">{equipe[0].name}</h3>
                <p className="text-[#E9B676] font-body mb-4">{equipe[0].role}</p>
                <p className="text-[#1a1a1a]/80 font-body max-w-2xl mx-auto">
                  {equipe[0].description}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border-2 border-[#E9B676]/30 bg-gradient-to-br from-[#E9B676]/10 to-transparent p-8 text-center">
            <h2 className="text-2xl font-light mb-4 font-heading-alt">Rejoignez-nous</h2>
            <p className="text-[#1a1a1a]/80 font-body mb-6">
              Vous souhaitez faire confiance à ONDA SERENA pour l'intendance de votre bien ?
              Contactez-nous pour un rendez-vous personnalisé.
            </p>
            <a
              href="/sign-up"
              className="inline-block rounded-lg bg-[#E9B676] px-8 py-3 text-white hover:bg-[#d4a565] transition font-body font-semibold"
            >
              S&apos;inscrire
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

