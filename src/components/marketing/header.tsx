"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos Services", href: "/services" },
  { label: "Expérience Voyageur", href: "/experience-voyageur" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  const dashboardUrl = (session?.user as { role?: string })?.role === "ADMIN" ? "/admin" : "/dashboard"

  return (
    <header
      className={cn(
        "sticky top-4 z-50 mx-auto w-[95%] max-w-7xl border border-[#A8A8A8]/20 bg-[#b8a388]/60 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300",
        mobileMenuOpen ? "rounded-[2rem]" : "rounded-full"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight hover:opacity-80 transition">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white overflow-hidden">
            <Image
              src="/icon.png"
              alt="Onda Serena Logo"
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-heading text-2xl text-[#1a1a1a]">ONDA SERENA</span>
        </Link >

        <nav className="hidden items-center gap-8 text-base font-medium text-[#1a1a1a]/80 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#001F3F] font-body"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={session ? dashboardUrl : "/sign-in"}
            className="transition hover:text-[#001F3F] font-body font-bold text-white"
          >
            Dashboard
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {session ? (
            <>
              <Button
                variant="ghost"
                className="text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body gap-2"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </Button>
              <Link href="/profile">
                <Button className="bg-white text-[#b8a388] hover:bg-white/90 font-body">
                  Profil
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" className="text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body">
                  Se connecter
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-white text-[#b8a388] hover:bg-white/90 font-body">
                  S&apos;inscrire
                </Button>
              </Link>
            </>
          )}
        </div>

        <Button
          size="icon"
          variant="outline"
          className="border-[#1a1a1a]/30 bg-white text-[#1a1a1a] hover:bg-[#F5E9D4]/50 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div >

      {/* Menu mobile */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#A8A8A8]/20 bg-white">
            <nav className="mx-auto max-w-7xl px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-[#1a1a1a]/80 hover:text-[#001F3F] font-body transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={session ? dashboardUrl : "/sign-in"}
                className="block text-sm font-medium text-[#E9B676] hover:text-[#001F3F] font-body transition font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-4 space-y-2 border-t border-[#A8A8A8]/20">
                {session ? (
                  <>
                    <Link href="/profile">
                      <Button className="bg-white text-[#b8a388] hover:bg-white/90 font-body">
                        Profil
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body gap-2 justify-start"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="h-4 w-4" />
                      Se déconnecter
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" className="block">
                      <Button variant="ghost" className="w-full text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body">
                        Se connecter
                      </Button>
                    </Link>
                    <Link href="/sign-up" className="block">
                      <Button className="w-full bg-white text-[#b8a388] hover:bg-white/90 font-body">
                        S&apos;inscrire
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )
      }
    </header >
  )
}

