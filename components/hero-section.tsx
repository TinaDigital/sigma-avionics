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
      className="relative min-h-[100svh] lg:min-h-[100svh] lg:max-h-[100svh] flex flex-col justify-center overflow-hidden pt-16 md:pt-24 lg:pt-14 notebook-screen:pt-12 short-screen:pt-10 mid-desktop:pt-8 compact-desktop:pt-4"
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

      {/* Horizontal accent lines just below logo — hidden on mobile to avoid overlap */}
      <div className="absolute left-0 right-0 top-[50%] -translate-y-1/2 z-[2] pointer-events-none hidden md:flex items-center px-6 md:px-16 lg:px-28 2xl:px-36 3xl:px-44 gap-6 2xl:gap-8 mid-desktop:top-[49%] compact-desktop:top-[48%]">
        <div ref={lineLeftRef} className="flex-1 rule-accent opacity-30" />
        <div className="w-4 h-4 border border-accent/40 rotate-45 flex-shrink-0 compact-desktop:w-3 compact-desktop:h-3" />
        <div ref={lineRightRef} className="flex-1" style={{ height: "1px", background: "linear-gradient(to left, oklch(0.52 0.19 252 / 0.8), transparent)" }} />
      </div>

      {/* Main content — centered, wrapped so scroll-fade works on the whole block */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center min-h-[calc(100svh-4rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100svh-3.5rem)] lg:max-h-[calc(100svh-3.5rem)] notebook-screen:min-h-[calc(100svh-3rem)] notebook-screen:max-h-[calc(100svh-3rem)] mid-desktop:min-h-[calc(100svh-2rem)] mid-desktop:max-h-[calc(100svh-2rem)] compact-desktop:min-h-[calc(100svh-1rem)] compact-desktop:max-h-[calc(100svh-1rem)] px-4 sm:px-6 md:px-16 2xl:px-24 text-center">

        {/* ANAC badge */}
        <div className="mb-3 sm:mb-4 md:mb-8 lg:mb-7 notebook-screen:mb-5 short-screen:mb-4 mid-desktop:mb-3 compact-desktop:mb-1.5 2xl:mb-12 inline-flex items-center gap-2 sm:gap-3 glass-card px-3 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 notebook-screen:px-3 notebook-screen:py-1.5 compact-desktop:px-2.5 compact-desktop:py-0.5 2xl:px-5 2xl:py-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse compact-desktop:w-1 compact-desktop:h-1" />
          <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] notebook-screen:text-[8px] compact-desktop:text-[7px] uppercase tracking-[0.2em] sm:tracking-[0.32em] md:tracking-[0.35em] notebook-screen:tracking-[0.26em] compact-desktop:tracking-[0.2em] text-accent">
            Taller Habilitado ANAC — 1B-724
          </span>
        </div>

        {/* Logo — hero scale, NO individual parallax */}
        <div ref={logoRef} className="mb-3 sm:mb-4 md:mb-8 lg:mb-7 notebook-screen:mb-5 short-screen:mb-4 mid-desktop:mb-3 compact-desktop:mb-1.5 2xl:mb-10 w-full max-w-[220px] sm:max-w-[280px] md:max-w-[520px] lg:max-w-[560px] notebook:max-w-[500px] mid-desktop:max-w-[400px] compact-desktop:max-w-[300px] desktop:max-w-[640px] 2xl:max-w-[760px] 3xl:max-w-[880px]">
          <NextImage
            src="/images/logo-sigma-white.png"
            alt="Sigma Avionics"
            width={680}
            height={194}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
          <p className=" sm:mt-2 md:mt-4 mid-desktop:mt-1 compact-desktop:mt-1 font-mono text-[12px] md:text-[15px] notebook-screen:text-[15px] compact-desktop:text-[15px] mid-desktop:text-[15px] desktop:text-[18px] tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.4em] compact-desktop:tracking-[0.2em] text-foreground/50 uppercase text-center">
            Instalando Confianza
          </p>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="mb-4 sm:mb-6 md:mb-10 lg:mb-8 notebook-screen:mb-6 short-screen:mb-5 mid-desktop:mb-4 compact-desktop:mb-2 2xl:mb-14">
          <p className="font-display font-light text-[15px] sm:text-sm md:text-lg lg:text-xl notebook-screen:text-lg short-screen:text-[15px] mid-desktop:text-base compact-desktop:text-sm desktop:text-2xl 2xl:text-3xl tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.25em] notebook-screen:tracking-[0.18em] compact-desktop:tracking-[0.12em] text-foreground/60 uppercase">
            Ingenieria de Precision para su Cabina
          </p>
          <div className="mt-2 sm:mt-3 md:mt-4 compact-desktop:mt-1 mid-desktop:mt-2 rule-accent mx-auto w-16 sm:w-20 md:w-24 compact-desktop:w-14 opacity-50" />
        </div>

        {/* Highlights — 3 pillars replacing the raw stats */}
        <div
          ref={statsRef}
          className="mb-4 sm:mb-6 md:mb-10 lg:mb-8 notebook-screen:mb-6 short-screen:mb-5 mid-desktop:mb-4 compact-desktop:mb-2 2xl:mb-14 grid grid-cols-3 gap-px bg-border/20 overflow-hidden w-full max-w-[280px] sm:max-w-xs md:max-w-lg lg:max-w-[520px] notebook:max-w-[480px] mid-desktop:max-w-[420px] compact-desktop:max-w-[360px] desktop:max-w-[560px] 2xl:max-w-xl glass-card"
        >
          <div className="stat-item flex flex-col items-center gap-0.5 sm:gap-1 py-2.5 sm:py-3 md:py-5 notebook-screen:py-3 short-screen:py-2.5 mid-desktop:py-2 compact-desktop:py-1.5 px-1.5 sm:px-2.5 md:px-3">
            <span className="font-display font-semibold text-sm sm:text-lg md:text-2xl lg:text-[1.65rem] notebook-screen:text-[1.35rem] short-screen:text-[1.25rem] mid-desktop:text-xl compact-desktop:text-lg text-accent tracking-wide">Servicios</span>
            <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] compact-desktop:text-[6px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-muted-foreground">Avionica</span>
          </div>
          <div className="stat-item flex flex-col items-center gap-0.5 sm:gap-1 py-2.5 sm:py-3 md:py-5 notebook-screen:py-3 short-screen:py-2.5 mid-desktop:py-2 compact-desktop:py-1.5 px-1 sm:px-2.5 md:px-3 border-x border-border/20">
            <span className="font-display font-semibold text-xs sm:text-lg md:text-2xl lg:text-[1.65rem] notebook-screen:text-[1.35rem] short-screen:text-[1.25rem] mid-desktop:text-xl compact-desktop:text-lg text-accent tracking-normal sm:tracking-wide">Instalaciones</span>
            <span className="font-mono text-[6px] sm:text-[8px] md:text-[9px] compact-desktop:text-[6px] uppercase tracking-[0.08em] sm:tracking-[0.2em] text-muted-foreground">Mantenimiento</span>
          </div>
          <div className="stat-item flex flex-col items-center gap-0.5 sm:gap-1 py-2.5 sm:py-3 md:py-5 notebook-screen:py-3 short-screen:py-2.5 mid-desktop:py-2 compact-desktop:py-1.5 px-1.5 sm:px-2.5 md:px-3">
            <span className="font-display font-semibold text-sm sm:text-lg md:text-2xl lg:text-[1.65rem] notebook-screen:text-[1.35rem] short-screen:text-[1.25rem] mid-desktop:text-xl compact-desktop:text-lg text-accent tracking-wide">Soporte</span>
            <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] compact-desktop:text-[6px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-muted-foreground">Taller + pista</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 md:gap-4 compact-desktop:gap-2.5">
          <a
            href="#signals"
            className="group inline-flex items-center gap-2 sm:gap-3 bg-accent px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 mid-desktop:px-6 mid-desktop:py-2.5 compact-desktop:px-5 compact-desktop:py-2 font-display font-semibold text-xs sm:text-sm compact-desktop:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent-foreground hover:bg-accent/90 transition-all duration-300 accent-glow"
          >
            Nuestros Servicios
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#colophon"
            className="inline-flex items-center gap-2 sm:gap-3 glass-card px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 mid-desktop:px-6 mid-desktop:py-2.5 compact-desktop:px-5 compact-desktop:py-2 font-display font-semibold text-xs sm:text-sm compact-desktop:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground/80 hover:text-accent transition-all duration-300"
          >
            Contactar
          </a>
        </div>

      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 mid-desktop:bottom-3 compact-desktop:bottom-1.5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:gap-2 compact-desktop:gap-1">
        <span className="font-mono text-[8px] sm:text-[9px] compact-desktop:text-[7px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="w-px h-5 sm:h-8 compact-desktop:h-4 bg-gradient-to-b from-muted-foreground/40 to-transparent animate-pulse" />
      </div>

      {/* Corner coordinates — bottom right */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 mid-desktop:bottom-3 compact-desktop:bottom-1.5 right-4 sm:right-6 md:right-12 z-10">
        <div className="font-mono text-[7px] sm:text-[8px] md:text-[9px] compact-desktop:text-[6px] text-muted-foreground/50 text-right leading-relaxed">
          <div>34°52&apos;37.1&quot;S</div>
          <div>57°57&apos;31.4&quot;O</div>
        </div>
      </div>
    </section>
  )
}
