import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { PrinciplesSection } from "@/components/principles-section"
import { ColophonSection } from "@/components/colophon-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      <div className="grid-bg fixed inset-0 opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <SignalsSection />
        <PrinciplesSection />
        <ColophonSection />
        <Footer />
      </div>
    </main>
  )
}
