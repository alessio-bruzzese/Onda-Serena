"use client"

import { useState, useTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateUser, deleteUser } from "@/app/(dashboard)/admin/actions"
import { Download, Edit2, Trash2, X, Check } from "lucide-react"

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

type Props = {
  initialUsers: UserWithCount[]
}

export function UsersManagement({ initialUsers }: Props) {
  const [users, setUsers] = useState(initialUsers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleEdit = (user: UserWithCount) => {
    setEditingId(user.id)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleSave = async (userId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await updateUser(formData)
      if (result.success) {
        // Refresh the page to get updated data
        window.location.reload()
      } else {
        alert(result.error)
      }
    })
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return
    }
    startTransition(async () => {
      const result = await deleteUser({ userId })
      if (result.success) {
        setUsers(users.filter((u) => u.id !== userId))
      } else {
        alert(result.error)
      }
    })
  }

  const handleExport = (format: "json" | "csv") => {
    const url = `/api/admin/export?entity=users&type=${format}`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading-alt text-2xl font-light text-[#1a1a1a]">Gestion des utilisateurs</h2>
          <p className="font-body text-[#1a1a1a]/70">Modifier et supprimer les comptes utilisateurs</p>
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
          <CardTitle className="font-heading-alt text-[#1a1a1a]">Liste des utilisateurs ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#A8A8A8]/20 text-[#1a1a1a]/60">
                  <TableHead className="font-body">Email</TableHead>
                  <TableHead className="font-body">Nom</TableHead>
                  <TableHead className="font-body">Téléphone</TableHead>
                  <TableHead className="font-body">Rôle</TableHead>
                  <TableHead className="font-body">Réservations</TableHead>
                  <TableHead className="font-body">Tags</TableHead>
                  <TableHead className="font-body">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-b border-[#A8A8A8]/10 text-[#1a1a1a]/80">
                    {editingId === user.id ? (
                      <>
                        <TableCell colSpan={7}>
                          <form
                            action={(formData) => handleSave(user.id, formData)}
                            className="flex flex-wrap items-center gap-4"
                          >
                            <input type="hidden" name="userId" value={user.id} />
                            <Input
                              name="email"
                              defaultValue={user.email}
                              placeholder="Email"
                              className="w-48 bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                            />
                            <Input
                              name="firstName"
                              defaultValue={user.firstName || ""}
                              placeholder="Prénom"
                              className="w-32 bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                            />
                            <Input
                              name="lastName"
                              defaultValue={user.lastName || ""}
                              placeholder="Nom"
                              className="w-32 bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                            />
                            <Input
                              name="phone"
                              defaultValue={user.phone || ""}
                              placeholder="Téléphone"
                              className="w-32 bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                            />
                            <select
                              name="role"
                              defaultValue={user.role}
                              className="h-9 rounded-md border border-[#A8A8A8]/20 bg-white px-3 text-sm text-[#1a1a1a] font-body"
                            >
                              <option value="CLIENT">CLIENT</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
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
                          <div className="font-medium font-body text-[#1a1a1a]">{user.email}</div>
                        </TableCell>
                        <TableCell className="font-body text-[#1a1a1a]">
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell className="font-body text-[#1a1a1a]">{user.phone || "—"}</TableCell>
                        <TableCell>
                          <Badge className={user.role === "ADMIN" ? "bg-[#E9B676]/20 text-[#1a1a1a] border border-[#E9B676]/40 font-body" : "bg-[#A6CFE3]/20 text-[#1a1a1a] border border-[#A6CFE3]/40 font-body"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-body text-[#1a1a1a]">{user._count.bookings}</TableCell>
                        <TableCell className="font-body text-xs text-[#1a1a1a]/60">
                          {user.profile?.tags && user.profile.tags.length
                            ? user.profile.tags.join(", ")
                            : "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                              onClick={() => handleEdit(user)}
                            >
                              <Edit2 className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50 font-body"
                              onClick={() => handleDelete(user.id)}
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

