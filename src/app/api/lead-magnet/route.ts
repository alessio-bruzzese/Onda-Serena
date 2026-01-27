
import { NextResponse } from "next/server"
import { z } from "zod"
import { sendLeadMagnetEmail } from "@/lib/mail"

const leadMagnetSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    location: z.string().min(2),
    consent: z.boolean().refine((val) => val === true, "Le consentement est requis"),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = leadMagnetSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: "Données invalides", errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const { email, firstName, lastName } = result.data

        console.log(`Sending lead magnet to ${email} (${firstName} ${lastName})`)

        const emailResult = await sendLeadMagnetEmail(email, firstName, lastName)

        if (!emailResult.success) {
            return NextResponse.json(
                { message: "Erreur lors de l'envoi de l'email", error: emailResult.error },
                { status: 500 }
            )
        }

        return NextResponse.json({ message: "Guide envoyé avec succès" })
    } catch (error) {
        console.error("Lead magnet API error:", error)
        return NextResponse.json(
            { message: "Une erreur interne est survenue" },
            { status: 500 }
        )
    }
}
