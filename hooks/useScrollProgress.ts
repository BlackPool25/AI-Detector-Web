'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to track normalized scroll progress (0 to 1)
 * Returns 0 at top of page, 1 at bottom
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      
      if (scrollHeight > 0) {
        const currentProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
        setProgress(currentProgress)
      } else {
        setProgress(0)
      }
    }

    // Initial calculation
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return progress
}

