"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

// Import skills data
const skills = [
  { name: "JavaScript", icon: "JS", color: "#f7df1e", category: "Software Development" },
  { name: "TypeScript", icon: "TS", color: "#3178c6", category: "Software Development" },
  { name: "Python", icon: "PY", color: "#3776ab", category: "Software Development" },
  { name: "React", icon: "⚛️", color: "#61dafb", category: "Software Development" },
  { name: "Next.js", icon: "N", color: "#000000", category: "Software Development" },
  { name: "Node.js", icon: "N", color: "#339933", category: "Software Development" },
  { name: "HTML", icon: "H", color: "#e34f26", category: "Software Development" },
  { name: "CSS", icon: "C", color: "#1572b6", category: "Software Development" },
  { name: "SQL", icon: "S", color: "#4479a1", category: "Software Development" },
  { name: "Flask", icon: "F", color: "#000000", category: "Software Development" },
  { name: "C#", icon: "C#", color: "#239120", category: "Game Development" },
  { name: "Unity", icon: "U", color: "#000000", category: "Game Development" },
  { name: "SolidWorks", icon: "SW", color: "#ff0000", category: "CAD" },
  { name: "AutoCAD", icon: "AC", color: "#0696d7", category: "CAD" },
  { name: "Figma", icon: "F", color: "#f24e1e", category: "Design" },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Software Development", "Game Development", "CAD", "Design"]

  const filteredSkills = activeCategory === "All" ? skills : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-cyber mb-4 cyber-text">SKILL_MATRIX</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            <span className="command-line">
              My multidisciplinary toolkit spans software development, game design, and engineering
            </span>
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer text-sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-4 text-center skill-card"
              style={{ backgroundColor: `${skill.color}10` }}
            >
              <div
                className="w-16 h-16 mx-auto mb-2 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: skill.color }}
              >
                <span className="text-white font-bold text-xl">{skill.icon}</span>
              </div>
              <h3 className="text-white font-medium">{skill.name}</h3>
              <p className="text-xs text-gray-400">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
