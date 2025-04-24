"use client"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Dynamically import Three.js components with no SSR
const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="loader"></div>
    </div>
  ),
})

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen">
      <ThreeScene />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Nicole Gesare Onyiego</h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Mechatronics Engineering Student & Multidisciplinary Creator
          </p>
          <div className="flex justify-center space-x-4 pointer-events-auto">
            <Button asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
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
