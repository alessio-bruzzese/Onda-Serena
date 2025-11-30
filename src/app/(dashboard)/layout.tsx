import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
