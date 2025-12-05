import { NextRequest, NextResponse } from "next/server"
import { getCurrentSession } from "@/lib/session"
import type { Booking, Service, UserProfile } from "@/types/firestore"

export async function GET(request: NextRequest) {
  const session = await getCurrentSession()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "json"
  const entity = searchParams.get("entity") || "all"

  try {
    let data: unknown

    switch (entity) {
      case "users": {
        const { db } = await import("@/lib/firebase-admin");
        const usersSnapshot = await db.collection("users").orderBy("createdAt", "desc").get();
        const bookingsSnapshot = await db.collection("bookings").get();

        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserProfile[];
        const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];

        data = users.map((user) => {
          const userBookingsCount = bookings.filter((b) => b.userId === user.id).length;
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
            marketingOptOut: user.marketingOptOut || false,
            termsAccepted: user.termsAccepted || false,
            bookingsCount: userBookingsCount,
            preferences: user.preferences || "",
            lifestyleNotes: user.lifestyleNotes || "",
            vipStatus: user.vipStatus || "",
            favoriteServices: user.favoriteServices || [],
            tags: user.tags || [],
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        })
        break
      }
      case "bookings": {
        const { db } = await import("@/lib/firebase-admin");
        const bookingsSnapshot = await db.collection("bookings").orderBy("createdAt", "desc").get();
        const usersSnapshot = await db.collection("users").get();
        const servicesSnapshot = await db.collection("services").get();

        const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserProfile[];
        const services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];

        data = bookings.map((booking) => {
          const user = users.find((u) => u.id === booking.userId);
          const service = services.find((s) => s.id === booking.serviceId);
          return {
            id: booking.id,
            userEmail: user?.email || "",
            userName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
            serviceName: service?.name || "",
            servicePrice: (service?.price || 0).toString(),
            date: booking.date,
            status: booking.status,
            notes: booking.notes || "",
            adminNotes: booking.adminNotes || "",
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
          };
        })
        break
      }
      case "services": {
        const { db } = await import("@/lib/firebase-admin");
        const servicesSnapshot = await db.collection("services").orderBy("name", "asc").get();
        const bookingsSnapshot = await db.collection("bookings").get();

        const services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
        const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];

        data = services.map((service) => {
          const bookingsCount = bookings.filter((b) => b.serviceId === service.id).length;
          return {
            id: service.id,
            name: service.name,
            description: service.description,
            price: (service.price || 0).toString(),
            category: service.category,
            imageUrl: service.imageUrl || "",
            bookingsCount: bookingsCount,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
          };
        })
        break
      }
      case "all": {
        const { db } = await import("@/lib/firebase-admin");
        const [usersSnapshot, bookingsSnapshot, servicesSnapshot] = await Promise.all([
          db.collection("users").get(),
          db.collection("bookings").get(),
          db.collection("services").get(),
        ]);

        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserProfile[];
        const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
        const services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];

        data = {
          users: users.map((user) => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
            bookingsCount: bookings.filter((b) => b.userId === user.id).length,
            createdAt: user.createdAt,
          })),
          bookings: bookings.map((booking) => {
            const user = users.find((u) => u.id === booking.userId);
            const service = services.find((s) => s.id === booking.serviceId);
            return {
              id: booking.id,
              userEmail: user?.email || "",
              serviceName: service?.name || "",
              date: booking.date,
              status: booking.status,
              createdAt: booking.createdAt,
            };
          }),
          services: services.map((service) => ({
            id: service.id,
            name: service.name,
            price: (service.price || 0).toString(),
            category: service.category,
            bookingsCount: bookings.filter((b) => b.serviceId === service.id).length,
          })),
        }
        break
      }
      default:
        return NextResponse.json({ error: "Type d'entité invalide" }, { status: 400 })
    }

    if (type === "csv") {
      const csv = convertToCSV(data)
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="export-${entity}-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      })
    }

    return NextResponse.json(data, {
      headers: {
        "Content-Disposition": `attachment; filename="export-${entity}-${new Date().toISOString().split("T")[0]}.json"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Erreur lors de l'export" }, { status: 500 })
  }
} 

function convertToCSV(data: unknown): string {
  if (Array.isArray(data)) {
    if (data.length === 0) return ""
    const headers = Object.keys(data[0] as Record<string, unknown>)
    const rows = data.map((item) =>
      headers.map((header) => {
        const value = (item as Record<string, unknown>)[header]
        if (Array.isArray(value)) {
          return `"${value.join(", ")}"`
        }
        if (value === null || value === undefined) {
          return ""
        }
        return `"${String(value).replace(/"/g, '""')}"`
      }),
    )
    return [headers.map((h) => `"${h}"`), ...rows.map((row) => row.join(","))].join("\n")
  }

  if (typeof data === "object" && data !== null) {
    const obj = data as Record<string, unknown>
    const sections: string[] = []
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        sections.push(`\n=== ${key.toUpperCase()} ===\n`)
        sections.push(convertToCSV(value))
      }
    }
    return sections.join("\n")
  }

  return String(data)
}

