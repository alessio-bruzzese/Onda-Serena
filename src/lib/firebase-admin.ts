import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// eslint-disable-next-line @typescript-eslint/no-require-imports
// const serviceAccount = require("../../service-account.json");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\n/g, "\\n"))
    : undefined;

if (!serviceAccount) {
    console.error("FIREBASE_SERVICE_ACCOUNT_KEY is missing. Authentication will fail.");
}

const app = !getApps().length
    ? initializeApp({
        credential: serviceAccount ? cert(serviceAccount) : undefined,
    })
    : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
