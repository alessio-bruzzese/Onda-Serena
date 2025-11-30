"use client"

import { useState, useTransition } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { updateProfile } from "@/app/(dashboard)/dashboard/actions"

type ProfilePanelProps = {
  profile?: {
    preferences: string | null
    lifestyleNotes: string | null
    favoriteServices: string[]
    tags: string[]
  }
}

export function ProfilePanel({ profile }: ProfilePanelProps) {
  const [preferences, setPreferences] = useState(profile?.preferences ?? "")
  const [notes, setNotes] = useState(profile?.lifestyleNotes ?? "")
  const [favoriteServices, setFavoriteServices] = useState(profile?.favoriteServices.join(", ") ?? "")
  const [tags, setTags] = useState(profile?.tags.join(", ") ?? "")
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    setFeedback(null)
    startTransition(async () => {
      const result = await updateProfile({
        preferences,
        lifestyleNotes: notes,
        favoriteServices,
        tags,
      })
      if (result?.error) {
        setFeedback(result.error)
        return
      }
      setFeedback(result?.success ?? "Profil mis à jour.")
    })
  }

  return (
    <div className="rounded-3xl border border-[#A8A8A8]/20 bg-white/50 p-6 text-[#1a1a1a] shadow-sm">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A8A8A8] font-body">Profil & CRM</p>
        <h2 className="text-2xl font-light font-heading-alt">Préférences personnelles</h2>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-sm text-[#1a1a1a]/70 font-body">Expériences favorites</label>
          <Textarea
            className="mt-2 bg-white border-[#A8A8A8]/30 font-body"
            rows={4}
            value={preferences}
            onChange={(event) => setPreferences(event.target.value)}
            placeholder="Hôtels favoris, compagnies aériennes, préférences vins..."
          />
        </div>

        <div>
          <label className="text-sm text-[#1a1a1a]/70 font-body">Notes lifestyle</label>
          <Textarea
            className="mt-2 bg-white border-[#A8A8A8]/30 font-body"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Points d'attention santé, protocole sécurité, staff..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-[#1a1a1a]/70 font-body">Services favoris (séparés par une virgule)</label>
            <Textarea
              className="mt-2 bg-white border-[#A8A8A8]/30 font-body"
              rows={2}
              value={favoriteServices}
              onChange={(event) => setFavoriteServices(event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-[#1a1a1a]/70 font-body">Tags CRM</label>
            <Textarea
              className="mt-2 bg-white border-[#A8A8A8]/30 font-body"
              rows={2}
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Art, Family Office, Crypto..."
            />
          </div>
        </div>

        {feedback && <p className="text-sm text-emerald-600 font-body">{feedback}</p>}

        <Button className="h-11 w-full bg-[#E9B676] text-white hover:bg-[#d4a565] font-body" onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Enregistrement..." : "Mettre à jour"}
        </Button>
      </div>
    </div>
  )
}






