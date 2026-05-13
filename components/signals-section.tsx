"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    code: "SVC-01",
    title: "Instalacion de Avionica",
    category: "Garmin / Aspen / Dynon",
    description:
      "Modernizacion y retrofit de cabina. Instalamos equipos de navegacion, comunicaciones y sistemas glass-cockpit en aeronaves civiles y experimentales.",
    image: "/images/instalacion_avionica.jpg",
  },
  {
    code: "SVC-02",
    title: "Ensayo Transponder",
    category: "RAAC 91.413",
    description:
      "Verificacion de transponder Modos A/C y S conforme a regulaciones RAAC 91.413 y RAAC 43. Certificacion de equipos para operacion IFR.",
    image: "/images/aircraft-hangar.jpg",
  },
  {
    code: "SVC-03",
    title: "Sistema Altimétrico: Pitot y Estática",
    category: "RAAC 91.411",
    description:
      "Ensayo de sistemas altimétricos y pitot-estático con equipos calibrados. Cumplimiento normativo para vuelo IFR conforme RAAC 91.411.",
    image: "/images/aircraft-sunset.jpg",
  },
  {
    code: "SVC-04",
    title: "Actualizacion de Bases de Datos",
    category: "Cartografia / FMS",
    description:
      "Actualizacion de cartografia y bases de datos para GPS, FMS y sistemas TAWS/EGPWS. Datos aeronauticos vigentes y certificados.",
    image: "/images/actualizacion_datos.jpg",
  },
  {
    code: "SVC-05",
    title: "Diagnostico y Reparacion",
    category: "Laboratorio",
    description:
      "Pruebas funcionales, calibracion y diagnostico de fallas en sistemas de avionica y electricos. Mantenimiento correctivo y preventivo en taller y en pista.",
    image: "/images/diagnostico_reparacion.jpg",
  },
  {
    code: "SVC-06",
    title: "Documentacion Tecnica",
    category: "Ingenieria",
    description:
      "Analisis de carga electrica, Instrucciones de Continuacion de la Aeronavegabilidad (ICA), informes de ensayo y planos de instalacion.",
    image: "/images/documentacion_tecnica.jpg",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      gsap.to(cursor, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 px-6 md:px-12 lg:px-28 bg-secondary/40">
      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block",
          "w-10 h-10 rounded-full border border-accent/60",
          "transition-opacity duration-300",
          isHovering ? "opacity-10" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px] gap-8 lg:gap-10 items-end">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="rule-accent w-8 opacity-80" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">01 / Servicios</span>
          </div>
          <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-8xl tracking-tight uppercase leading-none">
            Nuestros<br />
            <span className="text-foreground/30">Servicios</span>
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed font-light">
            Soluciones integrales en avionica para aeronaves civiles y experimentales.
            Desde instalaciones completas hasta ensayos normativos RAAC.
          </p>
        </div>
        <div className="relative h-44 md:h-52 lg:h-56 w-full overflow-hidden border border-border/40">
          <Image
            src="/images/aircraft-hangar.jpg"
            alt="Taller de avionica Sigma Avionics"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-transparent" />
          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 glass-card px-3 py-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/75">
              Taller y ensayos en pista
            </p>
          </div>
        </div>
      </div>

      {/* Services grid — gap-px creates hairline borders, grid-rows auto-stretches all cells */}
      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-px bg-transparent sm:bg-border/30 auto-rows-fr"
        style={{ scrollbarWidth: "none" }}
      >
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: {
    code: string
    title: string
    category: string
    description: string
    image: string
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className="group relative bg-background overflow-hidden cursor-default h-full border border-border/30 sm:border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image layer — gradient reveal from left (opaque) to right (visible) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={80}
          className={cn(
            "object-cover transition-all duration-700",
            isHovered ? "scale-105 opacity-90" : "opacity-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 via-20% to-background/5" />
      </div>

      {/* Content — h-full so all cards stretch to row height */}
      <div className="relative z-10 p-7 md:p-9 flex flex-col gap-5 h-full bg-background/50 border border-border/20 border-0 transition-all duration-500 group-hover:bg-background/30">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">{service.code}</span>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full bg-accent transition-all duration-500",
            isHovered ? "opacity-100 shadow-[0_0_6px_2px_oklch(0.52_0.19_252/0.6)]" : "opacity-30"
          )} />
        </div>

        {/* Category badge */}
        <div>
          <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-muted-foreground border border-border/60 px-2 py-1">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-display font-semibold text-2xl md:text-3xl uppercase tracking-wide leading-tight transition-colors duration-300",
          isHovered ? "text-accent" : "text-foreground"
        )}>
          {service.title}
        </h3>

        {/* Divider */}
        <div className={cn(
          "h-px bg-accent transition-all duration-500",
          isHovered ? "w-full opacity-60" : "w-8 opacity-30"
        )} />

        {/* Description */}
        <p className={cn(
          "text-sm text-muted-foreground leading-relaxed font-light transition-all duration-400",
          isHovered ? "text-foreground/80" : ""
        )}>
          {service.description}
        </p>
      </div>
    </article>
  )
}
