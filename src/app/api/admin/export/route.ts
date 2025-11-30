import { NextRequest, NextResponse } from "next/server"
import { getCurrentSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"

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
        const users = await prisma.user.findMany({
          include: {
            profile: true,
            _count: { select: { bookings: true } },
          },
          orderBy: { createdAt: "desc" },
        })
        data = users.map((user) => ({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
          marketingOptOut: "marketingOptOut" in user ? (user as { marketingOptOut?: boolean }).marketingOptOut : false,
          termsAccepted: "termsAccepted" in user ? (user as { termsAccepted?: boolean }).termsAccepted : false,
          bookingsCount: user._count.bookings,
          preferences: user.profile?.preferences || "",
          lifestyleNotes: user.profile?.lifestyleNotes || "",
          vipStatus: user.profile?.vipStatus || "",
          favoriteServices: user.profile?.favoriteServices || [],
          tags: user.profile?.tags || [],
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }))
        break
      }
      case "bookings": {
        const bookings = await prisma.booking.findMany({
          include: {
            user: true,
            service: true,
          },
          orderBy: { createdAt: "desc" },
        })
        data = bookings.map((booking) => ({
          id: booking.id,
          userEmail: booking.user.email,
          userName: `${booking.user.firstName || ""} ${booking.user.lastName || ""}`.trim(),
          serviceName: booking.service.name,
          servicePrice: booking.service.price.toString(),
          date: booking.date.toISOString(),
          status: booking.status,
          notes: booking.notes || "",
          adminNotes: booking.adminNotes || "",
          createdAt: booking.createdAt.toISOString(),
          updatedAt: booking.updatedAt.toISOString(),
        }))
        break
      }
      case "services": {
        const services = await prisma.service.findMany({
          include: {
            _count: { select: { bookings: true } },
          },
          orderBy: { name: "asc" },
        })
        data = services.map((service) => ({
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price.toString(),
          category: service.category,
          imageUrl: service.imageUrl || "",
          bookingsCount: service._count.bookings,
          createdAt: service.createdAt.toISOString(),
          updatedAt: service.updatedAt.toISOString(),
        }))
        break
      }
      case "all": {
        const [users, bookings, services] = await Promise.all([
          prisma.user.findMany({
            include: {
              profile: true,
              _count: { select: { bookings: true } },
            },
          }),
          prisma.booking.findMany({
            include: {
              user: true,
              service: true,
            },
          }),
          prisma.service.findMany({
            include: {
              _count: { select: { bookings: true } },
            },
          }),
        ])
        data = {
          users: users.map((user) => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
            bookingsCount: user._count.bookings,
            createdAt: user.createdAt.toISOString(),
          })),
          bookings: bookings.map((booking) => ({
            id: booking.id,
            userEmail: booking.user.email,
            serviceName: booking.service.name,
            date: booking.date.toISOString(),
            status: booking.status,
            createdAt: booking.createdAt.toISOString(),
          })),
          services: services.map((service) => ({
            id: service.id,
            name: service.name,
            price: service.price.toString(),
            category: service.category,
            bookingsCount: service._count.bookings,
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

