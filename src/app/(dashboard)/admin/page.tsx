import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getCurrentSession } from "@/lib/session"
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard"

export default async function AdminDashboardPage() {
  const session = await getCurrentSession()
  if (session?.user.role !== "ADMIN") {
    redirect("/")
  }

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [bookingsThisMonth, activeClients, confirmedCount, totalBookings, users, bookings, services] = await Promise.all([
    prisma.booking.count({ where: { date: { gte: startOfMonth } } }),
    prisma.user.count(),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.count(),
    prisma.user.findMany({
      include: {
        profile: true,
        _count: { select: { bookings: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.findMany({
      include: {
        user: true,
        service: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.findMany({
      orderBy: { name: "asc" },
    }),
  ])

  const confirmationRate = totalBookings === 0 ? 0 : Math.round((confirmedCount / totalBookings) * 100)

  // Convert Decimal prices to number for compatibility
  const servicesWithNumberPrice = services.map((service) => ({
    ...service,
    price: Number(service.price),
  }))

  const bookingsWithSerializedData = bookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }))

  return (
    <AdminDashboard
      bookingsThisMonth={bookingsThisMonth}
      activeClients={activeClients}
      confirmationRate={confirmationRate}
      users={users}
      bookings={bookingsWithSerializedData}
      services={servicesWithNumberPrice}
    />
  )
}
