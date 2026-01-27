
import { redirect } from "next/navigation"
import { getCurrentSession } from "@/lib/session"
import { NewsletterView } from "@/components/dashboard/admin/newsletter-view"
import { serializeFirestoreData } from "@/lib/utils"

export default async function NewsletterPage() {
    const session = await getCurrentSession()
    if (session?.user.role !== "ADMIN") {
        redirect("/")
    }

    const { db } = await import("@/lib/firebase-admin");

    // Fetch all users for the selection list
    const usersSnapshot = await db.collection("users").orderBy("lastName", "asc").get()

    const users = usersSnapshot.docs.map(doc => {
        const data = doc.data()
        return {
            id: doc.id,
            email: data.email || "",
            firstName: data.firstName || null,
            lastName: data.lastName || null,
            marketingOptOut: data.marketingOptOut
        }
    }).filter(u => u.email && u.marketingOptOut !== true) // Filter out users without email OR opt-out

    return (
        <div className="mx-auto max-w-6xl p-6">
            <NewsletterView users={users} />
        </div>
    )
}
