import bcrypt from "bcryptjs"

async function main() {
  const adminEmail = "admin@ondaserena.com"
  const adminPassword = "OndaSerena2025!"
  
  // Générer le hash du mot de passe
  const passwordHash = await bcrypt.hash(adminPassword, 12)
  
  // Générer des IDs uniques (format cuid approximatif)
  const userId = `clx${Date.now()}${Math.random().toString(36).substring(2, 11)}`
  const profileId = `clx${Date.now()}${Math.random().toString(36).substring(2, 11)}`
  
  console.info("=".repeat(70))
  console.info("📝 INSTRUCTIONS SQL POUR CRÉER LE COMPTE ADMIN")
  console.info("=".repeat(70))
  console.info("\n🔑 Identifiants:")
  console.info(`   Email: ${adminEmail}`)
  console.info(`   Mot de passe: ${adminPassword}`)
  console.info("\n📋 Exécutez ces commandes SQL dans votre base de données:\n")
  
  console.info("-- 1. Créer l'utilisateur admin")
  console.info(`INSERT INTO users (id, email, "passwordHash", "firstName", "lastName", role, "createdAt", "updatedAt")`)
  console.info(`VALUES (`)
  console.info(`  '${userId}',`)
  console.info(`  '${adminEmail}',`)
  console.info(`  '${passwordHash}',`)
  console.info(`  'ONDA',`)
  console.info(`  'SERENA Admin',`)
  console.info(`  'ADMIN',`)
  console.info(`  NOW(),`)
  console.info(`  NOW()`)
  console.info(`);\n`)
  
  console.info("-- 2. Créer le profil admin")
  console.info(`INSERT INTO client_profiles (id, "userId", preferences, "lifestyleNotes", "favoriteServices", tags, "createdAt", "updatedAt")`)
  console.info(`VALUES (`)
  console.info(`  '${profileId}',`)
  console.info(`  '${userId}',`)
  console.info(`  'Gestion des réservations et clients ONDA SERENA',`)
  console.info(`  'Basé sur la Côte Bleue, disponible 24/7.',`)
  console.info(`  ARRAY['Gestion locative', 'Conciergerie'],`)
  console.info(`  ARRAY['ADMIN', 'COTE_BLEUE'],`)
  console.info(`  NOW(),`)
  console.info(`  NOW()`)
  console.info(`);\n`)
  
  console.info("=".repeat(70))
  console.info("✅ Après avoir exécuté ces commandes SQL:")
  console.info("   1. Connectez-vous sur: http://localhost:3000/sign-in")
  console.info("   2. Utilisez les identifiants ci-dessus")
  console.info("   3. Accédez au dashboard: http://localhost:3000/admin")
  console.info("=".repeat(70))
}

main().catch(console.error)

