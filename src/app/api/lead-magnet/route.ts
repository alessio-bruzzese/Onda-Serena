
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendLeadMagnetEmail } from "@/lib/mail"

const leadMagnetSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email().max(254),
    location: z.string().min(2).max(100),
    consent: z.boolean().refine((val) => val === true, "Le consentement est requis"),
})

// In-memory rate limit: max 3 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const entry = rateLimitMap.get(ip)
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
        return true
    }
    if (entry.count >= RATE_LIMIT) return false
    entry.count++
    return true
}

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    if (!checkRateLimit(ip)) {
        return NextResponse.json({ message: "Trop de requêtes, veuillez réessayer plus tard." }, { status: 429 })
    }

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
