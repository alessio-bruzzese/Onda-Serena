import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminEmail = "admin@ondaserena.com"
  const adminPassword = "OndaSerena2025!"

  const passwordHash = await bcrypt.hash(adminPassword, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      firstName: "ONDA",
      lastName: "SERENA Admin",
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      passwordHash,
      firstName: "ONDA",
      lastName: "SERENA Admin",
      role: "ADMIN",
      profile: {
        create: {
          preferences: "Gestion des réservations et clients ONDA SERENA",
          lifestyleNotes: "Basé sur la Côte Bleue, disponible 24/7.",
          favoriteServices: ["Gestion locative", "Conciergerie"],
          tags: ["ADMIN", "COTE_BLEUE"],
        },
      },
    },
  })

  console.info("=".repeat(60))
  console.info("✅ COMPTE ADMIN CRÉÉ AVEC SUCCÈS")
  console.info("=".repeat(60))
  console.info(`📧 Email: ${adminEmail}`)
  console.info(`🔑 Mot de passe: ${adminPassword}`)
  console.info(`🌐 URL de connexion: http://localhost:3000/sign-in`)
  console.info(`📊 URL du dashboard admin: http://localhost:3000/admin`)
  console.info("=".repeat(60))
  console.info("\n⚠️  IMPORTANT: Changez le mot de passe après la première connexion !")
}

main()
  .catch((error) => {
    console.error("❌ Erreur lors de la création du compte admin:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

