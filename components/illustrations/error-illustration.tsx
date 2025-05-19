"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ErrorIllustration() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the illustration after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const primaryColor = isDark ? "#a78bfa" : "#8b5cf6"
  const errorColor = isDark ? "#ef4444" : "#dc2626"
  const warningColor = isDark ? "#fbbf24" : "#f59e0b"
  const bgColor = isDark ? "#1a1a2e" : "#f5f7ff"
  const textColor = isDark ? "#e2e8f0" : "#1e293b"
  const accentColor = isDark ? "#4a4a6a" : "#e2e8f0"
  const accentColor2 = isDark ? "#8a8aaa" : "#cbd5e1"

  return (
    <div className="w-full h-64 md:h-80 relative">
      <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <style jsx>{`
          @keyframes shake {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-5px, 0) rotate(-5deg); }
            50% { transform: translate(0, 0) rotate(0deg); }
            75% { transform: translate(5px, 0) rotate(5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .book {
            animation: shake 0.5s ease-in-out infinite;
          }
          .error-text {
            animation: blink 2s ease-in-out infinite;
          }
          .error-cloud {
            animation: float 4s ease-in-out infinite;
          }
        `}</style>

        {/* Background */}
        <rect width="600" height="400" rx="20" fill={bgColor} />

        {/* Error cloud */}
        <g className="error-cloud">
          <path
            d="M300 120 C340 80 400 100 420 140 C460 130 500 160 480 200 C500 240 460 270 420 260 C400 300 340 320 300 280 C260 320 200 300 180 260 C140 270 100 240 120 200 C100 160 140 130 180 140 C200 100 260 80 300 120 Z"
            fill={isDark ? "#2a2a3a" : "#e2e8f0"}
            stroke={accentColor}
            strokeWidth="4"
          />
        </g>

        {/* Book with error */}
        <g className="book">
          <rect x="220" y="160" width="160" height="120" rx="8" fill={accentColor} />
          <rect x="230" y="170" width="140" height="100" rx="4" fill={isDark ? "#2a2a3a" : "#f8fafc"} />
          <text
            x="300"
            y="220"
            className="error-text"
            fill={errorColor}
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
          >
            ERROR
          </text>
          <line x1="260" y1="240" x2="340" y2="240" stroke={accentColor2} strokeWidth="4" />
          <line x1="270" y1="250" x2="330" y2="250" stroke={accentColor2} strokeWidth="4" />
        </g>

        {/* Lightning bolts */}
        <path
          d="M200 140 L210 170 L190 180 L200 210"
          stroke={warningColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M400 140 L390 170 L410 180 L400 210"
          stroke={warningColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Error message */}
        <text x="300" y="320" fill={textColor} fontSize="24" fontWeight="bold" textAnchor="middle">
          Something went wrong!
        </text>
      </svg>
    </div>
  )
}
