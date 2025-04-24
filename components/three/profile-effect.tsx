"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
import { extend } from "@react-three/fiber"

// Custom shader material for the profile effect
const ProfileShaderMaterial = shaderMaterial(
  {
    time: 0,
    texture: null,
    mousePosition: new THREE.Vector2(0, 0),
    resolution: new THREE.Vector2(1, 1),
    hoverStrength: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    uniform float time;
    uniform vec2 mousePosition;
    uniform float hoverStrength;
    
    void main() {
      vUv = uv;
      
      // Add subtle vertex displacement
      vec3 pos = position;
      float dist = distance(vec2(pos.x, pos.y), mousePosition);
      float maxDist = 1.0;
      
      if (dist < maxDist) {
        float strength = (1.0 - dist / maxDist) * hoverStrength;
        pos.z += strength * 0.1;
      }
      
      // Add wave effect
      pos.z += sin(pos.x * 10.0 + time) * 0.01;
      pos.z += cos(pos.y * 10.0 + time) * 0.01;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D texture;
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    void main() {
      // Sample the texture
      vec4 texColor = texture2D(texture, vUv);
      
      // Add subtle color shift based on time
      float r = texColor.r + sin(time * 0.5) * 0.05;
      float g = texColor.g + cos(time * 0.5) * 0.05;
      float b = texColor.b + sin(time * 0.3) * 0.05;
      
      // Add subtle glow at the edges
      float distFromCenter = distance(vUv, vec2(0.5));
      float edgeGlow = smoothstep(0.4, 0.5, distFromCenter);
      
      vec3 finalColor = mix(vec3(r, g, b), vec3(0.6, 0.2, 0.8), edgeGlow * 0.3);
      
      // Apply alpha from texture
      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `,
)

// Extend Three.js with our custom material
extend({ ProfileShaderMaterial })

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

export default function ProfileEffect({ mousePosition = [0, 0] }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    // Use fallback texture immediately
    const fallbackTexture = createFallbackTexture()
    setTexture(fallbackTexture)
  }, [])

  // Update shader uniforms
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
      materialRef.current.uniforms.hoverStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.hoverStrength.value,
        hovered ? 1.0 : 0.0,
        0.1,
      )

      // Update mouse position
      if (mousePosition && mousePosition.length === 2) {
        materialRef.current.uniforms.mousePosition.value.set(mousePosition[0], mousePosition[1])
      }
    }

    // Rotate the mesh slightly
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  // Set up resolution on mount and resize
  useEffect(() => {
    const updateResolution = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", updateResolution)
    updateResolution()

    return () => window.removeEventListener("resize", updateResolution)
  }, [])

  if (!texture) return null

  return (
    <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <planeGeometry args={[3, 3, 32, 32]} />
      <profileShaderMaterial ref={materialRef} texture={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  )
}
