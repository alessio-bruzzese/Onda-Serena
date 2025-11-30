import { CTASection } from "@/components/marketing/cta"
import { ExperienceSection } from "@/components/marketing/experience"
import { Footer } from "@/components/marketing/footer"
import { HeroSection } from "@/components/marketing/hero"
import { ServicesShowcase } from "@/components/marketing/services-showcase"
import { TestimonialsSection } from "@/components/marketing/testimonials"
import { LeadMagnetForm } from "@/components/marketing/lead-magnet"

export default function LandingPage() {
  return (
    <div style={{ background: "linear-gradient(to bottom, #CAE3F0 0%, #F5E9D4 50%, #CAE3F0 100%)", minHeight: "100vh" }}>
      <HeroSection />
      <ServicesShowcase />
      <TestimonialsSection />
      <ExperienceSection />
      <CTASection />
      <LeadMagnetForm />
      <Footer />
    </div>
  )
}



