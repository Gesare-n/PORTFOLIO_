"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Stars } from "@react-three/drei"
import * as THREE from "three"
import InteractiveParticles from "./interactive-particles"

function FloatingText({ position, text, color = "#ffffff", rotation = [0, 0, 0] }) {
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (textRef.current) {
      // Floating animation
      textRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.1

      // Rotation animation
      textRef.current.rotation.y = rotation[1] + Math.sin(clock.getElapsedTime() * 0.3) * 0.1

      // Scale when hovered
      if (hovered) {
        textRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
      } else {
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      rotation={rotation}
      color={color}
      fontSize={0.5}
      font="/fonts/Geist_Bold.json"
      anchorX="center"
      anchorY="middle"
      maxWidth={2}
      lineHeight={1.2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {text}
    </Text>
  )
}

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
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    // Use fallback texture immediately
    const fallbackTexture = createFallbackTexture()
    setTexture(fallbackTexture)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    // Rotation animation
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1

    // Scale when hovered
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  if (!texture) return null

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <circleGeometry args={[2, 64]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
        opacity={0.9}
        emissive="#6d28d9"
        emissiveIntensity={hovered ? 0.5 : 0.3}
      />
    </mesh>
  )
}

function WireframeSphere() {
  const sphereRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!sphereRef.current) return

    // Rotation animation
    sphereRef.current.rotation.y = clock.getElapsedTime() * 0.05
    sphereRef.current.rotation.z = clock.getElapsedTime() * 0.03

    // Scale when hovered
    if (hovered) {
      sphereRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1)
    } else {
      sphereRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <mesh
      ref={sphereRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ringGeometry args={[2.1, 2.3, 64]} />
      <meshBasicMaterial color="#06b6d4" wireframe={true} transparent={true} opacity={0.3} />
    </mesh>
  )
}

function CameraController() {
  const { camera, mouse } = useThree()
  const initialPosition = useMemo(() => new THREE.Vector3(0, 0, 10), [])

  useFrame(() => {
    // Subtle camera movement based on mouse position
    camera.position.x = initialPosition.x + mouse.x * 0.5
    camera.position.y = initialPosition.y + mouse.y * 0.5

    // Always look at center
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroCanvas() {
  const [mousePosition, setMousePosition] = useState([0, 0])

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition([x, y])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <Canvas dpr={[1, 2]} style={{ background: "transparent" }}>
      <CameraController />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6d28d9" />

      <WireframeSphere />
      <ProfileSphere />
      <InteractiveParticles count={500} mouse={mousePosition} />

      <FloatingText position={[3, 2, 0]} text="Game Developer" color="#a855f7" />
      <FloatingText position={[-3, 2, 0]} text="Artist" color="#06b6d4" />
      <FloatingText position={[0, -2.5, 0]} text="Web Developer" color="#ec4899" />

      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade />
    </Canvas>
  )
}
