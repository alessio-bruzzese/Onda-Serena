
import * as dotenv from "dotenv";

// Load environment variables BEFORE importing firebase-admin
dotenv.config();

async function setAdminRole(email: string) {
    try {
        // Dynamic import ensures env vars are loaded first
        const { auth, db } = await import("../src/lib/firebase-admin");

        console.log(`🔍 Recherche de l'utilisateur ${email}...`);
        const user = await auth.getUserByEmail(email);

        console.log(`✅ Utilisateur trouvé: ${user.uid}`);
        console.log("⚙️  Attribution du rôle ADMIN...");

        // 1. Set custom user claims via Auth
        await auth.setCustomUserClaims(user.uid, { role: "ADMIN" });

        // 2. Update Firestore document
        await db.collection("users").doc(user.uid).set({
            role: "ADMIN",
            updatedAt: new Date(),
        }, { merge: true });

        console.log("=".repeat(50));
        console.log(`✅ SUCCÈS : L'utilisateur ${email} est maintenant ADMIN.`);
        console.log("ℹ️  L'utilisateur doit se déconnecter et se reconnecter pour que les changements prennent effet.");
        console.log("=".repeat(50));

    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            console.error(`❌ Erreur : Aucun utilisateur trouvé avec l'email ${email}.`);
            console.error("   Assurez-vous que l'utilisateur s'est déjà inscrit sur le site.");
        } else {
            console.error("❌ Erreur lors de l'attribution du rôle :", error);
        }
        process.exit(1);
    }
}

const email = process.argv[2];

if (!email) {
    console.log("Usage: npx tsx scripts/set-admin-role.ts <email>");
    process.exit(1);
}

setAdminRole(email);
