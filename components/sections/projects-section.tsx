"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Gamepad2Icon as GameController2, Code, Database, Cpu } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Project-specific 3D models
function IoTModel({ hovered }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5

    // Scale when hovered
    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      {/* CPU/Microcontroller */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#2a9d8f" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sensors */}
      <mesh position={[-0.6, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#e76f51" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[0.6, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#e76f51" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#a8dadc" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* LED */}
      <mesh position={[0, 0.15, 0.6]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={hovered ? 2 : 1} />
      </mesh>
    </group>
  )
}

function WebDevModel({ hovered }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5

    // Scale when hovered
    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Monitor */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial color="#2b2d42" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.2, 0.06]}>
        <boxGeometry args={[1.3, 0.8, 0.01]} />
        <meshStandardMaterial color="#8d99ae" emissive="#8d99ae" emissiveIntensity={hovered ? 0.5 : 0.2} />
      </mesh>

      {/* Stand */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#2b2d42" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        <meshStandardMaterial color="#2b2d42" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}

function GameDevModel({ hovered }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5

    // Scale when hovered
    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Game Controller */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.8]} />
        <meshStandardMaterial color="#5e60ce" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Left Joystick */}
      <mesh position={[-0.5, 0.2, 0.2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Right Joystick */}
      <mesh position={[0.5, 0.2, 0.2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Buttons */}
      <mesh position={[0.7, 0.2, -0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#ff5a5f" emissive="#ff5a5f" emissiveIntensity={hovered ? 1 : 0.5} />
      </mesh>

      <mesh position={[0.5, 0.2, -0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#3a86ff" emissive="#3a86ff" emissiveIntensity={hovered ? 1 : 0.5} />
      </mesh>
    </group>
  )
}

function SoftwareModel({ hovered }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5

    // Scale when hovered
    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Database cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.6, 32]} />
        <meshStandardMaterial color="#457b9d" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Top ring */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.7, 0.05, 16, 32]} />
        <meshStandardMaterial color="#1d3557" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Bottom ring */}
      <mesh position={[0, -0.3, 0]}>
        <torusGeometry args={[0.7, 0.05, 16, 32]} />
        <meshStandardMaterial color="#1d3557" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Data lines */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.01, 32, 1, true]} />
        <meshStandardMaterial
          color="#a8dadc"
          wireframe={true}
          emissive="#a8dadc"
          emissiveIntensity={hovered ? 1 : 0.5}
        />
      </mesh>
    </group>
  )
}

// Project Card with 3D Model
function Project3DCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  // Choose the appropriate 3D model based on project category
  const getProjectModel = () => {
    switch (project.category) {
      case "IoT":
        return <IoTModel hovered={hovered} />
      case "Web":
        return <WebDevModel hovered={hovered} />
      case "Game":
        return <GameDevModel hovered={hovered} />
      case "Software":
        return <SoftwareModel hovered={hovered} />
      default:
        return <WebDevModel hovered={hovered} />
    }
  }

  // Get the appropriate icon based on project category
  const getCategoryIcon = () => {
    switch (project.category) {
      case "IoT":
        return <Cpu className="h-5 w-5 text-primary" />
      case "Web":
        return <Code className="h-5 w-5 text-primary" />
      case "Game":
        return <GameController2 className="h-5 w-5 text-primary" />
      case "Software":
        return <Database className="h-5 w-5 text-primary" />
      default:
        return <Code className="h-5 w-5 text-primary" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="h-full overflow-hidden project-card cyber-border p-[1px]">
        <div className="h-48 overflow-hidden">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            {getProjectModel()}
          </Canvas>
        </div>
        <CardHeader className="bg-card">
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">{project.title}</CardTitle>
            {getCategoryIcon()}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-mono">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="bg-card">
          <CardDescription className="text-sm font-mono">{project.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 bg-card">
          {project.links.github && (
            <Button variant="outline" size="sm" asChild className="cyber-button">
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {project.links.live && (
            <Button size="sm" asChild className="cyber-button">
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {project.links.gameplay && (
            <Button size="sm" asChild className="cyber-button">
              <a href={project.links.gameplay} target="_blank" rel="noopener noreferrer">
                <GameController2 className="h-4 w-4 mr-2" />
                Gameplay
              </a>
            </Button>
          )}
          {project.links.presentation && (
            <Button variant="outline" size="sm" asChild className="cyber-button">
              <a href={project.links.presentation} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Presentation
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Web", "Game", "IoT", "Software"]

  const projects = [
    {
      id: 1,
      title: "Douse: Autonomous Fire Suppression",
      description:
        "Designed and implemented an automated fire suppression system using IoT technologies to detect and suppress fires in real time.",
      links: {
        presentation: "https://www.canva.com/design/DAGjqQO2U7M/GcKq8xIad-zmTUjGkJGy1A/edit",
        paper: "https://drive.google.com/file/d/1oDuvhuteOLcCFzRdMrX7LqHNhpLOgYXI/view?usp=sharing",
        github: null,
        live: null,
      },
      tags: ["IoT", "Engineering", "Hardware"],
      category: "IoT",
    },
    {
      id: 2,
      title: "Project Management System",
      description:
        "This app is designed to help administrators, students, and instructors streamline and enhance their performance throughout the project development process.",
      links: {
        github: "https://github.com/Gesare-n/moringa-school-mgmt",
        live: "https://66bdd80c0f4773ae207ec798--famous-pavlova-721275.netlify.app/",
        presentation: null,
        paper: null,
      },
      tags: ["React", "JavaScript", "Web Development"],
      category: "Web",
    },
    {
      id: 3,
      title: "Afyalink - CLI Application",
      description:
        "Created a command-line interface application to monitor and manage health data for diabetes patients, improving health data tracking and patient care.",
      links: {
        github: "https://github.com/Gesare-n/AFYALINK_APP",
        live: null,
        presentation: null,
        paper: null,
      },
      tags: ["Python", "CLI", "Healthcare"],
      category: "Software",
    },
    {
      id: 4,
      title: "E-commerce Website - Game Haven",
      description:
        "Developed an online platform for purchasing games, featuring a user-friendly interface and secure payment system.",
      links: {
        github: "https://github.com/Gesare-n/Game-Haven",
        live: null,
        presentation: null,
        paper: null,
      },
      tags: ["Web Development", "E-commerce", "JavaScript"],
      category: "Web",
    },
    {
      id: 5,
      title: "Chanjo Health",
      description:
        "Developed an application ensuring every child's immunization is up-to-date through a robust SMS notification system.",
      links: {
        github: "https://github.com/Gesare-n/Immunization-App",
        live: null,
        presentation: null,
        paper: null,
      },
      tags: ["Healthcare", "Mobile", "SMS"],
      category: "Software",
    },
    {
      id: 6,
      title: "Car Rental Platform",
      description:
        "Built an app that simplifies car renting for business owners and individuals, featuring a user-friendly interface and efficient booking system.",
      links: {
        github: "https://github.com/Gesare-n/Car-Renting-Platform",
        live: null,
        presentation: null,
        paper: null,
      },
      tags: ["Web Development", "Booking System", "JavaScript"],
      category: "Web",
    },
    {
      id: 7,
      title: "Skyglide Adventure",
      description: "An endless runner game where players navigate through obstacles in a dynamic environment.",
      links: {
        live: "https://n-gesare-o.itch.io/skyglide-adventure",
        github: null,
        presentation: null,
        paper: null,
      },
      tags: ["Unity", "C#", "Game Development"],
      category: "Game",
    },
    {
      id: 8,
      title: "Roller Splat",
      description: "A puzzle game where players control a ball to paint all the tiles in each level.",
      links: {
        github: "https://github.com/Gesare-n/-Roller-Splat---/tree/main",
        gameplay: "https://drive.google.com/file/d/1iuU32S5jGQWN_a1n2G6cPzVV8uKnlDBR/view?usp=sharing",
        presentation: null,
        paper: null,
      },
      tags: ["Unity", "C#", "Game Development"],
      category: "Game",
    },
  ]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="py-20 bg-muted/10 cyber-grid">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-cyber mb-4 cyber-text">PROJECT_DATABASE</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            <span className="command-line">EXECUTING project_showcase.render()</span>
          </p>
        </motion.div>

        <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5 cyber-border p-[1px]">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="font-mono">
                {category.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Project3DCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
