"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersManagement } from "./users-management"
import { BookingsManagement } from "./bookings-management"
import { ServicesManagement } from "./services-management"
import { Download } from "lucide-react"


type UserWithCount = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  phone: string | null
  role: "ADMIN" | "CLIENT"
  profile: {
    tags: string[]
  } | null
  _count: {
    bookings: number
  }
}

type BookingWithRelations = {
  id: string
  date: Date
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
  notes: string | null
  adminNotes: string | null
  user: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
  }
  service: {
    id: string
    name: string
  }
}


type ServiceType = {
  id: string
  name: string
  description: string
  price: number | string
  category: string
  imageUrl: string | null
}

type Props = {
  bookingsThisMonth: number
  activeClients: number
  confirmationRate: number
  users: UserWithCount[]
  bookings: BookingWithRelations[]
  services: ServiceType[]
}

export function AdminDashboard({
  bookingsThisMonth,
  activeClients,
  confirmationRate,
  users,
  bookings,
  services,
}: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "bookings" | "services">("overview")

  const handleExport = async (entity: string, format: "json" | "csv") => {
    const url = `/api/admin/export?entity=${entity}&type=${format}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-12 md:px-12 text-[#1a1a1a]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading-alt text-xs uppercase tracking-[0.4em] text-[#A8A8A8]">Back-office CRM</p>
            <h1 className="font-heading text-4xl text-[#1a1a1a] mt-2">Votre Espace Administrateur</h1>
            <p className="font-body text-[#1a1a1a]/70 mt-2">Pilotage complet des KPI, clients et réservations.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
              onClick={() => handleExport("all", "json")}
            >
              <Download className="size-4" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
              onClick={() => handleExport("all", "csv")}
            >
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex gap-6 border-b border-[#A8A8A8]/20 pb-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-2 py-3 text-sm font-medium transition-all font-body tracking-wide ${activeTab === "overview"
              ? "border-b-2 border-[#E9B676] text-[#E9B676]"
              : "text-[#1a1a1a]/60 hover:text-[#A6CFE3]"
              }`}
          >
            Vue d&apos;ensemble
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-2 py-3 text-sm font-medium transition-all font-body tracking-wide ${activeTab === "users"
              ? "border-b-2 border-[#E9B676] text-[#E9B676]"
              : "text-[#1a1a1a]/60 hover:text-[#A6CFE3]"
              }`}
          >
            Utilisateurs
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-2 py-3 text-sm font-medium transition-all font-body tracking-wide ${activeTab === "bookings"
              ? "border-b-2 border-[#E9B676] text-[#E9B676]"
              : "text-[#1a1a1a]/60 hover:text-[#A6CFE3]"
              }`}
          >
            Réservations
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-2 py-3 text-sm font-medium transition-all font-body tracking-wide ${activeTab === "services"
              ? "border-b-2 border-[#E9B676] text-[#E9B676]"
              : "text-[#1a1a1a]/60 hover:text-[#A6CFE3]"
              }`}
          >
            Services
          </button>
        </div>

        {activeTab === "overview" && (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { label: "Réservations ce mois", value: bookingsThisMonth, detail: "Période en cours", color: "from-[#A6CFE3]/20 to-[#A6CFE3]/5" },
                { label: "Clients enregistrés", value: activeClients, detail: "Tous rôles confondus", color: "from-[#E9B676]/20 to-[#E9B676]/5" },
                { label: "Taux de confirmation", value: `${confirmationRate}%`, detail: "Mises à jour live", color: "from-[#F5E9D4]/40 to-[#F5E9D4]/10" },
              ].map((card) => (
                <div key={card.label} className={`rounded-3xl border border-[#A8A8A8]/20 bg-gradient-to-br ${card.color} p-6 text-[#1a1a1a] shadow-sm`}>
                  <p className="font-body text-sm uppercase tracking-[0.3em] text-[#A8A8A8]">{card.label}</p>
                  <p className="text-4xl font-light text-[#1a1a1a] mt-2">{card.value}</p>
                  <p className="font-body text-xs text-[#1a1a1a]/60 mt-1">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="rounded-3xl border border-[#A8A8A8]/20 bg-white/80 backdrop-blur shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm uppercase tracking-[0.3em] text-[#A8A8A8]">Base clients</p>
                      <CardTitle className="font-heading-alt text-2xl font-light text-[#1a1a1a]">Vue CRM</CardTitle>
                    </div>
                    <Badge className="bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body">{users.length} comptes</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="space-y-2">
                      {users.slice(0, 5).map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between rounded-2xl border border-[#A8A8A8]/20 bg-[#F5E9D4]/30 p-3 text-sm"
                        >
                          <div>
                            <div className="font-medium text-[#1a1a1a] font-body">{user.email}</div>
                            <p className="font-body text-xs text-[#1a1a1a]/60">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                          <Badge className={user.role === "ADMIN" ? "bg-[#E9B676]/20 text-[#1a1a1a] border border-[#E9B676]/40 font-body" : "bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body"}>
                            {user.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-[#A8A8A8]/20 bg-white/80 backdrop-blur shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm uppercase tracking-[0.3em] text-[#A8A8A8]">Gestion</p>
                      <CardTitle className="font-heading-alt text-2xl font-light text-[#1a1a1a]">Réservations récentes</CardTitle>
                    </div>
                    <Badge className="bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body">{bookings.length} suivies</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 space-y-4 overflow-y-auto">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="rounded-2xl border border-[#A8A8A8]/20 bg-gradient-to-br from-[#F5E9D4]/30 to-white p-4 text-[#1a1a1a]">
                        <div className="text-sm">
                          <p className="font-semibold font-body">
                            {booking.user.firstName} {booking.user.lastName} — {booking.service.name}
                          </p>
                          <p className="font-body text-[#1a1a1a]/60">{new Date(booking.date).toLocaleString("fr-FR")}</p>
                          <Badge className={`mt-2 font-body ${booking.status === "CONFIRMED"
                            ? "bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40"
                            : booking.status === "PENDING"
                              ? "bg-[#E9B676]/20 text-[#1a1a1a] border border-[#E9B676]/40"
                              : "bg-[#A8A8A8]/20 text-[#1a1a1a] border border-[#A8A8A8]/40"
                            }`}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "users" && <UsersManagement initialUsers={users} />}
        {activeTab === "bookings" && <BookingsManagement initialBookings={bookings} />}
        {activeTab === "services" && <ServicesManagement initialServices={services} />}
      </div>
    </div>
  )
}
