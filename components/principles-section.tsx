"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import { AirplaneUnderline } from "@/components/airplane-underline"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const principles = [
    {
      number: "01",
      titleParts: [
        { text: "PRECISION ", highlight: true },
        { text: "TECNICA", highlight: false },
      ],
      description: "En la aviacion no hay margen para el error. Cada instalacion se realiza con la exactitud de un laboratorio de ingenieria.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "CONFIANZA ", highlight: true },
        { text: "INSTALADA", highlight: false },
      ],
      description: "Nuestro compromiso no termina al entregar el trabajo. Somos sus socios tecnicos para acompanar la operacion y mejora continua.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "CUMPLIMIENTO ", highlight: false },
        { text: "NORMATIVO", highlight: true },
      ],
      description: "Trabajos trazables y alineados con los mas altos estandares de la industria aeronautica y regulaciones RAAC.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "EXPERIENCIA ", highlight: false },
        { text: "INTEGRAL", highlight: true },
      ],
      description: "Mas de 20 anos de trayectoria en mantenimiento e ingenieria aeronautica con vision tecnica y operativa.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Intro fade in
      if (introRef.current) {
        gsap.from(introRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Each principle slides in — reduced offset on mobile to avoid horizontal overflow
      const isMobile = window.innerWidth < 768
      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = principles[index].align === "right"
        gsap.from(article, {
          x: isMobile ? 0 : isRight ? 70 : -70,
          y: isMobile ? 30 : 0,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-24 md:py-32 2xl:py-36 px-6 md:px-12 lg:px-28 2xl:px-36 3xl:px-44 overflow-x-hidden bg-background">
      {/* Background photo strip */}
      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto w-full lg:w-1/2 xl:w-2/5 z-0 pointer-events-none">
        <div className="relative h-full">
          <div className="absolute inset-0 opacity-20 sm:opacity-30 lg:opacity-40" style={{
            backgroundImage: "url('/images/aircraft-tarmac.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            filter: "brightness(1.2) contrast(1.08) saturate(1.05)",
          }} />
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-background/96 via-background/50 lg:via-background/20 to-background/70 lg:to-transparent" />
        </div>
      </div>

      {/* Section header */}
      <div ref={headerRef} className="relative z-10 mb-16 md:mb-20 2xl:mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="rule-accent w-8 opacity-80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">02 / Nosotros</span>
        </div>
        <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-8xl 2xl:text-9xl tracking-tight uppercase leading-none">
          Sobre <span className="text-foreground/30">Sigma</span>
        </h2>
      </div>

      {/* Introduction paragraph */}
      <div ref={introRef} className="relative z-10 mb-16 md:mb-24 2xl:mb-28 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-10 items-start max-w-5xl">
        <div>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-light">
            En la aviacion no hay margen para el error.{" "}
            <span className="text-accent font-medium">Sigma Avionics</span> nace con una premisa clara: ofrecer un servicio tecnico que combine la precision de un laboratorio de ingenieria con la agilidad que exige la operacion diaria.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4 font-light">
            Ubicados en el Aeroclub La Plata Ensenada, brindamos soporte tanto en taller como en pista. Somos sus socios tecnicos para acompanar la operacion, el mantenimiento y la mejora continua de su aeronave.
          </p>
          <p className="font-display font-semibold text-xl md:text-2xl text-accent tracking-widest uppercase mt-8">
            A eso lo llamamos instalar confianza.
          </p>
        </div>
        <div className="relative h-52 md:h-64 lg:h-full min-h-[210px] overflow-hidden border border-border/40">
          <Image
            src="/images/cockpit.jpg"
            alt="Cabina y panel de instrumentos"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent" />
          <div className="absolute bottom-3 left-3 glass-card px-3 py-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/75">
              Seguridad y Estetica En Cabina
            </p>
          </div>
        </div>
      </div>

      {/* Staggered principles */}
      <div ref={principlesRef} className="relative z-10 space-y-12 md:space-y-16 2xl:space-y-20 max-w-3xl 2xl:max-w-4xl overflow-hidden md:overflow-visible">
        {principles.map((principle, index) => (
          <article
            key={index}
            className={`flex flex-col items-start text-left ${principle.align === "right" ? "md:items-end md:text-right md:ml-auto" : ""
              }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="rule-accent w-6 opacity-60" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-accent">
                {principle.number}
              </span>
            </div>

            <h3 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl tracking-wide leading-none uppercase">
              {principle.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i} className="text-foreground/40">{part.text}</span>
                ),
              )}
            </h3>

            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed font-light">
              {principle.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
