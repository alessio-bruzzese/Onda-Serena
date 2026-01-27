
import * as dotenv from "dotenv";

// Load environment variables BEFORE importing firebase-admin
dotenv.config();

async function createTestUser() {
    const email = "alessio.bruzzese@edu.esiee.fr";
    const firstName = "Alessio";
    const lastName = "TestCron";

    try {
        // Dynamic import
        const { auth, db } = await import("../src/lib/firebase-admin");

        console.log(`🔍 Préparation du test pour : ${email}`);

        // 1. Get or Create User in Auth
        let uid;
        try {
            const userRecord = await auth.getUserByEmail(email);
            uid = userRecord.uid;
            console.log(`✅ Utilisateur existant trouvé : ${uid}`);
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                const userRecord = await auth.createUser({
                    email,
                    emailVerified: true,
                    displayName: `${firstName} ${lastName}`,
                    password: "password123!" // Temporary password
                });
                uid = userRecord.uid;
                console.log(`✅ Nouvel utilisateur créé : ${uid}`);
            } else {
                throw error;
            }
        }

        // 2. Set 'createdAt' to 2 days ago
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        // Set to noon to be safe within the day range
        twoDaysAgo.setHours(12, 0, 0, 0);

        console.log(`📅 Définition de la date d'inscription à : ${twoDaysAgo.toISOString()} (il y a 2 jours)`);

        await db.collection("users").doc(uid).set({
            firstName,
            lastName,
            email,
            role: "CLIENT",
            createdAt: twoDaysAgo.toISOString(), // Stored as ISO String to match app behavior
            updatedAt: new Date().toISOString()
        }, { merge: true });

        // 3. Ensure NO bookings exist for this user (so the email is triggered)
        const bookingsSnapshot = await db.collection("bookings").where("userId", "==", uid).get();
        if (!bookingsSnapshot.empty) {
            console.log(`🗑️  Suppression de ${bookingsSnapshot.size} réservation(s) existante(s) pour que le test fonctionne...`);
            const batch = db.batch();
            bookingsSnapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            console.log("✅ Réservations supprimées.");
        } else {
            console.log("✅ Aucune réservation trouvée (condition respectée).");
        }

        console.log("=".repeat(60));
        console.log("✅ PRÊT POUR LE TEST !");
        console.log("L'utilisateur respecte maintenant les critères :");
        console.log("  1. Inscrit il y a exactement 2 jours.");
        console.log("  2. Aucune réservation.");
        console.log("=".repeat(60));
        console.log("👉 Vous pouvez maintenant lancer l'API Cron pour vérifier l'envoi du mail.");
        console.log("   URL locale : http://localhost:3000/api/cron/reminders");
        console.log("=".repeat(60));

    } catch (error) {
        console.error("❌ Erreur :", error);
        process.exit(1);
    }
}

createTestUser();
