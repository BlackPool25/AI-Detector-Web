'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function PageLoader() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center origin-left"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
            }}
            className="text-center relative"
          >
            {/* Logo Image - Place your logo.png in the public folder */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Fallback to text if no logo exists */}
              <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] mx-auto">
                {/* Light mode logo */}
                <Image
                  src="/logo.png"
                  alt="DetectX Logo"
                  fill
                  className="object-contain drop-shadow-2xl dark:hidden"
                  priority
                  onError={(e) => {
                    // If logo doesn't exist, hide image and show text
                    e.currentTarget.style.display = 'none'
                    const fallback = document.getElementById('logo-fallback')
                    if (fallback) fallback.style.display = 'block'
                  }}
                />
                {/* Dark mode logo */}
                <Image
                  src="/logo-dark.png"
                  alt="DetectX Logo"
                  fill
                  className="object-contain drop-shadow-2xl hidden dark:block"
                  priority
                  onError={(e) => {
                    // If dark logo doesn't exist, use light logo
                    e.currentTarget.style.display = 'none'
                    const lightLogo = e.currentTarget.previousElementSibling as HTMLElement
                    if (lightLogo) lightLogo.classList.remove('dark:hidden')
                  }}
                />
              </div>
              
              {/* Text fallback if logo doesn't exist */}
              <div 
                id="logo-fallback" 
                className="text-7xl md:text-9xl font-black text-white tracking-tighter"
                style={{ display: 'none' }}
              >
                DetectX
              </div>
            </motion.div>
          </motion.div>

          {/* Wipe effect overlay */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              width: '40%',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
