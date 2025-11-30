"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function LeadMagnetForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    consent: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implémenter l'envoi du formulaire et le téléchargement du PDF
    console.log("Form submitted:", formData)
    alert("Merci ! Le guide sera envoyé à votre adresse email.")
  }

  return (
    <section id="lead-magnet" className="bg-transparent py-24">
      <div className="mx-auto max-w-2xl px-6 md:px-12">
        <Card className="border-2 border-[#A6CFE3]/30 bg-white shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-light text-[#1a1a1a]">
              Guide Essentiel
            </CardTitle>
            <p className="text-[#1a1a1a]/70 font-body mt-2">
              Remplissez le formulaire pour télécharger gratuitement votre guide
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-body">Prénom *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="font-body"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-body">Nom *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="font-body"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="font-body"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="font-body">Localisation du bien *</Label>
                <Input
                  id="location"
                  placeholder="Ex: Carry-le-Rouet, Sausset-les-Pins..."
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="font-body"
                />
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  required
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked === true })}
                />
                <Label htmlFor="consent" className="text-sm text-[#1a1a1a]/70 font-body leading-relaxed cursor-pointer">
                  J&apos;accepte que mes données soient utilisées pour recevoir le guide et être contacté par ONDA SERENA
                  concernant mes besoins en gestion locative. Conformément au RGPD, je peux retirer mon consentement à tout moment.
                </Label>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#E9B676] text-white hover:bg-[#d4a565] font-body"
              >
                Télécharger le guide gratuit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

