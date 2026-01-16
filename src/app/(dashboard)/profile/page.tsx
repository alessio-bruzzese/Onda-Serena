import { redirect } from "next/navigation"
import { getCurrentSession } from "@/lib/session"
import { ProfileForm } from "@/components/dashboard/client/profile-form"

export default async function ProfilePage() {
    const session = await getCurrentSession()
    if (!session?.user?.id) {
        redirect("/sign-in")
    }

    const { db } = await import("@/lib/firebase-admin");
    const userDoc = await db.collection("users").doc(session.user.id).get();
    const user = userDoc.exists ? userDoc.data() : null;

    if (!user) {
        redirect("/sign-in")
    }

    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="mb-10 space-y-3 text-[#1a1a1a]">
                <p className="text-sm uppercase tracking-[0.3em] text-[#A8A8A8] font-body">Mon Compte</p>
                <h1 className="text-4xl font-light font-heading-alt">Administration du profil</h1>
                <p className="text-[#1a1a1a]/70 font-body">
                    Mettez à jour vos informations personnelles et vos préférences de service.
                </p>
            </div>

            <ProfileForm
                user={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                }}
                profile={{
                    preferences: user.preferences,
                    lifestyleNotes: user.lifestyleNotes,
                    favoriteServices: user.favoriteServices,
                    tags: user.tags,
                }}
            />
        </div>
    )
}
