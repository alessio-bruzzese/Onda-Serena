import { redirect } from "next/navigation"
import { getCurrentSession } from "@/lib/session"
import { BookingForm } from "@/components/dashboard/client/booking-form"
import { BookingHistory } from "@/components/dashboard/client/booking-history"
import type { Booking, Service, UserProfile } from "@/types/firestore"
import { serializeFirestoreData } from "@/lib/utils"


export default async function ClientDashboardPage() {
  const session = await getCurrentSession()
  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  const { db } = await import("@/lib/firebase-admin");

  const [userDoc, bookingsSnapshot, servicesSnapshot] = await Promise.all([
    db.collection("users").doc(session.user.id).get(),
    db.collection("bookings").where("userId", "==", session.user.id).get(), // Sorting in JS to avoid index issues for now
    db.collection("services").orderBy("name", "asc").get(),
  ])

  const user = userDoc.exists ? { id: userDoc.id, ...serializeFirestoreData(userDoc.data()) } : null;

  const bookings = bookingsSnapshot.docs.map(doc => {
    const data = serializeFirestoreData(doc.data());
    return {
      id: doc.id,
      ...data,
      date: new Date(data.date), // Ensure date is a Date object
    }
  }).sort((a, b) => b.date.getTime() - a.date.getTime()) as Booking[]; // Sort desc

  const services = servicesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeFirestoreData(doc.data()),
  })) as Service[];

  // Attach bookings to user object to match previous structure if needed, 
  // or just pass bookings directly if I change the component usage.
  // The component expects `user.bookings`.
  if (user) {
    (user as UserProfile).bookings = bookings.map((booking: Booking) => {
      // We need to attach the service details to the booking
      const service = services.find((s) => s.id === booking.serviceId);
      return {
        ...booking,
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
  }

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
      <div className="space-y-3 text-[#1a1a1a]">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A8A8A8] font-body">Espace membre</p>
        <h1 className="text-4xl font-light font-heading-alt">Bonjour {user.firstName ?? user.email}</h1>
        <p className="text-[#1a1a1a]/70 font-body">
          Accédez à votre conciergerie privée, suivez vos demandes et mettez à jour vos préférences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BookingHistory
          bookings={user.bookings.map((booking: Booking) => ({
            id: booking.id,
            status: booking.status,
            date: booking.date.toISOString(),
            notes: booking.notes,
            service: {
              name: booking.service?.name ?? "Unknown",
              category: booking.service?.category ?? "Unknown",
            },
          }))}
        />
        <BookingForm
          services={services
            .sort((a, b) => {
              // 1. Formulas (PERCENTAGE) first
              if (a.priceType === "PERCENTAGE" && b.priceType !== "PERCENTAGE") return -1
              if (a.priceType !== "PERCENTAGE" && b.priceType === "PERCENTAGE") return 1

              // 2. Sort by price ascending
              return Number(a.price) - Number(b.price)
            })
            .map((service) => ({
              id: service.id,
              name: service.name,
              category: service.category,
              price: Number(service.price),
              priceType: service.priceType,
            }))}
        />
      </div>
    </div>
  )
}
