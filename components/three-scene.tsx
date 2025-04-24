"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, useGLTF, Environment } from "@react-three/drei"

function Model({ position = [0, 0, 0] }) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return <primitive ref={ref} object={scene} position={position} scale={2} />
}

function FloatingText({ position, text, color = "#ffffff" }) {
  const textRef = useRef()
  const { camera } = useThree()

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      color={color}
      fontSize={0.5}
      font="/fonts/Geist_Bold.json"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

function Scene() {
  const orbitControlsRef = useRef()

  useFrame(({ clock }) => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.autoRotate = true
      orbitControlsRef.current.autoRotateSpeed = 0.5
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Model position={[0, -1, 0]} />
      <FloatingText position={[0, 1, 0]} text="Game Developer" color="#a855f7" />
      <FloatingText position={[-2.5, 0, 0]} text="Artist" color="#38bdf8" />
      <FloatingText position={[2.5, 0, 0]} text="Web Developer" color="#f472b6" />
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Environment preset="night" />
    </>
  )
}

export default function ThreeScene() {
  return (
    <Canvas className="absolute inset-0">
      <Scene />
    </Canvas>
  )
}
