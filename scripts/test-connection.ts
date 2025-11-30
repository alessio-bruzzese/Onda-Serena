#!/usr/bin/env tsx

/**
 * Script de test de connexion à Supabase
 * Usage: npm run test:connection
 */

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log("🔌 Test de connexion à Supabase...")
    
    // Test simple de connexion
    await prisma.$connect()
    console.log("✅ Connexion réussie !")
    
    // Test de requête simple
    const userCount = await prisma.user.count()
    console.log(`📊 Nombre d'utilisateurs dans la base : ${userCount}`)
    
    const serviceCount = await prisma.service.count()
    console.log(`📊 Nombre de services dans la base : ${serviceCount}`)
    
    console.log("\n✅ La base de données est prête !")
    console.log("\n📝 Prochaines étapes :")
    console.log("   1. Exécutez : npm run prisma:migrate")
    console.log("   2. Exécutez : npm run db:seed")
    console.log("   3. Démarrez : npm run dev")
    
  } catch (error) {
    console.error("\n❌ Erreur de connexion :")
    console.error(error)
    console.log("\n💡 Vérifiez :")
    console.log("   1. Que votre DATABASE_URL est correcte dans .env")
    console.log("   2. Que votre projet Supabase est actif")
    console.log("   3. Que votre mot de passe est correct")
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

