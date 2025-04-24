"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import * as THREE from "three"

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

function SkillIcon({ position, name, icon, color, onHover, isHovered }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5

      if (isHovered) {
        meshRef.current.scale.set(1.2, 1.2, 1.2)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  return (
    <group position={position} onPointerOver={() => onHover(name)} onPointerOut={() => onHover(null)}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.8} />
        <Html position={[0, 0, 0.5]} center>
          <div className="text-white text-lg font-bold">{icon}</div>
        </Html>
      </mesh>
    </group>
  )
}

function SkillsScene() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Create a grid layout for skills
  const skillsPositions = skills.map((_, index) => {
    const row = Math.floor(index / 5)
    const col = index % 5
    return [col * 2.5 - 5, row * 2.5 - 2, 0]
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {skills.map((skill, index) => (
        <SkillIcon
          key={skill.name}
          position={skillsPositions[index]}
          name={skill.name}
          icon={skill.icon}
          color={skill.color}
          onHover={setHoveredSkill}
          isHovered={hoveredSkill === skill.name}
        />
      ))}

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

export default function SkillsCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <SkillsScene />
    </Canvas>
  )
}
