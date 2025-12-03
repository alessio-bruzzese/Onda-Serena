import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length && firebaseConfig.apiKey
    ? initializeApp(firebaseConfig)
    : getApps().length
        ? getApp()
        : initializeApp(firebaseConfig); // This might still fail if config is empty, but let's try to be safer

// If we are in a build environment where env vars might be missing (though they shouldn't be for NEXT_PUBLIC_),
// we might need to mock or handle it. But usually NEXT_PUBLIC_ vars are available at build time.
// The error "auth/invalid-api-key" comes from getAuth() or initializeApp() when apiKey is missing/invalid.

if (!firebaseConfig.apiKey) {
    console.warn("Firebase API Key is missing. Check your .env file.");
}
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
