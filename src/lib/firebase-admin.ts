import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// eslint-disable-next-line @typescript-eslint/no-require-imports
// const serviceAccount = require("../../service-account.json");

const serviceAccount = (() => {
    const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!key) return undefined;

    try {
        return JSON.parse(key);
    } catch {
        try {
            // Handle potential multiline strings from .env that need explicit escaping
            return JSON.parse(key.replace(/\n/g, "\\n"));
        } catch (error) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error);
            return undefined;
        }
    }
})();

if (!serviceAccount) {
    console.error("FIREBASE_SERVICE_ACCOUNT_KEY is missing. Authentication will fail.");
}

const app = !getApps().length
    ? initializeApp(
        serviceAccount
            ? { credential: cert(serviceAccount) }
            : {}
    )
    : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
