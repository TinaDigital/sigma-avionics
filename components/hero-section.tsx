"use client"

import { useEffect, useRef } from "react"
import NextImage from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineLeftRef = useRef<HTMLDivElement>(null)
  const lineRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Opening: lines sweep in from center
      tl.fromTo(
        lineLeftRef.current,
        { scaleX: 0, transformOrigin: "right center" },
        { scaleX: 1, duration: 1.2, ease: "power4.inOut" },
        0
      )
      tl.fromTo(
        lineRightRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power4.inOut" },
        0
      )

      // Logo fades in — NO parallax, stays stable
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1 },
        0.4
      )

      // Tagline reveals
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.7
      )

      // Stats stagger
      const statItems = statsRef.current?.querySelectorAll(".stat-item")
      if (statItems) {
        tl.fromTo(
          statItems,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          0.9
        )
      }

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.1
      )

      // Gentle scroll fade for the whole content block — NOT the logo alone
      gsap.to(sectionRef.current?.querySelector(".hero-content") ?? {}, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background — subtle radial glow + noise texture, no photo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep base */}
        <div className="absolute inset-0 bg-background" />
        {/* Centered radial glow that echoes the accent blue */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.52 0.19 252 / 0.07) 0%, transparent 70%)"
        }} />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 50%, oklch(0.06 0.005 255 / 0.7) 100%)"
        }} />
        {/* Film-grain noise */}
        <div className="absolute inset-0 opacity-[0.055]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Grid lines */}
      <div className="grid-bg absolute inset-0 z-[1] opacity-30 pointer-events-none" />

      {/* Horizontal accent lines flanking logo */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-[2] pointer-events-none flex items-center px-6 md:px-16 lg:px-28 gap-6">
        <div ref={lineLeftRef} className="flex-1 rule-accent opacity-30" />
        <div className="w-4 h-4 border border-accent/40 rotate-45 flex-shrink-0" />
        <div ref={lineRightRef} className="flex-1" style={{ height: "1px", background: "linear-gradient(to left, oklch(0.52 0.19 252 / 0.8), transparent)" }} />
      </div>

      {/* Main content — centered, wrapped so scroll-fade works on the whole block */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-16 text-center">

        {/* ANAC badge */}
        <div className="mb-10 inline-flex items-center gap-3 glass-card px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
            Taller Habilitado ANAC — 1B-724
          </span>
        </div>

        {/* Logo — hero scale, NO individual parallax */}
        <div ref={logoRef} className="mb-8 w-full max-w-[280px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[680px]">
          <NextImage
            src="/images/logo-sigma-white.png"
            alt="Sigma Avionics"
            width={680}
            height={194}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="mb-12">
          <p className="font-display font-light text-lg md:text-2xl lg:text-3xl tracking-[0.25em] text-foreground/60 uppercase">
            Ingenieria de Precision para su Cabina
          </p>
          <div className="mt-4 rule-accent mx-auto w-24 opacity-50" />
        </div>

        {/* Highlights — 3 pillars replacing the raw stats */}
        <div
          ref={statsRef}
          className="mb-12 grid grid-cols-3 gap-px bg-border/20 overflow-hidden w-full max-w-lg glass-card"
        >
          <div className="stat-item flex flex-col items-center gap-1 py-5 px-3">
            <span className="font-display font-semibold text-2xl md:text-3xl text-accent tracking-wide">Taller</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">y en pista</span>
          </div>
          <div className="stat-item flex flex-col items-center gap-1 py-5 px-3 border-x border-border/20">
            <span className="font-display font-semibold text-2xl md:text-3xl text-accent tracking-wide">RAAC</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Cumplimiento</span>
          </div>
          <div className="stat-item flex flex-col items-center gap-1 py-5 px-3">
            <span className="font-display font-semibold text-2xl md:text-3xl text-accent tracking-wide">Socios</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Tecnicos</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#signals"
            className="group inline-flex items-center gap-3 bg-accent px-8 py-4 font-display font-semibold text-sm uppercase tracking-[0.2em] text-accent-foreground hover:bg-accent/90 transition-all duration-300 accent-glow"
          >
            Nuestros Servicios
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#colophon"
            className="inline-flex items-center gap-3 glass-card px-8 py-4 font-display font-semibold text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-accent transition-all duration-300"
          >
            Contactar
          </a>
        </div>

      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent animate-pulse" />
      </div>

      {/* Corner coordinates — bottom right */}
      <div className="absolute bottom-8 right-6 md:right-12 z-10">
        <div className="font-mono text-[9px] text-muted-foreground/50 text-right leading-relaxed">
          <div>34°52&apos;37.1&quot;S</div>
          <div>57°57&apos;31.4&quot;O</div>
        </div>
      </div>
    </section>
  )
}
