import { PrismaClient } from "@prisma/client";
import { db } from "../src/lib/firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function migrate() {
    console.log("Starting migration...");

    // 1. Migrate Users and Profiles
    console.log("Migrating Users...");
    const users = await prisma.user.findMany({
        include: { profile: true },
    });

    for (const user of users) {
        const { profile, ...userData } = user;
        const userRef = db.collection("users").doc(user.id);

        await userRef.set({
            ...userData,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            // Merge profile data if exists
            ...(profile ? {
                preferences: profile.preferences,
                lifestyleNotes: profile.lifestyleNotes,
                vipStatus: profile.vipStatus,
                favoriteServices: profile.favoriteServices,
                tags: profile.tags,
                profileCreatedAt: profile.createdAt.toISOString(),
                profileUpdatedAt: profile.updatedAt.toISOString(),
            } : {}),
        });
        console.log(`Migrated user: ${user.email}`);
    }

    // 2. Migrate Services
    console.log("Migrating Services...");
    const services = await prisma.service.findMany();
    for (const service of services) {
        const serviceRef = db.collection("services").doc(service.id);
        await serviceRef.set({
            ...service,
            price: service.price.toNumber(), // Convert Decimal to number
            createdAt: service.createdAt.toISOString(),
            updatedAt: service.updatedAt.toISOString(),
        });
        console.log(`Migrated service: ${service.name}`);
    }

    // 3. Migrate Bookings
    console.log("Migrating Bookings...");
    const bookings = await prisma.booking.findMany();
    for (const booking of bookings) {
        const bookingRef = db.collection("bookings").doc(booking.id);
        await bookingRef.set({
            ...booking,
            date: booking.date.toISOString(),
            createdAt: booking.createdAt.toISOString(),
            updatedAt: booking.updatedAt.toISOString(),
        });
        console.log(`Migrated booking: ${booking.id}`);
    }

    console.log("Migration complete!");
}

migrate()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
