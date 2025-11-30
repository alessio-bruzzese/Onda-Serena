"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateBooking, deleteBooking, updateBookingStatus } from "@/app/(dashboard)/admin/actions"
import { Download, Edit2, Trash2, X, Check } from "lucide-react"

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

type Props = {
  initialBookings: BookingWithRelations[]
}

export function BookingsManagement({ initialBookings }: Props) {
  const [bookings, setBookings] = useState(initialBookings)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleEdit = (booking: BookingWithRelations) => {
    setEditingId(booking.id)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleSave = async (bookingId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await updateBooking(formData)
      if (result.success) {
        window.location.reload()
      } else {
        alert(result.error)
      }
    })
  }

  const handleStatusChange = async (bookingId: string, status: string) => {
    startTransition(async () => {
      const result = await updateBookingStatus({ bookingId, status })
      if (result.success) {
        setBookings(
          bookings.map((b) => (b.id === bookingId ? { ...b, status: status as "PENDING" | "CONFIRMED" | "CANCELLED" } : b)),
        )
      } else {
        alert(result.error)
      }
    })
  }

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      return
    }
    startTransition(async () => {
      const result = await deleteBooking({ bookingId })
      if (result.success) {
        setBookings(bookings.filter((b) => b.id !== bookingId))
      } else {
        alert(result.error)
      }
    })
  }

  const handleExport = (format: "json" | "csv") => {
    const url = `/api/admin/export?entity=bookings&type=${format}`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading-alt text-2xl font-light text-[#1a1a1a]">Gestion des réservations</h2>
          <p className="font-body text-[#1a1a1a]/70">Modifier et supprimer les réservations</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
            onClick={() => handleExport("json")}
          >
            <Download className="size-4" />
            Export JSON
          </Button>
          <Button
            variant="outline"
            className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
            onClick={() => handleExport("csv")}
          >
            <Download className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="rounded-3xl border border-[#A8A8A8]/20 bg-white/80 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading-alt text-[#1a1a1a]">Liste des réservations ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#A8A8A8]/20 text-[#1a1a1a]/60">
                  <TableHead className="font-body">Client</TableHead>
                  <TableHead className="font-body">Service</TableHead>
                  <TableHead className="font-body">Date</TableHead>
                  <TableHead className="font-body">Statut</TableHead>
                  <TableHead className="font-body">Notes</TableHead>
                  <TableHead className="font-body">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="border-b border-[#A8A8A8]/10 text-[#1a1a1a]/80">
                    {editingId === booking.id ? (
                      <>
                        <TableCell colSpan={6}>
                          <form
                            action={(formData) => handleSave(booking.id, formData)}
                            className="flex flex-wrap items-center gap-4"
                          >
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <Input
                              name="date"
                              type="datetime-local"
                              defaultValue={new Date(booking.date).toISOString().slice(0, 16)}
                              className="w-48 bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                            />
                            <select
                              name="status"
                              defaultValue={booking.status}
                              className="h-9 rounded-md border border-[#A8A8A8]/20 bg-white px-3 text-sm text-[#1a1a1a] font-body"
                            >
                              <option value="PENDING">En attente</option>
                              <option value="CONFIRMED">Confirmée</option>
                              <option value="CANCELLED">Annulée</option>
                            </select>
                            <Input
                              name="notes"
                              defaultValue={booking.notes || ""}
                              placeholder="Notes client"
                              className="w-48 bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                            />
                            <Input
                              name="adminNotes"
                              defaultValue={booking.adminNotes || ""}
                              placeholder="Notes admin"
                              className="w-48 bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                            />
                            <div className="flex gap-2">
                              <Button
                                type="submit"
                                size="sm"
                                variant="outline"
                                className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                                disabled={isPending}
                              >
                                <Check className="size-4" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                                onClick={handleCancel}
                              >
                                <X className="size-4" />
                              </Button>
                            </div>
                          </form>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <div>
                            <div className="font-medium font-body text-[#1a1a1a]">
                              {booking.user.firstName} {booking.user.lastName}
                            </div>
                            <div className="font-body text-xs text-[#1a1a1a]/60">{booking.user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-body text-[#1a1a1a]">{booking.service.name}</TableCell>
                        <TableCell className="font-body text-[#1a1a1a]">{new Date(booking.date).toLocaleString("fr-FR")}</TableCell>
                        <TableCell>
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            className="rounded-md border border-[#A8A8A8]/20 bg-white px-2 py-1 text-xs text-[#1a1a1a] font-body"
                            disabled={isPending}
                          >
                            <option value="PENDING">En attente</option>
                            <option value="CONFIRMED">Confirmée</option>
                            <option value="CANCELLED">Annulée</option>
                          </select>
                        </TableCell>
                        <TableCell className="max-w-xs truncate font-body text-xs text-[#1a1a1a]/60">
                          {booking.notes || booking.adminNotes || "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                              onClick={() => handleEdit(booking)}
                            >
                              <Edit2 className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50 font-body"
                              onClick={() => handleDelete(booking.id)}
                              disabled={isPending}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

