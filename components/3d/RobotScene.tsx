'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Robot } from './Robot'
import { useHeroScrollProgress } from '@/hooks/useHeroScrollProgress'
import { useMousePosition } from '@/hooks/useMousePosition'

// Cinematic easing function (easeInOutCubic) for bullet-time effect
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Camera that orbits around robot: Right → Front → Left
function CinematicCamera({ scrollProgress }: { scrollProgress: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  
  useFrame(() => {
    if (!cameraRef.current) return
    
    // Apply cinematic easing
    const eased = easeInOutCubic(scrollProgress)
    
    // Orbital parameters - CLOSER for better view
    const radius = 4 // Distance from robot (closer)
    const baseHeight = 0.5 // Camera height (waist level)
    
    // Angle progression: -90° (right) → 0° (front) → +90° (left)
    const angle = -Math.PI / 2 + (eased * Math.PI)
    
    // Arc path - camera rises slightly at midpoint for cinematic effect
    const heightOffset = Math.sin(eased * Math.PI) * 0.3
    
    // Calculate camera position on arc
    const x = Math.cos(angle) * radius
    const y = baseHeight + heightOffset
    const z = Math.sin(angle) * radius
    
    // Smooth interpolation
    cameraRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.1)
    
    // Always look at robot's center (chest area)
    const lookAtTarget = new THREE.Vector3(0, 0.3, 0)
    cameraRef.current.lookAt(lookAtTarget)
    
    // FOV zoom - slight zoom at front view (bullet-time)
    const fovVariation = Math.sin(eased * Math.PI) * 5
    cameraRef.current.fov = 50 + fovVariation
    cameraRef.current.updateProjectionMatrix()
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[4, 0.5, 0]} // Start at right side, waist level
      fov={50}
      near={0.1}
      far={100}
    />
  )
}

// Main 3D scene
function Scene() {
  const scrollProgress = useHeroScrollProgress()
  const mousePosition = useMousePosition(true)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  
  // Debug logging
  useEffect(() => {
    console.log('Scroll Progress:', scrollProgress.toFixed(3))
  }, [scrollProgress])
  
  // Lighting that follows camera position
  const eased = easeInOutCubic(scrollProgress)
  const lightAngle = -Math.PI / 2 + (eased * Math.PI)
  
  const keyLightX = Math.cos(lightAngle + 0.3) * 7
  const keyLightZ = Math.sin(lightAngle + 0.3) * 7
  
  const fillLightX = Math.cos(lightAngle + Math.PI) * 5
  const fillLightZ = Math.sin(lightAngle + Math.PI) * 5

  return (
    <>
      {/* Cinematic camera */}
      <CinematicCamera scrollProgress={scrollProgress} />
      
      {/* Dark background */}
      <color attach="background" args={['#0a0a0a']} />
      
      {/* Three-point lighting that moves with camera */}
      <ambientLight intensity={0.4} />
      
      {/* Key light - main light that follows camera */}
      <directionalLight
        position={[keyLightX, 6, keyLightZ]}
        intensity={2.5}
        color="#ffffff"
        castShadow={!isMobile}
      />
      
      {/* Fill light - softer, opposite side */}
      <directionalLight
        position={[fillLightX, 3, fillLightZ]}
        intensity={1}
        color="#ffffff"
      />
      
      {/* Rim light - from behind/above */}
      <directionalLight
        position={[0, 5, -4]}
        intensity={1.5}
        color="#ffffff"
      />
      
      {/* Accent lights */}
      <pointLight position={[0, 2, 2]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-2, 1, -2]} intensity={0.8} color="#88aaff" />

      {/* Robot at center */}
      <Robot mousePosition={mousePosition} scrollProgress={scrollProgress} />
      
      {/* Environment for reflections */}
      <Environment preset="warehouse" />
      
      {/* Subtle bloom effect */}
      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      )}
    </>
  )
}

// Main component export
export function RobotScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
