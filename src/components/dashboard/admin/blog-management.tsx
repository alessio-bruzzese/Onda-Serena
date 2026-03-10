"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import dynamic from "next/dynamic"

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <p className="text-sm text-[#A8A8A8] font-body py-4">Chargement de l'éditeur...</p>,
})
import "react-quill-new/dist/quill.snow.css"

import { blogPostSchema, type BlogPostValues } from "@/lib/validators/admin"
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/app/(dashboard)/admin/actions"
import type { BlogPost } from "@/types/firestore"

export function BlogManagement({ initialPosts }: { initialPosts: BlogPost[] }) {
    const [posts, setPosts] = useState(initialPosts)
    const [isEditing, setIsEditing] = useState<string | null>(null)
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<BlogPostValues>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: {
            slug: "",
            title: "",
            excerpt: "",
            content: "",
            category: "",
            date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
            coverImage: "",
        },
    })

    // Format form values for submission
    const formatFormData = (values: BlogPostValues, postId?: string) => {
        const formData = new FormData()
        if (postId) formData.append("postId", postId)
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, String(value || ""))
        })
        return formData
    }

    const onSubmit = async (values: BlogPostValues) => {
        try {
            setIsLoading(true)
            if (isEditing) {
                const formData = formatFormData(values, isEditing)
                const result = await updateBlogPost(formData)
                if (result.error) {
                    toast.error(result.error)
                    return
                }
                toast.success(result.success)
                // Optimistic update
                setPosts((prev) =>
                    prev.map((post) => (post.id === isEditing ? { ...post, ...values } as unknown as BlogPost : post))
                )
                setIsEditing(null)
            } else {
                const formData = formatFormData(values)
                const result = await createBlogPost(formData)
                if (result.error) {
                    toast.error(result.error)
                    return
                }
                toast.success(result.success)
                setIsAdding(false)
                // Actual reload occurs due to server action revalidatePath, 
                // but can force a soft reload if necessary. 
                // Here trusting revalidatePath to refresh the props gracefully next render.
                window.location.reload()
            }
            form.reset()
        } catch {
            toast.error("Une erreur est survenue")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (postId: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return

        try {
            const formData = new FormData()
            formData.append("postId", postId)
            const result = await deleteBlogPost(formData)
            if (result.error) {
                toast.error(result.error)
                return
            }
            toast.success(result.success)
            setPosts((prev) => prev.filter((post) => post.id !== postId))
        } catch {
            toast.error("Erreur lors de la suppression")
        }
    }

    const handleEdit = (post: BlogPost) => {
        setIsEditing(post.id)
        setIsAdding(false)
        form.reset({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            date: post.date,
            coverImage: post.coverImage || "",
        })
    }

    const handleCancel = () => {
        setIsEditing(null)
        setIsAdding(false)
        form.reset()
    }

    return (
        <Card className="rounded-3xl border border-[#A8A8A8]/20 bg-white/80 backdrop-blur shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <p className="font-body text-sm uppercase tracking-[0.3em] text-[#A8A8A8]">Gestion</p>
                    <CardTitle className="font-heading-alt text-2xl font-light text-[#1a1a1a]">Articles de Blog</CardTitle>
                </div>
                {!isAdding && !isEditing && (
                    <Button
                        onClick={() => {
                            setIsAdding(true)
                            form.reset({
                                slug: "",
                                title: "",
                                excerpt: "",
                                content: "",
                                category: "",
                                date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
                                coverImage: "",
                            })
                        }}
                        className="bg-[#E9B676] text-white hover:bg-[#d4a565] font-body"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un article
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isAdding || isEditing ? (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="font-body text-[#1a1a1a]">Titre</Label>
                                <Input
                                    id="title"
                                    {...form.register("title")}
                                    className="rounded-xl border-[#A8A8A8]/30 font-body placeholder:text-[#A8A8A8]"
                                />
                                {form.formState.errors.title && (
                                    <p className="text-sm text-red-500 font-body">{form.formState.errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug" className="font-body text-[#1a1a1a]">Slug (URL)</Label>
                                <Input
                                    id="slug"
                                    {...form.register("slug")}
                                    className="rounded-xl border-[#A8A8A8]/30 font-body placeholder:text-[#A8A8A8]"
                                />
                                {form.formState.errors.slug && (
                                    <p className="text-sm text-red-500 font-body">{form.formState.errors.slug.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="font-body text-[#1a1a1a]">Catégorie</Label>
                                <Input
                                    id="category"
                                    {...form.register("category")}
                                    className="rounded-xl border-[#A8A8A8]/30 font-body placeholder:text-[#A8A8A8]"
                                />
                                {form.formState.errors.category && (
                                    <p className="text-sm text-red-500 font-body">{form.formState.errors.category.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date" className="font-body text-[#1a1a1a]">Date (affichage)</Label>
                                <Input
                                    id="date"
                                    {...form.register("date")}
                                    className="rounded-xl border-[#A8A8A8]/30 font-body placeholder:text-[#A8A8A8]"
                                />
                                {form.formState.errors.date && (
                                    <p className="text-sm text-red-500 font-body">{form.formState.errors.date.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage" className="font-body text-[#1a1a1a]">URL Image (optionnel)</Label>
                            <Input
                                id="coverImage"
                                {...form.register("coverImage")}
                                placeholder="https://..."
                                className="rounded-xl border-[#A8A8A8]/30 font-body placeholder:text-[#A8A8A8]"
                            />
                            {form.formState.errors.coverImage && (
                                <p className="text-sm text-red-500 font-body">{form.formState.errors.coverImage.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt" className="font-body text-[#1a1a1a]">Extrait (Court résumé)</Label>
                            <Textarea
                                id="excerpt"
                                {...form.register("excerpt")}
                                className="rounded-xl border-[#A8A8A8]/30 font-body placeholder:text-[#A8A8A8] min-h-[80px]"
                            />
                            {form.formState.errors.excerpt && (
                                <p className="text-sm text-red-500 font-body">{form.formState.errors.excerpt.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="font-body text-[#1a1a1a]">Contenu (HTML/Texte)</Label>
                            <Controller
                                name="content"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="bg-white rounded-xl border border-[#A8A8A8]/30 overflow-hidden">
                                        <ReactQuill
                                            theme="snow"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="font-body"
                                            modules={{
                                                toolbar: [
                                                    [{ header: [2, 3, 4, false] }],
                                                    [{ size: ["small", false, "large", "huge"] }],
                                                    ["bold", "italic", "underline", "strike", "blockquote"],
                                                    [{ list: "ordered" }, { list: "bullet" }],
                                                    ["link", "image"],
                                                    [{ color: [] }, { background: [] }],
                                                    ["clean"],
                                                ],
                                                clipboard: {
                                                    matchVisual: false,
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            />
                            {form.formState.errors.content && (
                                <p className="text-sm text-red-500 font-body">{form.formState.errors.content.message}</p>
                            )}
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50 font-body"
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#1a1a1a] text-white hover:bg-black font-body"
                            >
                                {isLoading ? "Enregistrement..." : (isEditing ? "Mettre à jour" : "Créer l'article")}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="max-h-[600px] space-y-4 overflow-y-auto pr-2">
                        {posts.length === 0 ? (
                            <div className="text-center py-8 text-[#A8A8A8] font-body">Aucun article trouvé.</div>
                        ) : (
                            posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="rounded-2xl border border-[#A8A8A8]/20 bg-gradient-to-br from-[#F5E9D4]/30 to-white p-6 shadow-sm flex items-start justify-between"
                                >
                                    <div className="space-y-2 max-w-[70%]">
                                        <Badge className="bg-[#E9B676]/20 text-[#1a1a1a] border border-[#E9B676]/40 font-body">
                                            {post.category}
                                        </Badge>
                                        <h3 className="font-heading-alt text-xl font-medium text-[#1a1a1a]">{post.title}</h3>
                                        <p className="text-sm text-[#A8A8A8] font-body">Publié le {post.date} • Slug: {post.slug}</p>
                                        <p className="font-body text-sm text-[#1a1a1a]/70 line-clamp-2">{post.excerpt}</p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(post)}
                                            className="border-[#A8A8A8]/30 text-[#1a1a1a] hover:bg-[#F5E9D4]/50"
                                        >
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(post.id)}
                                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-none"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
