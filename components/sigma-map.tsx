"use client"

import { useEffect, useRef } from "react"

// Sigma Avionics coordinates
const LAT = -34.876984
const LNG = -57.958714
const ZOOM = 14

export function SigmaMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return

      // Fix default icon paths bundled by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      const map = L.map(containerRef.current!, {
        center: [LAT, LNG],
        zoom: ZOOM,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        attributionControl: false,
      })

      // OpenTopoMap — relief / terrain tiles
      L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
      }).addTo(map)

      // Custom accent-colored marker
      const markerIcon = L.divIcon({
        html: `
          <div style="
            width: 36px; height: 36px;
            display: flex; align-items: center; justify-content: center;
          ">
            <div style="
              width: 14px; height: 14px;
              background: oklch(0.52 0.19 252);
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 0 0 3px oklch(0.52 0.19 252 / 0.35), 0 4px 12px rgba(0,0,0,0.4);
            "></div>
          </div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      })

      L.marker([LAT, LNG], { icon: markerIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:monospace;font-size:11px;color:#111;line-height:1.5">
            <strong>SIGMA AVIONICS</strong><br/>
            Aeroclub La Plata Ensenada<br/>
            ANAC 1B-724
          </div>`,
          { maxWidth: 180 }
        )

      // Leaflet attribution minimal
      L.control.attribution({ prefix: false }).addTo(map)

      mapRef.current = map

      // Invalidate size after mount to avoid grey tiles
      setTimeout(() => map.invalidateSize(), 100)
    })

    return () => {
      if (mapRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapRef.current as any).remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: "100%", background: "#1a1f2e" }}
        aria-label="Mapa de ubicacion Sigma Avionics"
      />
    </>
  )
}
