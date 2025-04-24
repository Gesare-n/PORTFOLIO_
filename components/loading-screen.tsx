"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Nicole Gesare Onyiego</h1>
        <p className="text-xl text-center text-purple-400">Game Developer | Artist | Web Developer</p>
      </motion.div>

      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <p className="text-white text-lg">{progress < 100 ? "Loading assets..." : "Initializing experience..."}</p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: progress === 100 ? 1 : 0,
          y: progress === 100 ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <p className="text-purple-400 text-center">Welcome to my interactive portfolio</p>
      </motion.div>
    </div>
  )
}
