import { Header } from "@/components/marketing/header"

type MarketingLayoutProps = {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="text-foreground">
      <Header />
      {children}
    </div>
  )
}

