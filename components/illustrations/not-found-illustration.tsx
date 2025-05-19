"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function NotFoundIllustration() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the illustration after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const primaryColor = isDark ? "#a78bfa" : "#8b5cf6"
  const secondaryColor = isDark ? "#4c1d95" : "#c4b5fd"
  const bgColor = isDark ? "#1a1a2e" : "#f5f7ff"
  const textColor = isDark ? "#e2e8f0" : "#1e293b"
  const accentColor = isDark ? "#8a8aaa" : "#cbd5e1"

  return (
    <div className="w-full h-64 md:h-80 relative">
      <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          @keyframes searchAnimation {
            0% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(10px) rotate(5deg); }
            50% { transform: translateX(0) rotate(0deg); }
            75% { transform: translateX(-10px) rotate(-5deg); }
            100% { transform: translateX(0) rotate(0deg); }
          }
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          .book-float {
            animation: float 6s ease-in-out infinite;
          }
          .magnifier {
            animation: searchAnimation 3s ease-in-out infinite;
            transform-origin: 70% 70%;
            transform-box: fill-box;
          }
          .question-mark {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>

        {/* Background */}
        <rect width="600" height="400" rx="20" fill={bgColor} />

        {/* Floating book */}
        <g className="book-float">
          <rect x="200" y="100" width="200" height="150" rx="8" fill={accentColor} />
          <rect x="210" y="110" width="180" height="130" rx="4" fill={isDark ? "#2a2a3a" : "#f8fafc"} />
          <rect x="230" y="130" width="140" height="10" rx="2" fill={accentColor} />
          <rect x="230" y="150" width="100" height="10" rx="2" fill={accentColor} />
          <rect x="230" y="170" width="120" height="10" rx="2" fill={accentColor} />
          <rect x="230" y="190" width="80" height="10" rx="2" fill={accentColor} />
          <rect x="230" y="210" width="110" height="10" rx="2" fill={accentColor} />
        </g>

        {/* Magnifying glass */}
        <g className="magnifier">
          <circle cx="400" cy="200" r="40" stroke={primaryColor} strokeWidth="8" fill="none" />
          <line x1="430" y1="230" x2="470" y2="270" stroke={primaryColor} strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Question marks */}
        <text x="150" y="150" className="question-mark" fill={primaryColor} fontSize="40" fontWeight="bold">
          ?
        </text>
        <text
          x="450"
          y="120"
          className="question-mark"
          fill={primaryColor}
          fontSize="30"
          fontWeight="bold"
          style={{ animationDelay: "0.5s" }}
        >
          ?
        </text>
        <text
          x="120"
          y="250"
          className="question-mark"
          fill={primaryColor}
          fontSize="50"
          fontWeight="bold"
          style={{ animationDelay: "1s" }}
        >
          ?
        </text>
        <text
          x="480"
          y="220"
          className="question-mark"
          fill={primaryColor}
          fontSize="35"
          fontWeight="bold"
          style={{ animationDelay: "1.5s" }}
        >
          ?
        </text>

        {/* 404 text */}
        <text x="300" y="350" fill={textColor} fontSize="60" fontWeight="bold" textAnchor="middle">
          404
        </text>
      </svg>
    </div>
  )
}
