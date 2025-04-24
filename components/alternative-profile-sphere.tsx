"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Create a fallback texture with initials
function createFallbackTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext("2d")

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 512, 512)
  gradient.addColorStop(0, "#6d28d9")
  gradient.addColorStop(1, "#06b6d4")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 512)

  // Add text
  ctx.fillStyle = "white"
  ctx.font = "bold 120px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("NGO", 256, 256)

  // Create texture from canvas
  const newTexture = new THREE.CanvasTexture(canvas)
  newTexture.colorSpace = THREE.SRGBColorSpace
  return newTexture
}

function ProfileSphere() {
  const meshRef = useRef()
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    // Use fallback texture immediately
    const fallbackTexture = createFallbackTexture()
    setTexture(fallbackTexture)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
  })

  if (!texture) return null

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[1.5, 64]} />
      <meshStandardMaterial map={texture} transparent={true} opacity={0.9} emissive="#6d28d9" emissiveIntensity={0.3} />
    </mesh>
  )
}

function WireframeSphere() {
  const sphereRef = useRef()

  useFrame(({ clock }) => {
    if (!sphereRef.current) return
    sphereRef.current.rotation.y = clock.getElapsedTime() * 0.05
    sphereRef.current.rotation.z = clock.getElapsedTime() * 0.03
  })

  return (
    <mesh ref={sphereRef}>
      <ringGeometry args={[1.6, 1.8, 64]} />
      <meshBasicMaterial color="#06b6d4" wireframe={true} transparent={true} opacity={0.3} />
    </mesh>
  )
}

export default function AlternativeProfileSphere() {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <WireframeSphere />
        <ProfileSphere />
      </Canvas>
    </div>
  )
}
