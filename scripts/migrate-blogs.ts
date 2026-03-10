import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
console.log("Loading dotenv...");
dotenv.config();

console.log("Importing blogPosts...");
import { blogPosts } from "../src/data/blog-posts";


const serviceAccount = (() => {
    const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!key) return undefined;

    try {
        return JSON.parse(key);
    } catch {
        try {
            return JSON.parse(key.replace(/\n/g, "\\n"));
        } catch (error) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error);
            return undefined;
        }
    }
})();

if (!serviceAccount) {
    console.error("FIREBASE_SERVICE_ACCOUNT_KEY is missing. Migration failed.");
    process.exit(1);
}

const app = !getApps().length
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApps()[0];

const db = getFirestore(app);

async function migrate() {
    console.log("Starting migration of blog posts...");
    let addedCount = 0;

    for (const post of blogPosts) {
        // Check if it already exists
        const existing = await db.collection("blog_posts").where("slug", "==", post.slug).get();
        if (existing.empty) {
            await db.collection("blog_posts").add({
                ...post,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            console.log(`Added: ${post.title}`);
            addedCount++;
        } else {
            console.log(`Skipped (already exists): ${post.title}`);
        }
    }

    console.log(`Migration complete. Added ${addedCount} posts.`);
    process.exit(0);
}

migrate().catch((error) => {
    console.error("Migration error:", error);
    process.exit(1);
});
