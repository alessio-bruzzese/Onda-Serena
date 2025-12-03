import { redirect } from "next/navigation"
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

  const { db } = await import("@/lib/firebase-admin");

  const [bookingsSnapshot, usersSnapshot, servicesSnapshot] = await Promise.all([
    db.collection("bookings").orderBy("date", "desc").get(),
    db.collection("users").orderBy("createdAt", "desc").get(),
    db.collection("services").orderBy("name", "asc").get(),
  ])

  const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), date: new Date(doc.data().date) }));
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Calculate stats
  const bookingsThisMonth = bookings.filter((b: any) => b.date >= startOfMonth).length;
  const activeClients = users.length; // Simplified
  const confirmedCount = bookings.filter((b: any) => b.status === "CONFIRMED").length;
  const totalBookings = bookings.length;

  // Manual joins for bookings
  const bookingsWithRelations = bookings.map((booking: any) => {
    const user = users.find((u: any) => u.id === booking.userId);
    const service = services.find((s: any) => s.id === booking.serviceId);
    return {
      ...booking,
      user: user || { email: "Unknown", firstName: "Unknown", lastName: "" },
      service: service || { name: "Unknown", price: 0 },
    };
  });

  const confirmationRate = totalBookings === 0 ? 0 : Math.round((confirmedCount / totalBookings) * 100)

  // Convert Decimal prices to number for compatibility
  const servicesWithNumberPrice = services.map((service) => ({
    ...service,
    price: Number(service.price),
  }))

  // const bookingsWithSerializedData = ...

  return (
    <AdminDashboard
      bookingsThisMonth={bookingsThisMonth}
      activeClients={activeClients}
      confirmationRate={confirmationRate}
      users={users}
      bookings={bookingsWithRelations}
      services={servicesWithNumberPrice}
    />
  )
}
