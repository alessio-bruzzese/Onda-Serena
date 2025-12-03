import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceAccount = require("../../service-account.json");

const app = !getApps().length
    ? initializeApp({
        credential: cert(serviceAccount),
    })
    : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
