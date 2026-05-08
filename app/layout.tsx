import type React from "react"
import type { Metadata } from "next"
import { Barlow_Condensed, Barlow, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
})
const barlow = Barlow({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
})

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.sigmaavionics.com.ar"),
  title: {
    default: "SIGMA AVIONICS — Ingeniería de Precisión para su Cabina",
    template: "%s | SIGMA AVIONICS",
  },
  description:
    "Soluciones integrales en aviónica, cumplimiento normativo RAAC y tecnología de vanguardia para la aviación civil. Taller Aeronáutico habilitado ANAC 1B-724.",
  keywords: [
    "aviónica",
    "ingeniería aeronáutica",
    "mantenimiento de aeronaves",
    "taller aeronáutico",
    "ANAC 1B-724",
    "RAAC",
    "tecnología de aviación",
    "SIGMA Avionics",
    "La Plata",
    "Argentina"
  ],
  authors: [{ name: "SIGMA Avionics" }],
  creator: "SIGMA Avionics",
  publisher: "SIGMA Avionics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    title: "SIGMA AVIONICS — Ingeniería de Precisión para su Cabina",
    description:
      "Soluciones integrales en aviónica, cumplimiento normativo RAAC y tecnología de vanguardia para la aviación civil. Taller Aeronáutico habilitado ANAC 1B-724.",
    siteName: "SIGMA Avionics",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIGMA Avionics Logo y Taller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIGMA AVIONICS — Ingeniería de Precisión para su Cabina",
    description:
      "Soluciones integrales en aviónica y cumplimiento normativo para la aviación civil.",
    images: ["/og-image.jpg"],
    creator: "@sigmaavionics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo-sigma-blue.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo-sigma-white.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: [
      { url: "/logo-sigma-blue.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo-sigma-white.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/logo-sigma-blue.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo-sigma-white.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-background">
      <body
        className={`${barlowCondensed.variable} ${barlow.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
