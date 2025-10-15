'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RobotProps {
  mousePosition: { x: number; y: number }
  scrollProgress: number
}

export function Robot({ mousePosition, scrollProgress }: RobotProps) {
  const robotRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!robotRef.current || !headRef.current) return
    
    // Robot stays centered - only mouse tracking and floating
    
    // Mouse tracking only when at top (before scroll)
    if (scrollProgress < 0.05) {
      const targetRotY = mousePosition.x * 0.12
      const targetRotX = mousePosition.y * 0.08
      
      robotRef.current.rotation.y += (targetRotY - robotRef.current.rotation.y) * 0.06
      robotRef.current.rotation.x += (targetRotX - robotRef.current.rotation.x) * 0.06
      
      headRef.current.rotation.y += (mousePosition.x * 0.25 - headRef.current.rotation.y) * 0.1
      headRef.current.rotation.x += (mousePosition.y * 0.18 - headRef.current.rotation.x) * 0.1
    } else {
      // Reset rotation during scroll
      robotRef.current.rotation.y += (0 - robotRef.current.rotation.y) * 0.06
      robotRef.current.rotation.x += (0 - robotRef.current.rotation.x) * 0.06
      headRef.current.rotation.y += (0 - headRef.current.rotation.y) * 0.1
      headRef.current.rotation.x += (0 - headRef.current.rotation.x) * 0.1
    }
    
    // Gentle floating animation
    const time = Date.now() * 0.001
    const floatAmount = (1 - scrollProgress) * 0.06
    robotRef.current.position.y = Math.sin(time * 0.4) * floatAmount
  })

  // Smaller responsive scale
  const scale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.8 : 1.2

  return (
    <group ref={robotRef} position={[0, 0, 0]} scale={scale}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Eyes - black */}
        <mesh position={[-0.15, 0.1, 0.31]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.15, 0.1, 0.31]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Antenna - black */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Neck - gray */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
        <meshStandardMaterial color="#dddddd" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Torso - white */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Chest core - black circle */}
      <mesh position={[0, 0.3, 0.26]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Left Shoulder - gray */}
      <mesh position={[-0.5, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Left Arm - white */}
      <mesh position={[-0.5, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Hand - black */}
      <mesh position={[-0.5, -0.4, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Right Shoulder - gray */}
      <mesh position={[0.5, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Right Arm - white */}
      <mesh position={[0.5, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Right Hand - black */}
      <mesh position={[0.5, -0.4, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Waist - gray */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#dddddd" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Leg - white */}
      <mesh position={[-0.2, -0.85, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.9, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Foot - black */}
      <mesh position={[-0.2, -1.35, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Right Leg - white */}
      <mesh position={[0.2, -0.85, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.9, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Right Foot - black */}
      <mesh position={[0.2, -1.35, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
