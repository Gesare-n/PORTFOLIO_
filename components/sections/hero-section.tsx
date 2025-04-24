"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dynamically import Three.js components with no SSR
const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
})

export default function HeroSection({ mousePosition }) {
  const containerRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = containerRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      containerRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`
    }

    const handleMouseLeave = () => {
      containerRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"
    }

    const element = containerRef.current
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">{isMounted && <HeroCanvas />}</div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl px-4 transition-transform duration-300 ease-out"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-cyber mb-4 cyber-text text-gradient"
          >
            NICOLE GESARE ONYIEGO
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl mb-8 text-muted-foreground font-mono">
              <span className="command-response">DESIGN // CODE // INNOVATE</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild className="cyber-button">
              <a href="#projects">EXPLORE PROJECTS</a>
            </Button>
            <Button variant="outline" asChild className="cyber-button">
              <a href="#contact">INITIALIZE CONTACT</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="scroll-prompt"
        >
          <ChevronDown className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    </section>
  )
}
