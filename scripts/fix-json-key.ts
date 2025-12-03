import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');

    // Extract the value inside the single quotes for FIREBASE_SERVICE_ACCOUNT_KEY
    const match = envContent.match(/FIREBASE_SERVICE_ACCOUNT_KEY='([\s\S]*?)'/);

    if (match) {
        const rawJson = match[1];

        // Fix the private_key: replace actual newlines with \n
        // We look for the content between "private_key":" and the next "
        const fixedJson = rawJson.replace(/("private_key":\s*")([\s\S]*?)(")/, (m, prefix, keyContent, suffix) => {
            // Replace newlines with \n
            const cleanKey = keyContent.replace(/\n/g, '\\n');
            return `${prefix}${cleanKey}${suffix}`;
        });

        // Remove any remaining newlines (formatting) to make it a single line
        const oneLine = fixedJson.replace(/\n/g, '');

        console.log("✅ Voici votre clé corrigée (copiez TOUT le bloc ci-dessous) :");
        console.log("");
        console.log(oneLine);
        console.log("");
    } else {
        console.error("❌ Could not find FIREBASE_SERVICE_ACCOUNT_KEY in .env");
    }
} catch (error) {
    console.error("❌ Error reading .env:", error);
}
