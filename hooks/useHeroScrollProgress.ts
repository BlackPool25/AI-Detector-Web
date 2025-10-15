'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to track scroll progress specifically for the hero section
 * Returns 0 at start of hero, 1 when hero section completes
 */
export function useHeroScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')
      if (!heroSection) return

      const heroHeight = heroSection.offsetHeight
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight

      // Progress from 0 to 1 based on hero section scroll
      const heroScrollProgress = Math.min(Math.max(scrollTop / (heroHeight - windowHeight), 0), 1)
      
      setProgress(heroScrollProgress)
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

