"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function AlternativeProfile() {
  const profileRef = useRef(null)

  return (
    <motion.div
      ref={profileRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-48 h-48 mx-auto mb-8"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 blur-md animate-pulse" />
      <div className="absolute inset-1 rounded-full bg-background" />
      <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-primary">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span className="text-4xl font-cyber text-primary">NG</span>
        </div>
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary animate-ping" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-secondary animate-pulse" />
    </motion.div>
  )
}
