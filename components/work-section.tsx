"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiments = [
  {
    title: "Instalacion de Avionica",
    medium: "Garmin / Aspen / Dynon",
    description: "Modernizacion y retrofit de cabina. Instalamos equipos de navegacion, comunicaciones y sistemas glass-cockpit.",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Ensayo Transponder",
    medium: "RAAC 91.413",
    description: "Verificacion de transponder conforme a regulaciones RAAC 91 y RAAC 43.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Sistema Pitot-Estatico",
    medium: "RAAC 91.411",
    description: "Ensayo de sistemas altimetricos y pitot con equipos calibrados.",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Bases de Datos",
    medium: "Cartografia",
    description: "Actualizacion de GPS, FMS y sistemas TAWS con datos vigentes.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Diagnostico y Reparacion",
    medium: "Laboratorio",
    description: "Pruebas funcionales, calibracion y diagnostico de fallas en sistemas electricos y avionica.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Documentacion Tecnica",
    medium: "Ingenieria",
    description: "Analisis de carga electrica, ICA, informes de ensayo y planos.",
    span: "col-span-1 row-span-1",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-28">
      {/* Section header */}
      <div ref={headerRef} className="mb-12 md:mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Servicios</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-5xl lg:text-7xl tracking-tight">NUESTROS SERVICIOS</h2>
        <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          Soluciones integrales en avionica para la aviacion civil y experimental. Desde instalaciones completas hasta ensayos normativos.
        </p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[220px]"
      >
        {experiments.map((experiment, index) => (
          <WorkCard key={index} experiment={experiment} index={index} persistHover={index === 0} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  experiment,
  index,
  persistHover = false,
}: {
  experiment: {
    title: string
    medium: string
    description: string
    span: string
  }
  index: number
  persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative bg-card border border-border p-5 md:p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        experiment.span,
        isActive && "border-accent shadow-lg",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-accent transition-transform duration-500 origin-left",
        isActive ? "scale-x-100" : "scale-x-0"
      )} />

      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-accent font-semibold bg-accent/10 px-2 py-1">
          {experiment.medium}
        </span>
        <h3
          className={cn(
            "mt-4 font-[var(--font-bebas)] text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {experiment.title}
        </h3>
      </div>

      {/* Description - always visible on mobile, reveals on hover on desktop */}
      <div className="relative z-10 mt-4">
        <p
          className={cn(
            "font-mono text-xs md:text-sm text-foreground/70 leading-relaxed transition-all duration-500",
            "opacity-100 md:opacity-0 md:translate-y-2",
            isActive && "md:opacity-100 md:translate-y-0",
          )}
        >
          {experiment.description}
        </p>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-xs font-semibold transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  )
}
