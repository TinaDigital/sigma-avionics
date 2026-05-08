import type { Metadata } from "next"
import Script from "next/script"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Aviation Info Portal | Sigma Avionics",
  description:
    "Portal con informacion aeronautica en tiempo real: mapa, METAR/TAF y futuros modulos de datos operativos.",
}

export default function AviationInfoPortalPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      <div className="grid-bg fixed inset-0 opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 px-6 md:px-12 lg:px-28 pt-28 md:pt-32 pb-16 md:pb-20">
        <section className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-12">
            <div className="flex items-center gap-4 mb-5">
              <div className="rule-accent w-8 opacity-80" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                Aviation Info Portal
              </span>
            </div>
            <h1 className="font-display font-semibold text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-tight">
              Informacion
              <br />
              <span className="text-foreground/30">Aeronautica</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed font-light">
              Esta subpagina centraliza herramientas de consulta operativa. Iremos incorporando mas integraciones API en
              los proximos pasos.
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            <article className="border border-border/40 bg-secondary/30 p-4 md:p-6">
              <h2 className="font-display font-semibold text-2xl md:text-3xl uppercase tracking-wide mb-4">
                Mapa Operativo
              </h2>
              <div className="relative w-full overflow-hidden border border-border/40 h-[55vh] min-h-[380px] max-h-[600px] xl:max-h-[700px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5983.789388322374!2d-57.96151101215368!3d-34.87672713908732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDUyJzM3LjEiUyA1N8KwNTcnMzEuNCJX!5e1!3m2!1ses-419!2sar!4v1776999325631!5m2!1ses-419!2sar"
                  title="Mapa Aeronautico Aero Club La Plata"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </article>

            <article className="border border-border/40 bg-secondary/30 p-4 md:p-6">
              <h2 className="font-display font-semibold text-2xl md:text-3xl uppercase tracking-wide mb-4">
                METAR / TAF
              </h2>
              <div className="min-h-[278px] flex items-start metar-widget">
                <a
                  href="https://metar-taf.com/es/metar/AR-0354?station_id=SADL"
                  id="metartaf-VfoG9wNa"
                  className="block w-full max-w-[640px] min-h-[278px] border border-border/40 bg-background/70 px-4 py-3"
                  style={{ fontSize: "18px", fontWeight: 500, color: "#ffffff", textDecoration: "none" }}
                >
                  METAR Tolosa Airport
                </a>
              </div>
              <Script
                src="https://metar-taf.com/es/embed-js/AR-0354?station_id=SADL&layout=landscape&qnh=hPa&rh=rh&target=VfoG9wNa"
                strategy="afterInteractive"
                crossOrigin="anonymous"
              />
            </article>

            <article className="border border-border/40 bg-secondary/30 p-4 md:p-6">
              <h2 className="font-display font-semibold text-2xl md:text-3xl uppercase tracking-wide mb-4">
                Viento y Pronostico
              </h2>
              <div className="relative w-full overflow-hidden border border-border/40 h-[55vh] min-h-[400px] max-h-[650px] xl:max-h-[750px]">
                <iframe
                  src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=-40.078&lon=-58.447&detailLat=-37.3&detailLon=-58.447&detail=true"
                  title="Windy mapa meteorologico"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </article>

            <article className="border border-border/40 bg-secondary/30 p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 className="font-display font-semibold text-2xl md:text-3xl uppercase tracking-wide">
                  AIP / MADHEL ANAC
                </h2>
                <a
                  href="https://ais.anac.gob.ar/madhel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-accent/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  Abrir en nueva pestana
                </a>
              </div>
              <div className="relative w-full overflow-hidden border border-border/40 h-[70vh] min-h-[500px] max-h-[800px] xl:max-h-[900px]">
                <iframe
                  src="https://ais.anac.gob.ar/madhel/"
                  title="MADHEL Electronico ANAC"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </article>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
