
import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentSession } from "@/lib/session"
import { sendNewsletter } from "@/lib/mail"
import { db } from "@/lib/firebase-admin"

const newsletterSchema = z.object({
    subject: z.string().min(1, "Le sujet est requis"),
    content: z.string().min(1, "Le contenu est requis"),
    recipientIds: z.array(z.string()).optional(),
    sendToAll: z.boolean().default(false),
})

export async function POST(req: Request) {
    try {
        const session = await getCurrentSession()
        if (session?.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Non autorisé" }, { status: 403 })
        }

        const body = await req.json()
        const result = newsletterSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: "Données invalides", errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const { subject, content, recipientIds, sendToAll } = result.data

        let recipients: { email: string; firstName: string }[] = []

        if (sendToAll) {
            const usersSnapshot = await db.collection("users").get()
            usersSnapshot.forEach(doc => {
                const data = doc.data()
                if (data.email && data.marketingOptOut !== true) {
                    recipients.push({ email: data.email, firstName: data.firstName || "Cher membre" })
                }
            })
        } else if (recipientIds && recipientIds.length > 0) {
            // Fetch only selected users
            // Note: "in" query limited to 10 in Firestore, so we might need to batch or fetch all and filter
            // For simplicity here: fetch all docs by ID
            const userRefs = recipientIds.map(id => db.collection("users").doc(id))
            const userDocs = await db.getAll(...userRefs)

            userDocs.forEach(doc => {
                if (doc.exists) {
                    const data = doc.data()
                    if (data?.email) {
                        recipients.push({ email: data.email, firstName: data.firstName || "Cher membre" })
                    }
                }
            })
        } else {
            return NextResponse.json({ message: "Aucun destinataire sélectionné" }, { status: 400 })
        }

        if (recipients.length === 0) {
            return NextResponse.json({ message: "Aucun destinataire valide trouvé" }, { status: 400 })
        }

        const emailResult = await sendNewsletter(subject, content, recipients)

        return NextResponse.json({
            message: "Envoi terminé",
            stats: {
                total: recipients.length,
                success: emailResult.successCount,
                failure: emailResult.errorCount
            }
        })

    } catch (error) {
        console.error("Newsletter API error:", error)
        return NextResponse.json(
            { message: "Une erreur interne est survenue" },
            { status: 500 }
        )
    }
}
