"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

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

      <div className="px-8 md:px-14 2xl:px-20 3xl:px-28 py-16 md:py-20 2xl:py-24">
        <div className="relative mb-12 lg:mb-14">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 10% 50%, oklch(0.52 0.19 252 / 0.07) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-4xl 2xl:max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="rule-accent w-6 opacity-70" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                03 / Contacto
              </span>
            </div>
            <h2 className="font-display font-semibold text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl uppercase leading-[0.95] tracking-tight mb-6">
              Hablemos<br />
              <span className="text-accent">de su</span><br />
              aeronave.
            </h2>
            <p className="text-base 2xl:text-lg text-muted-foreground leading-relaxed max-w-2xl 2xl:max-w-3xl font-light">
              Nuestro equipo tecnico esta listo para asesorarlo. Consultas, presupuestos o visitas a nuestro taller certificado ANAC en Ensenada, La Plata.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border/40 2xl:max-w-[1500px] 2xl:mx-auto">
          {/* ── LEFT — contact rows ── */}
          <div
            ref={leftRef}
            className="relative px-6 md:px-8 py-4 md:py-6 border-b lg:border-b-0 lg:border-r border-border/40"
          >
            <div className="relative z-10 divide-y divide-border/40">
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
          <div ref={rightRef} className="relative flex flex-col">
          {/* Top info strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40 border-b border-border/40 flex-shrink-0">
            {/* ANAC cert */}
            <div className="px-6 md:px-8 py-7 md:py-8 flex flex-col items-center text-center gap-1.5">
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
            <div className="px-6 md:px-8 py-7 md:py-8 flex flex-col items-center text-center gap-2.5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40 border-b border-border/40 flex-shrink-0">
            <a
              href="tel:+5491154982223"
              className="group flex items-center justify-center gap-2 px-6 py-4 md:py-5 font-display font-semibold text-sm uppercase tracking-[0.15em] text-foreground/70 hover:text-accent hover:bg-accent/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
            <a
              href="mailto:info@sigmaavionics.com.ar"
              className="group flex items-center justify-center gap-2 px-6 py-4 md:py-5 font-display font-semibold text-sm uppercase tracking-[0.15em] bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          </div>

          {/* Google map embed */}
          <div className="px-6 md:px-8 py-6 md:py-8">
            <div className="relative w-full overflow-hidden rounded-sm border border-border/40 h-[240px] md:h-[290px] lg:h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5983.789388322374!2d-57.96151101215368!3d-34.87672713908732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDUyJzM3LjEiUyA1N8KwNTcnMzEuNCJX!5e1!3m2!1ses-419!2sar!4v1776999325631!5m2!1ses-419!2sar"
                title="Mapa Aero Club La Plata"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

            {/* Overlay label */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 z-[400] glass-card px-2.5 py-1.5 pointer-events-none">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/70">
                  Aeroclub La Plata Ensenada
                </p>
              </div>

            {/* Open in maps button */}
              <a
                href="https://maps.google.com/?q=-34.876984,-57.958714"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-[400] group flex items-center gap-1.5 glass-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80 hover:text-accent transition-all duration-200"
              >
                Abrir en Maps
                <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
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
