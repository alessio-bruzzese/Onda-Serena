#!/usr/bin/env tsx

/**
 * Script de diagnostic de connexion Supabase
 * Teste différentes configurations pour identifier le problème
 */

import { PrismaClient } from "@prisma/client"
import * as dotenv from "dotenv"
import { readFileSync } from "fs"
import { join } from "path"

// Vérifier que le fichier .env existe
const envPath = join(process.cwd(), ".env")
try {
  readFileSync(envPath, "utf-8")
} catch {
  console.error("❌ Fichier .env non trouvé")
  process.exit(1)
}

dotenv.config()

const prisma = new PrismaClient()

async function testConnection(url: string, description: string) {
  console.log(`\n🔍 Test : ${description}`)
  console.log(`   URL : ${url.replace(/:[^:@]+@/, ":****@")}`) // Masquer le mot de passe
  
  const testPrisma = new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  })

  try {
    await testPrisma.$connect()
    const count = await testPrisma.user.count()
    console.log(`   ✅ Connexion réussie ! (${count} utilisateurs)`)
    await testPrisma.$disconnect()
    return true
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.log(`   ❌ Échec : ${errorMessage.split("\n")[0]}`)
    await testPrisma.$disconnect()
    return false
  }
}

async function diagnose() {
  console.log("🔧 Diagnostic de connexion Supabase\n")
  console.log("=" .repeat(60))

  const originalUrl = process.env.DATABASE_URL
  if (!originalUrl) {
    console.error("❌ DATABASE_URL non définie dans .env")
    process.exit(1)
  }

  console.log(`\n📋 Configuration actuelle :`)
  console.log(`   Project ID : ${originalUrl.match(/@db\.([^.]+)\.supabase\.co/)?.[1] || "non trouvé"}`)
  console.log(`   Utilise pgbouncer : ${originalUrl.includes("pgbouncer=true") ? "Oui" : "Non"}`)

  // Test 1 : URL originale
  const test1 = await testConnection(originalUrl, "URL originale (.env)")

  // Test 2 : Sans pgbouncer (connexion directe)
  if (originalUrl.includes("pgbouncer=true")) {
    const directUrl = originalUrl.replace(/\?pgbouncer=true.*$/, "")
    await testConnection(directUrl, "Connexion directe (sans pooler)")
  }

  // Test 3 : Avec sslmode=require
  if (!originalUrl.includes("sslmode")) {
    const sslUrl = originalUrl.includes("?") 
      ? `${originalUrl}&sslmode=require`
      : `${originalUrl}?sslmode=require`
    await testConnection(sslUrl, "Avec sslmode=require")
  }

  // Test 4 : Encoder le mot de passe si nécessaire
  const passwordMatch = originalUrl.match(/postgres:([^@]+)@/)
  if (passwordMatch) {
    const password = passwordMatch[1]
    const encodedPassword = encodeURIComponent(password)
    if (password !== encodedPassword) {
      const encodedUrl = originalUrl.replace(
        /postgres:[^@]+@/,
        `postgres:${encodedPassword}@`
      )
      await testConnection(encodedUrl, "Mot de passe encodé (URL)")
    }
  }

  console.log("\n" + "=".repeat(60))
  console.log("\n💡 Recommandations :")
  
  if (!test1) {
    console.log("\n1. ⚠️  Vérifiez que votre projet Supabase est ACTIF :")
    console.log("   → Allez sur https://supabase.com")
    console.log("   → Vérifiez que le projet n'est pas en pause")
    console.log("   → Si en pause, cliquez sur 'Restore' ou 'Resume'")
    
    console.log("\n2. 🔑 Vérifiez votre mot de passe :")
    console.log("   → Allez dans Settings → Database")
    console.log("   → Vérifiez ou réinitialisez le mot de passe")
    
    console.log("\n3. 🔄 Essayez la connexion directe :")
    console.log("   → Dans Supabase : Settings → Database")
    console.log("   → Copiez la 'Direct connection' string")
    console.log("   → Remplacez DATABASE_URL dans .env")
    
    console.log("\n4. 📝 Si le mot de passe contient des caractères spéciaux :")
    console.log("   → Encodez-le avec : node -e \"console.log(encodeURIComponent('VOTRE_MOT_DE_PASSE'))\"")
  } else {
    console.log("\n✅ La connexion fonctionne !")
    console.log("   → Vous pouvez maintenant exécuter : npm run prisma:migrate")
    console.log("   → Puis : npm run db:seed")
  }

  console.log("\n📖 Pour plus d'aide, consultez TROUBLESHOOTING.md")
}

diagnose()
  .catch((error) => {
    console.error("\n❌ Erreur lors du diagnostic :", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

