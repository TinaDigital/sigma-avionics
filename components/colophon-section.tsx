"use client"

import { useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Load map only on client — avoids SSR window errors and iframe scroll bugs
const SigmaMap = dynamic(
  () => import("@/components/sigma-map").then((m) => m.SigmaMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-muted/30 animate-pulse" /> }
)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
      gsap.from(rightRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative bg-secondary/40 overflow-hidden"
    >
      <div className="rule-accent w-full h-px opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT — headline + contact rows ── */}
        <div
          ref={leftRef}
          className="relative flex flex-col justify-between px-8 md:px-14 py-16 md:py-20"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 10% 50%, oklch(0.52 0.19 252 / 0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="rule-accent w-6 opacity-70" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                03 / Contacto
              </span>
            </div>

            <h2 className="font-display font-semibold text-5xl md:text-6xl xl:text-7xl uppercase leading-[0.95] tracking-tight mb-8">
              Hablemos<br />
              <span className="text-accent">de su</span><br />
              aeronave.
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed max-w-sm font-light">
              Nuestro equipo tecnico esta listo para asesorarlo. Consultas, presupuestos o visitas a nuestro taller certificado ANAC en Ensenada, La Plata.
            </p>
          </div>

          <div className="relative z-10 mt-12 divide-y divide-border/40">
            <ContactRow
              icon={<Phone className="w-4 h-4" />}
              label="Telefono"
              value="+54 9 11 5498 2223"
              href="tel:+5491154982223"
              sub="WhatsApp disponible"
            />
            <ContactRow
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value="info@sigmaavionics.com.ar"
              href="mailto:info@sigmaavionics.com.ar"
              sub="Respuesta en 24 hs"
            />
            <ContactRow
              icon={<MapPin className="w-4 h-4" />}
              label="Ubicacion"
              value="Diagonal 74 y Av. R. Balbín"
              href="https://maps.google.com/?q=-34.876984,-57.958714"
              sub="Ensenada, La Plata — Buenos Aires"
            />
            <ContactRow
              icon={<Clock className="w-4 h-4" />}
              label="Horarios"
              value="Lunes a Viernes, 09 – 18 hs"
              sub="Sabados con cita previa"
            />
          </div>
        </div>

        {/* ── RIGHT — cert + coords + map ── */}
        <div
          ref={rightRef}
          className="relative flex flex-col border-t lg:border-t-0 lg:border-l border-border/40"
        >
          {/* Top info strip */}
          <div className="grid grid-cols-2 divide-x divide-border/40 border-b border-border/40 flex-shrink-0">
            {/* ANAC cert */}
            <div className="px-8 py-8 flex flex-col gap-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                Habilitacion ANAC
              </p>
              <p className="font-display font-semibold text-4xl text-accent tracking-tight leading-none mt-1">
                1B-724
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-2 leading-relaxed">
                Taller Aeronautico<br />de Reparacion
              </p>
            </div>

            {/* Coordinates block */}
            <div className="px-8 py-8 flex flex-col gap-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                Coordenadas GPS
              </p>
              <div className="space-y-1">
                <p className="font-mono text-sm text-foreground/80">
                  34° 52&apos; 37.1&quot; S
                </p>
                <p className="font-mono text-sm text-foreground/80">
                  57° 57&apos; 31.4&quot; O
                </p>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">
                Elev. 6 m / 20 ft
              </p>
            </div>
          </div>

          {/* CTA row */}
          <div className="grid grid-cols-2 divide-x divide-border/40 border-b border-border/40 flex-shrink-0">
            <a
              href="tel:+5491154982223"
              className="group flex items-center justify-center gap-2 px-6 py-5 font-display font-semibold text-sm uppercase tracking-[0.15em] text-foreground/70 hover:text-accent hover:bg-accent/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
            <a
              href="mailto:info@sigmaavionics.com.ar"
              className="group flex items-center justify-center gap-2 px-6 py-5 font-display font-semibold text-sm uppercase tracking-[0.15em] bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          </div>

          {/* Relief map — fills remaining space, isolated from GSAP */}
          <div className="relative flex-1" style={{ minHeight: "320px" }}>
            <SigmaMap />

            {/* Overlay label */}
            <div className="absolute top-4 left-4 z-[400] glass-card px-3 py-2 pointer-events-none">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/70">
                Aeroclub La Plata Ensenada
              </p>
            </div>

            {/* Open in maps button */}
            <a
              href="https://maps.google.com/?q=-34.876984,-57.958714"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-[400] group flex items-center gap-2 glass-card px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground/80 hover:text-accent transition-all duration-200"
            >
              Abrir en Maps
              <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  sub?: string
}) {
  const inner = (
    <div className="group flex items-center gap-4 py-5 transition-colors duration-200 hover:bg-white/[0.02]">
      <div className="w-9 h-9 flex items-center justify-center bg-accent/10 text-accent flex-shrink-0 transition-colors duration-200 group-hover:bg-accent/20">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-0.5">
          {label}
        </p>
        <p className="font-display font-medium text-base text-foreground truncate group-hover:text-accent transition-colors duration-200">
          {value}
        </p>
        {sub && (
          <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{sub}</p>
        )}
      </div>
      {href && (
        <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
      )}
    </div>
  )

  if (href) {
    const isExternal = href.startsWith("http")
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    )
  }
  return <div>{inner}</div>
}
