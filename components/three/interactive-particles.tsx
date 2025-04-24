"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// Inspired by Bruno Imbrizi's particle work
export default function InteractiveParticles({ count = 1000, mouse }) {
  const mesh = useRef()
  const { viewport } = useThree()

  // Create particles with initial positions
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10

      // Random color from our palette
      const color =
        i % 3 === 0 ? new THREE.Color("#6d28d9") : i % 3 === 1 ? new THREE.Color("#06b6d4") : new THREE.Color("#ec4899")

      temp.push({ x, y, z, color, originalX: x, originalY: y, originalZ: z })
    }
    return temp
  }, [count])

  // Create geometry and attributes
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x
      positions[i * 3 + 1] = particles[i].y
      positions[i * 3 + 2] = particles[i].z

      colors[i * 3] = particles[i].color.r
      colors[i * 3 + 1] = particles[i].color.g
      colors[i * 3 + 2] = particles[i].color.b
    }

    return [positions, colors]
  }, [count, particles])

  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return

    // Update positions based on time and mouse
    const positions = mesh.current.geometry.attributes.position.array
    const time = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Get normalized mouse position
      const mouseX = (mouse.x * viewport.width) / 2
      const mouseY = (mouse.y * viewport.height) / 2

      // Calculate distance from mouse
      const dx = mouseX - particles[i].originalX
      const dy = mouseY - particles[i].originalY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 3

      // Apply mouse repulsion effect
      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 0.2
        positions[i3] = particles[i].originalX - dx * force
        positions[i3 + 1] = particles[i].originalY - dy * force
      } else {
        // Return to original position with some noise
        positions[i3] = particles[i].originalX + Math.sin(time * 0.1 + i) * 0.05
        positions[i3 + 1] = particles[i].originalY + Math.cos(time * 0.1 + i) * 0.05
      }

      // Add some vertical movement
      positions[i3 + 2] = particles[i].originalZ + Math.sin(time * 0.2 + i) * 0.1
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}
