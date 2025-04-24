"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Wireframe sphere component inspired by Bruno Imbrizi and sharyap.com
function WireframeSphere({ progress }) {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)

  // Create geometry with more detail as loading progresses
  const detail = Math.max(1, Math.floor(progress / 20)) // 1-5 detail levels based on progress

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    // Rotation animation
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2

    // Scale based on hover and progress
    const targetScale = hover ? 1.1 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05)

    // Opacity based on progress
    if (meshRef.current.material) {
      meshRef.current.material.opacity = 0.3 + (progress / 100) * 0.7
    }
  })

  return (
    <mesh ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <icosahedronGeometry args={[1.5, detail]} />
      <meshBasicMaterial color="#06b6d4" wireframe={true} transparent={true} opacity={0.5} />
    </mesh>
  )
}

// Particles that respond to loading progress
function ParticleField({ progress }) {
  const particlesRef = useRef()
  const count = Math.floor(50 + (progress / 100) * 200) // More particles as loading progresses

  // Generate particles
  const particles = Array.from({ length: count }, (_, i) => {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const radius = 3 + Math.random() * 10

    return {
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ],
      size: Math.random() * 0.05 + 0.01,
    }
  })

  useFrame(({ clock }) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#6d28d9" : i % 3 === 1 ? "#06b6d4" : "#ec4899"}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// 3D scene for the loading screen
function LoadingScene({ progress }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <WireframeSphere progress={progress} />
      <ParticleField progress={progress} />
    </>
  )
}

export default function InteractiveLoader({ progress, message }) {
  return (
    <div className="fixed inset-0 bg-[#050816] z-50 flex flex-col items-center justify-center">
      <div className="w-full h-[60vh]">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <LoadingScene progress={progress} />
        </Canvas>
      </div>

      <div className="text-center z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-cyber mb-4 text-[#06b6d4]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          LOADING
        </motion.h2>

        <div className="w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex items-center justify-center space-x-3 text-[#06b6d4] font-mono">
          <div className="animate-spin h-4 w-4 border-2 border-[#06b6d4] rounded-full border-t-transparent"></div>
          <p className="text-sm">INITIALIZING... {Math.round(progress)}%</p>
        </div>

        <p className="text-[#06b6d4]/70 text-sm mt-2 font-mono">{message}</p>
      </div>
    </div>
  )
}
