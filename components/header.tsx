"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navItems = [
  { id: "hero", label: "Inicio" },
  { id: "signals", label: "Servicios" },
  { id: "principles", label: "Nosotros" },
  { id: "colophon", label: "Contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const goToHomeOrScrollHero = () => {
    if (pathname !== "/") {
      window.location.href = "/"
      return
    }
    scrollToSection("hero")
  }

  const handleNavClick = (id: string) => {
    if (id === "hero" && pathname !== "/") {
      window.location.href = "/"
      return
    }
    scrollToSection(id)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/50"
          : "bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={goToHomeOrScrollHero}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <Image
              src="/images/logo-sigma-white.png"
              alt="Sigma Avionics"
              width={200}
              height={56}
              className="h-7 md:h-9 w-auto"
              priority
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group relative font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 pb-0.5 cursor-pointer"
              >
                {item.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
              </button>
            ))}
            <a
              href="/portal-info-aero"
              className="group relative font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 pb-0.5 cursor-pointer"
            >
              Portal
              <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
            </a>
            <a
              href="tel:+5491154982223"
              className="group relative inline-flex items-center gap-2 border border-accent/60 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-foreground transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Fill sweep on hover */}
              <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative">Contactar</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground relative z-[90]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[80] transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_15%,oklch(0.52_0.19_252_/_0.12)_0%,transparent_70%)]" />

        <div className="relative h-full px-6 pt-24 pb-10 flex flex-col">
          <nav className="flex-1 flex flex-col items-center justify-center gap-2 -mt-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group w-full max-w-sm py-4 font-display text-2xl uppercase tracking-[0.14em] text-foreground/80 hover:text-accent transition-all duration-200 cursor-pointer border-b border-border/30"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/70 transition-all duration-200 group-hover:scale-125 group-hover:bg-accent" />
                <span>{item.label}</span>
              </span>
            </button>
          ))}
          <a
            href="/portal-info-aero"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group w-full max-w-sm py-4 font-display text-2xl uppercase tracking-[0.14em] text-foreground/80 hover:text-accent transition-all duration-200 cursor-pointer border-b border-border/30"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70 transition-all duration-200 group-hover:scale-125 group-hover:bg-accent" />
              <span>Aviation Info Portal</span>
            </span>
          </a>
          </nav>

          <a
            href="tel:+5491154982223"
            className="mx-auto mt-6 inline-flex items-center justify-center gap-2 border border-accent bg-accent text-accent-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent/90 transition-all duration-200 cursor-pointer"
          >
            Contactar Ahora
          </a>
        </div>
      </div>
    </header>
  )
}
