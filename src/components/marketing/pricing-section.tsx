"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"

const forfaits = [
    {
        name: "Formule Essentielle",
        price: "18% HT",
        description: "Standard",
        features: [
            "Check-in/out",
            "Ménage professionnel / Linge soigné",
            "Maintenance réactive",
            "Support 24/7",
        ],
        popular: false,
    },
    {
        name: "Formule Prestige",
        price: "20% HT",
        description: "Haut de gamme",
        features: [
            "Tout de la Formule Essentielle",
            "Tarification dynamique",
            "Kits d'accueil avec produits locaux",
            "Rapport locatif mensuel",
            "Livret d'accueil",
            "Prise en charge des réservations des activités auprès de nos partenaires",
        ],
        popular: true,
    },
    {
        name: "Nos prestations à la demande",
        price: "Sur devis",
        description: "",
        features: [
            "Forfait décoration",
            "Aménagement du bien",
        ],
        popular: false,
    },
]

export function PricingSection() {
    const { data: session } = useSession()
    const dashboardUrl = (session?.user as { role?: string })?.role === "ADMIN" ? "/admin" : "/dashboard"

    return (
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
                        <Link href={session ? dashboardUrl : "/sign-up"} className="block">
                            <Button
                                className={`w-full font-body h-12 text-sm tracking-wide transition-all ${forfait.popular
                                    ? "bg-[#1C1917] text-white hover:bg-[#333]"
                                    : "bg-transparent border border-[#1C1917]/20 text-[#1C1917] hover:bg-[#1C1917] hover:text-white"
                                    }`}
                            >
                                Choisir cette prestation
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
