"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"

// Dynamically import 3D components
const LoadingScene = dynamic(() => import("@/components/loading/loading-scene"), {
  ssr: false,
  loading: () => <LoadingFallback />,
})

// Fallback loading indicator
function LoadingFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

const loadingMessages = [
  "Initializing neural interface...",
  "Loading creative modules...",
  "Calibrating design parameters...",
  "Establishing connection to portfolio...",
  "Rendering 3D environment...",
  "Compiling project data...",
  "Optimizing user experience...",
  "Preparing interactive elements...",
]

export default function InitializationScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Progress bar animation with variable speed
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach completion
        const increment = prev < 70 ? 1 : prev < 90 ? 0.5 : 0.2

        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, 50)

    // Cycling through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    // Complete initialization after animation
    const completionTimer = setTimeout(() => {
      onComplete()
    }, 6000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(completionTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-[#050816] flex flex-col items-center justify-center z-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="network-lines">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="network-line"
              style={{
                top: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-[60vh] relative">
        <Canvas ref={canvasRef}>
          <LoadingScene progress={progress} />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-8 w-full max-w-md px-4 z-10"
      >
        <h1 className="text-2xl md:text-3xl font-cyber mb-2 text-[#06b6d4]">SYSTEM INITIALIZATION</h1>
        <div className="h-12">
          <p className="text-primary command-line">{loadingMessages[messageIndex]}</p>
        </div>
      </motion.div>

      <div className="w-64 md:w-96 mb-4 bg-gray-800 rounded-sm overflow-hidden">
        <motion.div
          className="h-1 bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 background-animate"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center space-x-2 text-sm text-[#06b6d4]">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
        <p className="font-mono">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
