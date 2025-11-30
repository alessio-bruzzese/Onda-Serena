import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F5E9D4] to-white">
      <Header />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-[32px] border-2 border-[#A6CFE3]/30 bg-white/80 backdrop-blur-sm p-8 md:p-12 shadow-xl">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
