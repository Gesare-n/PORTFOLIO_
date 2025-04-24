"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import InteractiveLoader from "@/components/loading/interactive-loader"

// Dynamically import components that use browser APIs
const MainExperience = dynamic(() => import("@/components/main-experience"), {
  ssr: false,
})

// Loading messages inspired by sharyap.com
const loadingMessages = [
  "Loading assets...",
  "Initializing neural interface...",
  "Calibrating design parameters...",
  "Rendering 3D environment...",
  "Compiling project data...",
  "Optimizing user experience...",
  "Preparing interactive elements...",
  "Establishing connection...",
]

export default function Home() {
  const [initialized, setInitialized] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])
  const [mounted, setMounted] = useState(false)

  // Handle mounting state to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Loading simulation
  useEffect(() => {
    if (!mounted) return

    let interval

    if (progress < 100) {
      interval = setInterval(() => {
        // Simulate realistic loading with variable speed
        const increment = Math.random() * 3 + 0.5
        setProgress((prev) => {
          const newProgress = Math.min(prev + increment, 100)

          // Update loading message at certain thresholds
          if (newProgress > prev && Math.floor(newProgress / 14) !== Math.floor(prev / 14)) {
            const messageIndex = Math.min(Math.floor(newProgress / 14), loadingMessages.length - 1)
            setLoadingMessage(loadingMessages[messageIndex])
          }

          return newProgress
        })
      }, 100)
    } else {
      // Complete loading after a short delay
      setTimeout(() => {
        setInitialized(true)
      }, 500)
    }

    return () => clearInterval(interval)
  }, [progress, mounted])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return <>{!initialized ? <InteractiveLoader progress={progress} message={loadingMessage} /> : <MainExperience />}</>
}
