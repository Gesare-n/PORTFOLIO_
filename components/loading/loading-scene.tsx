"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

// Wireframe sphere component inspired by sharyap.com
function WireframeSphere({ progress }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    // Rotation animation
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2

    // Scale based on progress
    const scale = 0.8 + (progress / 100) * 0.4
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, Math.max(1, Math.floor(progress / 20))]} />
      <meshBasicMaterial color="#06b6d4" wireframe={true} transparent={true} opacity={0.3 + (progress / 100) * 0.7} />
    </mesh>
  )
}

export default function LoadingScene({ progress }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <WireframeSphere progress={progress} />

      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade />
    </>
  )
}
