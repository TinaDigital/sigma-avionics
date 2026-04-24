"use client"

import Image from "next/image"

const navGroups = [
  {
    title: "Navegacion",
    links: [
      { label: "Inicio", href: "#hero" },
      { label: "Servicios", href: "#signals" },
      { label: "Nosotros", href: "#principles" },
      { label: "Contacto", href: "#colophon" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Instalacion de Avionica", href: "#signals" },
      { label: "Ensayos RAAC", href: "#signals" },
      { label: "Glass Cockpit", href: "#signals" },
      { label: "Bases de Datos", href: "#signals" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "+54 9 11 5498 2223", href: "tel:+5491154982223" },
      { label: "info@sigmaavionics.com.ar", href: "mailto:info@sigmaavionics.com.ar" },
      { label: "Ensenada, La Plata — BA", href: "https://maps.google.com/?q=-34.876984,-57.958714" },
    ],
  },
]

function scrollTo(href: string) {
  if (href.startsWith("#")) {
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  } else {
    window.open(href, href.startsWith("http") ? "_blank" : "_self")
  }
}

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/40 overflow-hidden">
      {/* Top accent line */}
      <div className="rule-accent w-full h-px opacity-50" />

      {/* Subtle background mark */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[300px] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "url('/images/logo-sigma-white.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
        }}
      />

      <div className="relative z-10 px-8 md:px-14 lg:px-28 pt-16 pb-10">
        {/* Top row: logo + nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Image
              src="/images/logo-sigma-white.png"
              alt="Sigma Avionics"
              width={384}
              height={150}
              className="w-[150px] md:w-[165px] h-auto opacity-90"
            />
            <p className="font-light text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              Ingenieria de precision para su cabina. Confianza instalada.
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                ANAC 1B-724
              </span>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground mb-5">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="group relative text-sm text-foreground/60 hover:text-foreground transition-colors duration-200 text-left leading-snug"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Sigma Avionics. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-[10px] text-muted-foreground">
              Aeroclub La Plata Ensenada — Argentina
            </p>
            <span className="hidden md:block w-px h-3 bg-border/60" />
            <a
              href="https://maps.google.com/?q=-34.876984,-57.958714"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-widest"
            >
              34°52&apos;S / 57°57&apos;O
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
