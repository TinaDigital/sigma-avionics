"use client"

import { useState } from "react"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const phoneNumber = "5491154982223"
  const message = encodeURIComponent("Hola, me gustaría consultar sobre sus servicios de aviónica.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60] group"
    >
      {/* Subtle pulse — slower, more transparent */}
      <span className="absolute inset-0 rounded-full bg-white/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-100" />

      {/* Button — muted dark style with subtle green accent */}
      <div
        className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border backdrop-blur-sm transition-all duration-300 ${
          isHovered
            ? "bg-[#25D366]/35 border-[#25D366]/70 scale-110 shadow-lg shadow-[#25D366]/25"
            : "bg-[#25D366]/20 border-[#25D366]/50 shadow-md shadow-[#25D366]/10"
        }`}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
            isHovered ? "fill-white" : "fill-[#25D366]"
          }`}
        >
          <path
            d="M16.004 2.002C8.28 2.002 2.004 8.278 2.004 15.998c0 2.464.644 4.87 1.868 6.99L2 30l7.192-1.884A13.94 13.94 0 0 0 16.004 30c7.72 0 13.996-6.276 13.996-13.998C30 8.278 23.724 2.002 16.004 2.002Zm0 25.598a11.56 11.56 0 0 1-5.896-1.616l-.424-.252-4.376 1.148 1.168-4.264-.276-.44A11.52 11.52 0 0 1 4.404 16c0-6.396 5.204-11.6 11.6-11.6 6.396 0 11.6 5.204 11.6 11.6 0 6.396-5.204 11.6-11.6 11.6Zm6.36-8.684c-.348-.176-2.064-1.02-2.384-1.136-.32-.116-.552-.176-.784.176-.232.348-.9 1.136-1.104 1.372-.204.232-.408.264-.756.088-.348-.176-1.472-.544-2.804-1.732-1.036-.924-1.736-2.064-1.94-2.412-.204-.348-.02-.536.152-.712.156-.156.348-.408.524-.612.176-.204.232-.348.348-.58.116-.232.06-.436-.028-.612-.088-.176-.784-1.892-1.076-2.592-.284-.68-.572-.588-.784-.6-.204-.008-.436-.012-.668-.012-.232 0-.612.088-.932.436-.32.348-1.22 1.192-1.22 2.908s1.248 3.372 1.424 3.604c.176.232 2.46 3.752 5.96 5.264.832.36 1.484.576 1.992.736.836.268 1.6.228 2.2.14.672-.1 2.064-.844 2.356-1.66.288-.816.288-1.516.204-1.66-.088-.148-.32-.232-.668-.408Z"
          />
        </svg>
      </div>

      {/* Tooltip */}
      <div
        className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-background/95 backdrop-blur-sm border border-border/50 text-foreground text-xs font-mono uppercase tracking-wider px-3 py-2 rounded transition-all duration-300 pointer-events-none hidden md:block ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        Chateá con nosotros
      </div>
    </a>
  )
}
