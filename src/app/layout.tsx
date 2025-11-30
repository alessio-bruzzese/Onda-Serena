import type { Metadata } from "next"
import { Cinzel_Decorative, Marcellus_SC, Lato, Nunito_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  weight: ["400", "700"],
  subsets: ["latin"],
})

const marcellusSC = Marcellus_SC({
  variable: "--font-marcellus-sc",
  weight: ["400"],
  subsets: ["latin"],
})

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
})

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ONDA SERENA — Conciergerie de confiance sur la Côte Bleue",
  description:
    "Votre tranquillité, notre mission. Conciergerie premium pour propriétaires de locations saisonnières sur la Côte Bleue. Gestion complète, décoration et services voyageurs.",
  metadataBase: new URL("https://ondaserena.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${cinzelDecorative.variable} ${marcellusSC.variable} ${lato.variable} ${nunitoSans.variable} font-sans text-foreground antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
