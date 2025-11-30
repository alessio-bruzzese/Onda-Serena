import { Heart, Users, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/marketing/footer"

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
    description: "Respect de l'environnement : tri sélectif, gestion de l'eau, produits locaux et durables.",
  },
]

const equipe = [
  {
    name: "Équipe ONDA SERENA",
    role: "Fondateurs",
    description: "Une reconversion professionnelle et un projet familial au service de la Côte Bleue.",
  },
]

export default function AProposPage() {
  return (
    <>
      <div className="min-h-screen bg-transparent">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
          <div className="mb-12 text-center">
            <Badge className="bg-white/80 text-[#1a1a1a] border border-[#A8A8A8]/20 font-body tracking-wider uppercase text-xs px-4 py-1 mb-4">
              Notre Histoire
            </Badge>
            <h1 className="text-4xl font-light md:text-5xl text-[#1a1a1a] mb-6">
              À Propos d&apos;ONDA SERENA
            </h1>
          </div>

          <div className="mb-16 space-y-6 text-[#1a1a1a]/80 font-body leading-relaxed">
            <p className="text-lg">
              <strong className="text-[#1a1a1a]">ONDA SERENA</strong> est née d&apos;une reconversion
              professionnelle et d&apos;un projet familial ancré dans les valeurs de la Côte Bleue.
            </p>
            <p>
              Après des années dans un autre secteur, nous avons choisi de nous reconvertir pour
              créer une conciergerie qui allie <strong className="text-[#1a1a1a]">digital et humain</strong>.
              Nous croyons fermement que la technologie doit servir l&apos;humain, pas le remplacer.
            </p>
            <p>
              Notre mission est simple : <strong className="text-[#1a1a1a]">aider les propriétaires
                à rentabiliser leur bien sans les tracas de la gestion</strong>. Nous prenons en charge
              tous les aspects de la location saisonnière, de l&apos;accueil des voyageurs à la maintenance,
              en passant par la décoration et l&apos;aménagement.
            </p>
            <p>
              Ce qui nous distingue ? Notre <strong className="text-[#1a1a1a]">proximité</strong> avec
              les propriétaires et notre connaissance approfondie de la Côte Bleue. Nous sommes locaux,
              nous connaissons les spécificités de chaque commune, et nous avons construit un réseau
              de confiance avec les artisans et prestataires de la région.
            </p>
            <p>
              <strong className="text-[#1a1a1a]">Conciergerie digitale mais humaine</strong> : c&apos;est
              notre ADN. Nous utilisons les outils modernes pour optimiser la gestion, mais chaque
              interaction reste personnalisée et chaleureuse. Chaque client est unique, et nous
              adaptons nos services à ses besoins spécifiques.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center">Nos Valeurs</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {valeurs.map((valeur, index) => (
                <Card key={index} className="border-[#A8A8A8]/20 bg-white shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#A6CFE3]/30 bg-[#A6CFE3]/10">
                        {valeur.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-light mb-2">{valeur.title}</h3>
                    <p className="text-sm text-[#1a1a1a]/70 font-body">{valeur.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center">L&apos;Équipe</h2>
            <div className="rounded-[32px] border-2 border-[#A6CFE3]/30 bg-gradient-to-br from-[#A6CFE3]/10 to-transparent p-8">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#E9B676] bg-[#E9B676]/20">
                    <Users className="h-10 w-10 text-[#E9B676]" />
                  </div>
                </div>
                <h3 className="text-2xl font-light mb-2">{equipe[0].name}</h3>
                <p className="text-[#E9B676] font-body mb-4">{equipe[0].role}</p>
                <p className="text-[#1a1a1a]/80 font-body max-w-2xl mx-auto">
                  {equipe[0].description}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border-2 border-[#E9B676]/30 bg-gradient-to-br from-[#E9B676]/10 to-transparent p-8 text-center">
            <h2 className="text-2xl font-light mb-4">Rejoignez-nous</h2>
            <p className="text-[#1a1a1a]/80 font-body mb-6">
              Vous souhaitez faire confiance à ONDA SERENA pour la gestion de votre bien ?
              Contactez-nous pour un rendez-vous personnalisé.
            </p>
            <a
              href="/sign-up"
              className="inline-block rounded-lg bg-[#E9B676] px-8 py-3 text-white hover:bg-[#d4a565] transition font-body"
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

