// @ts-expect-error: Prisma client not generated
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const defaultServices = [
  {
    name: "Gestion basique",
    description: "Check-in/out, ménage professionnel, linge soigné, maintenance.",
    price: 18.0,
    priceType: "PERCENTAGE",
    category: "Gestion locative",
  },
  {
    name: "Gestion standard",
    description: "Formule basique + optimisation tarifaire, gestion des réservations, reporting.",
    price: 20.0,
    priceType: "PERCENTAGE",
    category: "Gestion locative",
  },
  {
    name: "Gestion premium/luxe",
    description: "Formule standard + service décoration, aménagement du bien, conciergerie voyageurs.",
    price: 25.0,
    priceType: "PERCENTAGE",
    category: "Gestion locative",
  },
  {
    name: "Forfait décoration",
    description: "Transformation de votre bien pour augmenter sa valeur locative.",
    price: 0.0,
    priceType: "QUOTE",
    category: "Services additionnels",
  },
  {
    name: "Aménagement du bien",
    description: "Accompagnement complet pour maximiser le potentiel locatif.",
    price: 0.0,
    priceType: "QUOTE",
    category: "Services additionnels",
  },
]

async function main() {
  for (const service of defaultServices) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: {},
      create: {
        ...service,
        price: service.price,
        priceType: service.priceType as "FIXED" | "PERCENTAGE" | "QUOTE",
      },
    })
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@ondaserena.com"
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "OndaSerena2025!"

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

  console.info("✅ Services et compte admin initialisés.")
  console.info("=".repeat(60))
  console.info("🔐 IDENTIFIANTS ADMIN ONDA SERENA")
  console.info("=".repeat(60))
  console.info(`📧 Email: ${adminEmail}`)
  console.info(`🔑 Mot de passe: ${adminPassword}`)
  console.info(`🌐 URL: http://localhost:3000/admin`)
  console.info("=".repeat(60))
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })






