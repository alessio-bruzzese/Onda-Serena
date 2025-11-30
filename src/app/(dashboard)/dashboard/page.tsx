import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getCurrentSession } from "@/lib/session"
import { BookingForm } from "@/components/dashboard/client/booking-form"
import { BookingHistory } from "@/components/dashboard/client/booking-history"


export default async function ClientDashboardPage() {
  const session = await getCurrentSession()
  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  const [user, services] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
        bookings: {
          include: { service: true },
          orderBy: { date: "desc" },
        },
      },
    }),
    prisma.service.findMany({
      orderBy: { name: "asc" },
    }),
  ])

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
          bookings={user.bookings.map((booking) => ({
            id: booking.id,
            status: booking.status,
            date: booking.date.toISOString(),
            notes: booking.notes,
            service: {
              name: booking.service.name,
              category: booking.service.category,
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
