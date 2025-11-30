import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Marie D.",
    location: "Propriétaire à Carry-le-Rouet",
    text: "ONDA SERENA a transformé ma location. Leur gestion est impeccable et mes revenus ont augmenté de 35% la première année. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Jean-Pierre L.",
    location: "Propriétaire à Sausset-les-Pins",
    text: "Service professionnel et réactif. L'équipe s'occupe de tout : check-in, ménage, maintenance. Je peux enfin profiter sereinement de ma résidence secondaire.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    location: "Propriétaire à Martigues",
    text: "Le service décoration a complètement transformé mon appartement. Les voyageurs adorent et les réservations se multiplient. Un investissement qui paie !",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#A8A8A8] font-body mb-4">
            Témoignages clients
          </p>
          <h2 className="text-3xl font-light md:text-4xl text-[#1a1a1a]">
            La confiance de nos propriétaires
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-[#A8A8A8]/20 bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#E9B676] text-[#E9B676]" />
                  ))}
                </div>
                <p className="mb-6 text-[#1a1a1a]/80 font-body leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="border-t border-[#A8A8A8]/20 pt-4">
                  <p className="font-semibold text-[#1a1a1a] font-body">{testimonial.name}</p>
                  <p className="text-sm text-[#A8A8A8] font-body">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

