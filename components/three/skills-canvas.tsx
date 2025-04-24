"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"

// Define skill icons with their colors and categories
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

// Create a texture for each skill icon
function createSkillTexture(icon, color, name) {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")

  // Create faceted background
  ctx.fillStyle = "#2a2a2a"
  ctx.beginPath()
  ctx.moveTo(128, 20)
  ctx.lineTo(236, 80)
  ctx.lineTo(236, 176)
  ctx.lineTo(128, 236)
  ctx.lineTo(20, 176)
  ctx.lineTo(20, 80)
  ctx.closePath()
  ctx.fill()

  // Create colored square for the icon
  ctx.fillStyle = color
  ctx.fillRect(64, 64, 128, 128)

  // Add icon text
  ctx.fillStyle = icon === "N" && color === "#000000" ? "#ffffff" : "#000000"
  ctx.font = "bold 80px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(icon, 128, 128)

  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function SkillNode({ position, name, icon, color, category, onHover, isHovered }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState(null)
  const { camera } = useThree()

  // Create texture on mount
  useEffect(() => {
    const newTexture = createSkillTexture(icon, color, name)
    setTexture(newTexture)
  }, [icon, color, name])

  useFrame((state) => {
    if (!meshRef.current) return

    // Make the skill face the camera
    meshRef.current.lookAt(camera.position)

    // Rotation animation
    meshRef.current.rotation.z += 0.002

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + position[0]) * 0.1

    // Scale when hovered
    if (isHovered || hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  if (!texture) return null

  return (
    <group
      position={position}
      onPointerOver={() => {
        setHovered(true)
        onHover(name)
      }}
      onPointerOut={() => {
        setHovered(false)
        onHover(null)
      }}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
          emissive={color}
          emissiveIntensity={isHovered || hovered ? 0.5 : 0.2}
        />
      </mesh>
    </group>
  )
}

function SkillsScene({ activeCategory }) {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const groupRef = useRef()

  // Filter skills based on active category
  const filteredSkills = activeCategory === "All" ? skills : skills.filter((skill) => skill.category === activeCategory)

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation of the entire skill group
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  // Create a 3D arrangement of skills
  const rows = Math.ceil(filteredSkills.length / 5)
  const skillsPositions = filteredSkills.map((_, index) => {
    const row = Math.floor(index / 5)
    const col = index % 5
    const rowOffset = row % 2 === 0 ? 0 : 0.5 // Offset every other row for a more organic look
    return [(col - 2) * 2.5 + rowOffset, (rows / 2 - row) * 2.5, 0]
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6d28d9" />

      <group ref={groupRef}>
        {filteredSkills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            position={skillsPositions[index]}
            name={skill.name}
            icon={skill.icon}
            color={skill.color}
            category={skill.category}
            onHover={setHoveredSkill}
            isHovered={hoveredSkill === skill.name}
          />
        ))}
      </group>

      {hoveredSkill && (
        <Text
          position={[0, -5, 0]}
          color="white"
          fontSize={0.8}
          font="/fonts/Geist_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          {hoveredSkill}
        </Text>
      )}
    </>
  )
}

export default function SkillsCanvas({ activeCategory = "All" }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <SkillsScene activeCategory={activeCategory} />
    </Canvas>
  )
}
