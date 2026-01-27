
import { auth, db } from "../src/lib/firebase-admin";
import { sendWelcomeEmail } from "../src/lib/mail";

async function diagnose() {
    console.log("--- Diagnosing Firebase Admin & Auth ---");

    // Check Env
    const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    console.log("FIREBASE_SERVICE_ACCOUNT_KEY present:", !!key);
    if (key) {
        try {
            const parsed = JSON.parse(key);
            console.log("Service Account Project ID:", parsed.project_id);
            console.log("Private Key starts with:", parsed.private_key?.substring(0, 20).replace(/\n/g, "\\n"));
        } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON:", e.message);
        }
    } else {
        console.warn("Using default credentials (key missing).");
    }

    // Check DB
    try {
        console.log("Testing Firestore connection...");
        const snapshot = await db.collection("users").limit(1).get();
        console.log("Firestore connection successful. Users found:", !snapshot.empty);
    } catch (e) {
        console.error("Firestore connection failed:", e.message);
    }

    // Check Auth
    try {
        console.log("Testing Auth (List Users)...");
        const listUsers = await auth.listUsers(1);
        console.log("Auth connection successful. Users found:", listUsers.users.length);
    } catch (e) {
        console.error("Auth connection failed (verifyIdToken will likely fail):", e.message);
    }

    // Check Mail
    console.log("--- Testing Welcome Email helper ---");
    try {
        console.log("Simulating welcome email send...");
        const res = await sendWelcomeEmail("test-diag@example.com", "TestUser");
        console.log("Welcome email result:", res);
    } catch (e) {
        console.error("Welcome email threw exception:", e);
    }
}

diagnose();
