import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CursorGlow from "@/components/cursor-glow"
import NoiseOverlay from "@/components/noise-overlay"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Nicole Gesare Onyiego | Multidisciplinary Creator",
  description:
    "Game developer, artist, and web developer portfolio showcasing projects in IoT, game development, and web design.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetBrainsMono.variable} font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="cyberpunk" enableSystem disableTransitionOnChange>
          <NoiseOverlay />
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
