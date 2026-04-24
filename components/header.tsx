"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
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
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
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
                onClick={() => scrollToSection(item.id)}
                className="group relative font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 pb-0.5"
              >
                {item.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
              </button>
            ))}
            <a
              href="tel:+5491154982223"
              className="group relative inline-flex items-center gap-2 border border-accent/60 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-foreground transition-all duration-300 overflow-hidden"
            >
              {/* Fill sweep on hover */}
              <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative">Contactar</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col px-4 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200 text-left border-b border-border/30 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <a
            href="tel:+5491154982223"
            className="mt-4 inline-flex items-center justify-center gap-2 border border-accent bg-accent text-accent-foreground px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent/90 transition-all duration-200"
          >
            Contactar Ahora
          </a>
        </nav>
      </div>
    </header>
  )
}
