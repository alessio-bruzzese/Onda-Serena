import Link from "next/link"
import { Instagram, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Nos Forfaits", href: "/services" },
      { label: "Expérience Voyageur", href: "/experience-voyageur" },
      { label: "Décoration", href: "/services#decoration" },
    ],
  },
  {
    title: "ONDA SERENA",
    links: [
      { label: "À Propos", href: "/a-propos" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/sign-up" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions Légales", href: "/mentions-legales" },
      { label: "Conditions Générales", href: "/terms" },
      { label: "Politique de Confidentialité", href: "/politique-confidentialite" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-[#FAFAF9] text-[#1C1917]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.5fr_1fr] md:px-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1C1917]/10 bg-white">
              <Sun className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <p className="text-lg font-semibold tracking-tight font-heading-alt">ONDA SERENA</p>
          </div>
          <p className="text-sm text-[#1C1917]/70 font-body max-w-md">
            Conciergerie de confiance sur la Côte Bleue. Votre tranquillité, notre mission.
            Gestion complète de votre location saisonnière avec services premium.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/OndaSerena"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#1C1917]/70 hover:text-[#D4AF37] transition font-body"
            >
              <Instagram className="h-5 w-5" />
              <span>@OndaSerena</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-[#1C1917]/10 text-[#1C1917]/70 font-body text-xs bg-white/50">
              Engagement écologique
            </Badge>
            <Badge variant="outline" className="border-[#1C1917]/10 text-[#1C1917]/70 font-body text-xs bg-white/50">
              Local & Proximité
            </Badge>
          </div>
          <p className="text-[#1C1917]/40 text-sm font-body pt-4">
            © {new Date().getFullYear()} ONDA SERENA. Tous droits réservés.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3 text-sm font-body">
              <p className="font-semibold text-[#1C1917] font-heading-alt">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#1C1917]/60 cursor-pointer transition hover:text-[#D4AF37]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
