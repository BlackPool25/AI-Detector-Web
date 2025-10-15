'use client'

import { useState, useEffect } from 'react'

interface MousePosition {
  x: number // -1 to 1 (left to right)
  y: number // -1 to 1 (top to bottom)
}

/**
 * Hook to track normalized mouse position
 * Returns { x: -1 to 1, y: -1 to 1 } where (0,0) is center of viewport
 * Only active when scroll is at top of page
 */
export function useMousePosition(activeWhenScrollAtTop = true) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (activeWhenScrollAtTop) {
      const handleScroll = () => {
        setIsActive(window.scrollY < 100)
      }
      
      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [activeWhenScrollAtTop])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive && activeWhenScrollAtTop) {
        setMousePosition({ x: 0, y: 0 })
        return
      }

      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isActive, activeWhenScrollAtTop])

  return mousePosition
}

