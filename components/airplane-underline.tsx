"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AirplaneUnderlineProps {
  children: React.ReactNode
  className?: string
}

export function AirplaneUnderline({ children, className = "" }: AirplaneUnderlineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !planeRef.current) return

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" })
      gsap.set(planeRef.current, { x: -20, opacity: 0 })

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(planeRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.1
        )
        .to(
          planeRef.current,
          {
            x: "100%",
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.1
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {children}
      <div className="relative h-4 mt-2">
        {/* Line */}
        <div
          ref={lineRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-accent"
        />
        {/* Airplane */}
        <div
          ref={planeRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-accent -rotate-90"
          >
            <path
              d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
