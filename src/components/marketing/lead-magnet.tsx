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
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        const errorDetails = data.error ? JSON.stringify(data.error) : ""
        throw new Error(`${data.message || "Une erreur est survenue"} ${errorDetails}`)
      }

      setSubmitted(true)
      // Reset after success if needed, or keep showing success message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        consent: false,
      })
      alert("Votre guide a été envoyé par email !")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi du formulaire.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="lead-magnet" className="bg-transparent py-24">
        <div className="mx-auto max-w-2xl px-6 md:px-12">
          <Card className="border-2 border-[#A6CFE3]/30 bg-white shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-light text-[#1a1a1a]">
                Guide Envoyé !
              </CardTitle>
              <p className="text-[#1a1a1a]/70 font-body mt-2">
                Merci ! Votre guide a été envoyé à l&apos;adresse email indiquée.
              </p>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-[#E9B676] text-white hover:bg-[#d4a565] font-body"
              >
                Retour
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
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
                    disabled={loading}
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
                    disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  required
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked === true })}
                  disabled={loading}
                />
                <Label htmlFor="consent" className="text-sm text-[#1a1a1a]/70 font-body leading-relaxed cursor-pointer">
                  J&apos;accepte que mes données soient utilisées pour recevoir le guide et être contacté par ONDA SERENA
                  concernant mes besoins en services locatifs. Conformément au RGPD, je peux retirer mon consentement à tout moment.
                </Label>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#E9B676] text-white hover:bg-[#d4a565] font-body"
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Télécharger le guide gratuit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

