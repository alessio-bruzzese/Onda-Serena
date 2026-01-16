import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/marketing/footer"
import { Calendar, ArrowLeft } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <div className="min-h-screen bg-transparent">
                <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
                    <div className="mb-8">
                        <Link href="/blog">
                            <Button variant="ghost" className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-transparent pl-0 font-body gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Retour aux articles
                            </Button>
                        </Link>
                    </div>

                    <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#A8A8A8]/10">
                        <header className="mb-12 text-center">
                            <div className="mb-6 flex items-center justify-center gap-3">
                                <Badge className="bg-[#E9B676]/20 text-[#1a1a1a] border border-[#E9B676]/40 font-body">
                                    {post.category}
                                </Badge>
                                <div className="flex items-center gap-2 text-sm text-[#A8A8A8] font-body">
                                    <Calendar className="h-4 w-4" />
                                    {post.date}
                                </div>
                            </div>
                            <h1 className="text-3xl font-light md:text-5xl text-[#1a1a1a] mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-xl text-[#1a1a1a]/70 font-body max-w-2xl mx-auto leading-relaxed">
                                {post.excerpt}
                            </p>
                        </header>

                        <div
                            className="prose prose-lg prose-stone mx-auto font-body text-[#1a1a1a]/80 
                prose-headings:font-heading-alt prose-headings:font-light prose-headings:text-[#1a1a1a] 
                prose-a:text-[#A6CFE3] prose-a:no-underline hover:prose-a:text-[#E9B676] hover:prose-a:underline
                prose-strong:font-semibold prose-strong:text-[#1a1a1a]
                prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-[#E9B676]"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>
                </div>
            </div>
            <Footer />
        </>
    )
}
