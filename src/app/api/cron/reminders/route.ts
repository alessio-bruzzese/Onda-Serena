
import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"
import { sendRetentionEmail } from "@/lib/mail"
import { serializeFirestoreData } from "@/lib/utils"

// Helper to get start and end of a specific date in the past
function getDateRange(daysAgo: number) {
    const start = new Date()
    start.setDate(start.getDate() - daysAgo)
    start.setHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setHours(23, 59, 59, 999)

    return { start, end }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get("secret")

    // Retrieve CRON_SECRET from env or use a fallback for dev simple protection
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && secret !== cronSecret) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const stats = {
        days2: { candidates: 0, sent: 0 },
        weeks3: { candidates: 0, sent: 0 },
        errors: 0
    }

    try {
        // --- 1. Check for D+2 ---
        const d2 = getDateRange(2)
        const snapshotD2 = await db.collection("users")
            .where("createdAt", ">=", d2.start.toISOString())
            .where("createdAt", "<=", d2.end.toISOString())
            .get()

        for (const doc of snapshotD2.docs) {
            stats.days2.candidates++
            const user = serializeFirestoreData(doc.data()) // serialize to handle timestamps
            const userId = doc.id

            // Check if user has ANY booking
            const bookingsSnap = await db.collection("bookings")
                .where("userId", "==", userId)
                .limit(1)
                .get()

            if (bookingsSnap.empty && user.email) {
                // User has no bookings -> SEND EMAIL
                const res = await sendRetentionEmail('DAYS_2', { email: user.email, firstName: user.firstName || "Cher membre" })
                if (res.success) stats.days2.sent++
                else stats.errors++
            }
        }

        // --- 2. Check for D+21 (3 weeks) ---
        const d21 = getDateRange(21)
        const snapshotD21 = await db.collection("users")
            .where("createdAt", ">=", d21.start.toISOString())
            .where("createdAt", "<=", d21.end.toISOString())
            .get()

        for (const doc of snapshotD21.docs) {
            stats.weeks3.candidates++
            const user = serializeFirestoreData(doc.data())
            const userId = doc.id

            // Check if user has ANY booking
            const bookingsSnap = await db.collection("bookings")
                .where("userId", "==", userId)
                .limit(1)
                .get()

            if (bookingsSnap.empty && user.email) {
                // User has no bookings -> SEND EMAIL
                const res = await sendRetentionEmail('WEEKS_3', { email: user.email, firstName: user.firstName || "Cher membre" })
                if (res.success) stats.weeks3.sent++
                else stats.errors++
            }
        }

        return NextResponse.json({ success: true, processed: new Date(), stats })

    } catch (error) {
        console.error("Cron Job Error:", error)
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 })
    }
}
