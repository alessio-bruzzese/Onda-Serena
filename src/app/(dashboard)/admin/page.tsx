import { redirect } from "next/navigation"
import { getCurrentSession } from "@/lib/session"
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard"
import type { Booking, UserProfile, Service } from "@/types/firestore"

import { serializeFirestoreData } from "@/lib/utils"

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

  const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) })) as Booking[];
  const users = usersSnapshot.docs.map(doc => {
    const userData = serializeFirestoreData(doc.data());
    const userBookingsCount = bookings.filter(b => b.userId === doc.id).length;
    return {
      id: doc.id,
      ...userData,
      _count: { bookings: userBookingsCount }
    };
  }) as UserProfile[];
  const services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...serializeFirestoreData(doc.data()) })) as Service[];

  // Calculate stats
  const bookingsThisMonth = bookings.filter((b) => b.date >= startOfMonth).length;
  const activeClients = users.length; // Simplified
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const totalBookings = bookings.length;

  // Manual joins for bookings
  const bookingsWithRelations = bookings.map((booking) => {
    const user = users.find((u) => u.id === booking.userId);
    const service = services.find((s) => s.id === booking.serviceId);
    return {
      ...booking,
      notes: booking.notes || null,
      adminNotes: booking.adminNotes || null,
      user: user || {
        id: "unknown",
        email: "Unknown",
        firstName: "Unknown",
        lastName: "",
        role: "CLIENT",
        createdAt: new Date(),
        phone: null,
        profile: null,
        _count: { bookings: 0 }
      },
      service: service || {
        id: "unknown",
        name: "Unknown",
        description: "",
        price: 0,
        priceType: "FIXED",
        category: "Unknown",
        imageUrl: null
      },
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
