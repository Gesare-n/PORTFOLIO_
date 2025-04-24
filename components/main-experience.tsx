"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"
import ThemeSwitcher from "@/components/theme-switcher"
import NavigationMenu from "@/components/navigation-menu"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"

// Dynamically import sections
const HeroSection = dynamic(() => import("@/components/sections/hero-section"), {
  ssr: false,
})
const AboutSection = dynamic(() => import("@/components/sections/about-section"), {
  ssr: false,
})
const SkillsSection = dynamic(() => import("@/components/sections/skills-section"), {
  ssr: false,
})
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section"), {
  ssr: false,
})
const ResumeSection = dynamic(() => import("@/components/sections/resume-section"), {
  ssr: false,
})
const ContactSection = dynamic(() => import("@/components/sections/contact-section"), {
  ssr: false,
})

// Custom cursor component
function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  )
}

export default function MainExperience() {
  const [activeSection, setActiveSection] = useState("home")
  const [showScanline, setShowScanline] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "resume", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Disable scanline effect after 10 seconds for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScanline(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {showScanline && <div className="scanline"></div>}
      <CustomCursor />

      <div className="fixed top-5 right-5 z-50">
        <ThemeSwitcher />
      </div>

      <NavigationMenu activeSection={activeSection} />

      <AnimatePresence mode="wait">
        <HeroSection mousePosition={mousePosition} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </AnimatePresence>

      <Footer />

      <div className="fixed bottom-5 right-5 z-50">
        <ChatbotButton />
      </div>
    </main>
  )
}
