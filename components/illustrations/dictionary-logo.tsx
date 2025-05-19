"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DictionaryLogo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the logo after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a simple placeholder with the same dimensions
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" fill="none" />
      </svg>
    )
  }

  const isDark = resolvedTheme === "dark"
  const primaryColor = isDark ? "#a78bfa" : "#8b5cf6"
  const secondaryColor = isDark ? "#4c1d95" : "#c4b5fd"

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <style jsx>{`
        @keyframes pageFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-15deg); }
          100% { transform: rotateY(0deg); }
        }
        .page {
          animation: pageFlip 3s ease-in-out infinite;
          transform-origin: left;
          transform-box: fill-box;
        }
      `}</style>

      {/* Book spine */}
      <path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={secondaryColor}
        fillOpacity="0.2"
      />

      {/* Pages */}
      <g className="page">
        <path d="M8 7h6" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 11h8" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 15h6" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Magnifying glass */}
      <circle cx="16" cy="10" r="2" stroke={primaryColor} strokeWidth="1.5" fill="none" />
      <line x1="17.5" y1="11.5" x2="19" y2="13" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
