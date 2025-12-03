"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createService, updateService, deleteService } from "@/app/(dashboard)/admin/actions"
import { Edit2, Trash2, X, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ServiceType = {
  id: string
  name: string
  description: string
  price: number | string
  priceType: "FIXED" | "PERCENTAGE" | "QUOTE"
  category: string
  imageUrl: string | null
}

type Props = {
  initialServices: ServiceType[]
}

// Helper to format price display
const formatPrice = (price: number, type: string) => {
  if (type === "QUOTE") return "Sur devis"
  if (type === "PERCENTAGE") return `${price}%`
  return `${Number(price).toFixed(2)} €`
}

export function ServicesManagement({ initialServices }: Props) {
  const [services, setServices] = useState(initialServices)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleEdit = (service: ServiceType) => {
    setEditingId(service.id)
    setIsCreating(false)
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsCreating(false)
  }

  const handleSave = async (serviceId: string | null, formData: FormData) => {
    startTransition(async () => {
      const result = serviceId
        ? await updateService(formData)
        : await createService(formData)
      if (result.success) {
        window.location.reload()
      } else {
        alert(result.error)
      }
    })
  }

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      return
    }
    startTransition(async () => {
      const result = await deleteService({ serviceId })
      if (result.success) {
        setServices(services.filter((s) => s.id !== serviceId))
      } else {
        alert(result.error)
      }
    })
  }



  return (
    <div className="space-y-6">
      {/* ... (header) */}

      <Card className="rounded-3xl border border-[#A8A8A8]/20 bg-white/80 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading-alt text-[#1a1a1a]">Liste des services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <div className="mb-4 rounded-2xl border border-[#A8A8A8]/20 bg-gradient-to-br from-[#F5E9D4]/30 to-white p-4">
              <form action={(formData) => handleSave(null, formData)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input name="name" placeholder="Nom du service" required className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body" />
                  <Input
                    name="category"
                    placeholder="Catégorie"
                    required
                    className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                  />
                  <div className="flex gap-2">
                    <Select name="priceType" defaultValue="FIXED">
                      <SelectTrigger className="w-[140px] bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FIXED">Fixe (€)</SelectItem>
                        <SelectItem value="PERCENTAGE">Pourcentage (%)</SelectItem>
                        <SelectItem value="QUOTE">Sur devis</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="Prix / %"
                      required
                      className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body flex-1"
                    />
                  </div>
                  <Input
                    name="imageUrl"
                    type="url"
                    placeholder="URL de l'image (optionnel)"
                    className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                  />
                </div>
                <Input
                  name="description"
                  placeholder="Description"
                  required
                  className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
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
                    Créer
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                    onClick={handleCancel}
                  >
                    <X className="size-4" />
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#A8A8A8]/20 text-[#1a1a1a]/60">
                  <TableHead className="font-body">Nom</TableHead>
                  <TableHead className="font-body">Description</TableHead>
                  <TableHead className="font-body">Catégorie</TableHead>
                  <TableHead className="font-body">Prix</TableHead>
                  <TableHead className="font-body">Image</TableHead>
                  <TableHead className="font-body">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id} className="border-b border-[#A8A8A8]/10 text-[#1a1a1a]/80">
                    {editingId === service.id ? (
                      <>
                        <TableCell colSpan={6}>
                          <form
                            action={(formData) => handleSave(service.id, formData)}
                            className="space-y-4"
                          >
                            <input type="hidden" name="serviceId" value={service.id} />
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                name="name"
                                defaultValue={service.name}
                                placeholder="Nom du service"
                                required
                                className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                              />
                              <Input
                                name="category"
                                defaultValue={service.category}
                                placeholder="Catégorie"
                                required
                                className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                              />
                              <div className="flex gap-2">
                                <Select name="priceType" defaultValue={service.priceType}>
                                  <SelectTrigger className="w-[140px] bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body">
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PERCENTAGE">Pourcentage (%)</SelectItem>
                                    <SelectItem value="QUOTE">Sur devis</SelectItem>
                                  </SelectContent>
                                </Select>
                                {service.priceType !== "QUOTE" && (
                                  <Input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={Number(service.price)}
                                    placeholder="%"
                                    required
                                    className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body flex-1"
                                  />
                                )}
                                {service.priceType === "QUOTE" && (
                                  <input type="hidden" name="price" value="0" />
                                )}
                              </div>
                              <Input
                                name="imageUrl"
                                type="url"
                                defaultValue={service.imageUrl || ""}
                                placeholder="URL de l'image"
                                className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
                              />
                            </div>
                            <Input
                              name="description"
                              defaultValue={service.description}
                              placeholder="Description"
                              required
                              className="bg-white border-[#A8A8A8]/20 text-[#1a1a1a] font-body"
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
                                Enregistrer
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                                onClick={handleCancel}
                              >
                                <X className="size-4" />
                                Annuler
                              </Button>
                            </div>
                          </form>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="font-medium font-body text-[#1a1a1a]">{service.name}</TableCell>
                        <TableCell className="max-w-xs truncate font-body text-sm text-[#1a1a1a]">{service.description}</TableCell>
                        <TableCell className="font-body text-[#1a1a1a]">{service.category}</TableCell>
                        <TableCell className="font-body text-[#1a1a1a]">{formatPrice(Number(service.price), service.priceType)}</TableCell>
                        <TableCell>
                          {service.imageUrl ? (
                            <a
                              href={service.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-body text-[#A6CFE3] hover:text-[#E9B676] hover:underline"
                            >
                              Voir
                            </a>
                          ) : (
                            <span className="font-body text-[#1a1a1a]/60">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                              onClick={() => handleEdit(service)}
                            >
                              <Edit2 className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50 font-body"
                              onClick={() => handleDelete(service.id)}
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

