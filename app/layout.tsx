import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SearchProvider } from "@/context/search-context"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { DictionaryLogo } from "@/components/illustrations/dictionary-logo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Dictionary | Britannica Clone",
  description: "A modern, production-ready dictionary app with definitions from Britannica and Merriam-Webster.",
  keywords: ["dictionary", "britannica", "merriam-webster", "definitions", "word of the day", "vocabulary"],
  authors: [
    {
      name: "Esubalew Chekol",
      url: "https://esubalew.et",
    },
  ],
  creator: "Esubalew Chekol",
  publisher: "Esubalew Chekol",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://d.esubalew.et/",
    title: "Modern Dictionary | Britannica Clone",
    description: "A modern, production-ready dictionary app with definitions from Britannica and Merriam-Webster.",
    siteName: "Modern Dictionary",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Dictionary | Britannica Clone",
    description: "A modern, production-ready dictionary app with definitions from Britannica and Merriam-Webster.",
    creator: "@esubaalew",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20'/%3E%3Cpath d='M8 7h6'/%3E%3Cpath d='M8 11h8'/%3E%3Cpath d='M8 15h6'/%3E%3C/svg%3E",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dictionary" />
        <link
          rel="apple-touch-icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180' width='180' height='180'%3E%3Crect width='180' height='180' rx='40' fill='%238b5cf6'/%3E%3Cpath d='M45 140v-100A15 15 0 0 1 60 25h80v130H60a15 15 0 0 1 0-30h80' stroke='white' strokeWidth='10' strokeLinecap='round' strokeLinejoin='round' fill='none'/%3E%3Cpath d='M75 60h40' stroke='white' strokeWidth='8' strokeLinecap='round'/%3E%3Cpath d='M75 90h50' stroke='white' strokeWidth='8' strokeLinecap='round'/%3E%3Cpath d='M75 120h40' stroke='white' strokeWidth='8' strokeLinecap='round'/%3E%3C/svg%3E"
        />

        {/* OpenGraph Image as SVG */}
        <meta
          property="og:image"
          content="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'%3E%3Crect width='1200' height='630' fill='%23f8fafc'/%3E%3Crect x='150' y='100' width='900' height='430' rx='20' fill='%23f1f5f9'/%3E%3Ctext x='600' y='200' fontFamily='Arial, sans-serif' fontSize='60' fontWeight='bold' textAnchor='middle' fill='%238b5cf6'%3EModern Dictionary%3C/text%3E%3Cpath d='M450 300v-80a15 15 0 0 1 15-15h120v160h-120a15 15 0 0 1 0-30h120' stroke='%238b5cf6' strokeWidth='12' strokeLinecap='round' strokeLinejoin='round' fill='none'/%3E%3Cpath d='M480 240h60' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Cpath d='M480 270h80' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Cpath d='M480 300h60' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Ccircle cx='700' cy='280' r='40' stroke='%238b5cf6' strokeWidth='10' fill='none'/%3E%3Cline x1='730' y1='310' x2='760' y2='340' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Ctext x='600' y='450' fontFamily='Arial, sans-serif' fontSize='24' textAnchor='middle' fill='%23475569'%3EDefinitions from Britannica and Merriam-Webster%3C/text%3E%3C/svg%3E"
        />
        <meta
          property="twitter:image"
          content="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'%3E%3Crect width='1200' height='630' fill='%23f8fafc'/%3E%3Crect x='150' y='100' width='900' height='430' rx='20' fill='%23f1f5f9'/%3E%3Ctext x='600' y='200' fontFamily='Arial, sans-serif' fontSize='60' fontWeight='bold' textAnchor='middle' fill='%238b5cf6'%3EModern Dictionary%3C/text%3E%3Cpath d='M450 300v-80a15 15 0 0 1 15-15h120v160h-120a15 15 0 0 1 0-30h120' stroke='%238b5cf6' strokeWidth='12' strokeLinecap='round' strokeLinejoin='round' fill='none'/%3E%3Cpath d='M480 240h60' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Cpath d='M480 270h80' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Cpath d='M480 300h60' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Ccircle cx='700' cy='280' r='40' stroke='%238b5cf6' strokeWidth='10' fill='none'/%3E%3Cline x1='730' y1='310' x2='760' y2='340' stroke='%238b5cf6' strokeWidth='10' strokeLinecap='round'/%3E%3Ctext x='600' y='450' fontFamily='Arial, sans-serif' fontSize='24' textAnchor='middle' fill='%23475569'%3EDefinitions from Britannica and Merriam-Webster%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SearchProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="container flex h-14 items-center justify-between">
                  <a href="/" className="flex items-center gap-2">
                    <DictionaryLogo className="h-6 w-6" />
                    <span className="font-semibold">Modern Dictionary</span>
                  </a>
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1">
                <Suspense>{children}</Suspense>
              </main>
              <Footer />
            </div>
          </SearchProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
