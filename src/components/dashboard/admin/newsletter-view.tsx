"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Users, Eye } from "lucide-react"
import { generateNewsletterHtml } from "@/lib/email-renderer"

type User = {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
}

export function NewsletterView({ users }: { users: User[] }) {
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [sendToAll, setSendToAll] = useState(true)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState<{ success: number; failure: number } | null>(null)

    // Preview HTML state
    const [previewHtml, setPreviewHtml] = useState("")
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

    // Update preview when content changes
    useEffect(() => {
        const html = generateNewsletterHtml(content || "Votre contenu apparaîtra ici...", "Prénom")
        setPreviewHtml(html)
    }, [content])

    const handleUserToggle = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!sendToAll && selectedUsers.length === 0) {
            alert("Veuillez sélectionner au moins un destinataire.")
            return
        }

        if (!confirm("Êtes-vous sûr de vouloir envoyer cette newsletter ?")) {
            return
        }

        setLoading(true)
        setStats(null)

        try {
            const res = await fetch("/api/newsletter/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subject,
                    content,
                    sendToAll,
                    recipientIds: sendToAll ? [] : selectedUsers,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Erreur lors de l'envoi")
            }

            setStats({ success: data.stats.success, failure: data.stats.failure })
            alert("Newsletter envoyée avec succès !")

        } catch (error) {
            console.error(error)
            alert("Une erreur est survenue lors de l'envoi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight font-heading">Newsletter</h2>
                    <p className="text-muted-foreground font-body">Envoyez des emails à vos utilisateurs.</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 h-full min-h-0">
                {/* Left Column: Editor & Recipients (Scrollable) */}
                <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rédaction</CardTitle>
                            <CardDescription>Rédigez le contenu de votre email.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Sujet</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Sujet de la newsletter"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content">Message</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Bonjour {{firstName}}, voici les nouvelles..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="min-h-[300px] font-mono text-sm"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Vous pouvez utiliser HTML simple pour le formatage. Les sauts de ligne sont convertis automatiquement.
                                    </p>
                                </div>

                                {/* Recipients Selection embedded in form flow */}
                                <div className="pt-4 border-t">
                                    <Label className="mb-3 block">Destinataires</Label>
                                    <div className="mb-4 flex items-center space-x-2 rounded-md border p-3 bg-muted/50">
                                        <Checkbox
                                            id="all"
                                            checked={sendToAll}
                                            onCheckedChange={(c) => setSendToAll(c === true)}
                                        />
                                        <Label htmlFor="all" className="cursor-pointer font-bold">
                                            Envoyer à tout le monde ({users.length} utilisateurs)
                                        </Label>
                                    </div>

                                    {!sendToAll && (
                                        <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                                            {users.map((user) => (
                                                <div key={user.id} className="flex items-center space-x-2 py-2 border-b last:border-0 border-border/40">
                                                    <Checkbox
                                                        id={user.id}
                                                        checked={selectedUsers.includes(user.id)}
                                                        onCheckedChange={() => handleUserToggle(user.id)}
                                                    />
                                                    <Label htmlFor={user.id} className="cursor-pointer flex-1">
                                                        <span className="font-medium">{user.firstName} {user.lastName}</span>
                                                        <span className="block text-xs text-muted-foreground">{user.email}</span>
                                                    </Label>
                                                </div>
                                            ))}
                                            {users.length === 0 && <p className="text-sm text-muted-foreground">Aucun utilisateur trouvé.</p>}
                                        </div>
                                    )}
                                </div>

                                <Button type="submit" disabled={loading} className="w-full bg-[#E9B676] hover:bg-[#d4a565] text-white mt-4">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" /> Envoyer la newsletter
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {stats && (
                        <Card className="bg-green-50 border-green-200">
                            <CardHeader>
                                <CardTitle className="text-green-800">Résultats du dernier envoi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-green-700">Succès : {stats.success}</p>
                                <p className="text-red-700">Échecs : {stats.failure}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column: Live Preview (Sticky/Fixed height) */}
                <div className="h-full flex flex-col">
                    <Card className="h-full flex flex-col border-2 border-[#E9B676]/20 bg-white shadow-lg overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b py-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Eye className="h-4 w-4" /> Aperçu en direct
                            </CardTitle>
                        </CardHeader>
                        <div className="flex-1 bg-gray-100 p-4 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="w-full h-full max-w-[650px] bg-white shadow-xl rounded-lg overflow-hidden">
                                    <iframe
                                        srcDoc={previewHtml}
                                        title="Email Preview"
                                        className="w-full h-full border-0"
                                        style={{ backgroundColor: '#ffffff' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
