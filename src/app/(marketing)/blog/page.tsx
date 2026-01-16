import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/marketing/footer"
import { Calendar } from "lucide-react"

import { blogPosts } from "@/data/blog-posts"

export default function BlogPage() {
  return (
    <>
      <div className="min-h-screen bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
          <div className="mb-12 text-center">
            <Badge className="bg-white/80 text-[#1a1a1a] border border-[#A8A8A8]/20 font-body tracking-wider uppercase text-xs px-4 py-1 mb-4">
              Blog & Actualités
            </Badge>
            <h1 className="text-4xl font-light md:text-5xl text-[#1a1a1a] mb-4">
              Actualités & Conseils
            </h1>
            <p className="text-lg text-[#1a1a1a]/70 font-body max-w-2xl mx-auto">
              Découvrez nos articles sur la vie locale, nos conseils pour propriétaires et nos
              études de cas pour optimiser votre location saisonnière.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {blogPosts.map((article, index) => (
              <Card
                key={index}
                className="border-[#A8A8A8]/20 bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center gap-3">
                    <Badge className="bg-[#E9B676]/20 text-[#1a1a1a] border border-[#E9B676]/40 font-body">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-[#A8A8A8] font-body">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-light">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="hover:text-[#A6CFE3] transition"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1a1a1a]/70 font-body mb-4">{article.excerpt}</p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-[#A6CFE3] hover:text-[#E9B676] font-body font-semibold transition"
                  >
                    Lire la suite →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

