'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useMode } from '@/components/providers/ThemeProvider'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Awareness', href: '/awareness' },
  { name: 'Datasets', href: '/datasets' },
  { name: 'Research', href: '/research' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { mode } = useMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass dark:glass-dark shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-[80px] h-[80px] flex-shrink-0"
            >
              {/* Light mode logo */}
              <Image
                src="/logo.png"
                alt="DetectX Logo"
                fill
                className="object-contain dark:hidden"
                priority
              />
              {/* Dark mode logo */}
              <Image
                src="/logo-dark.png"
                alt="DetectX Logo"
                fill
                className="object-contain hidden dark:block"
                priority
                onError={(e) => {
                  // If dark logo doesn't exist, use light logo
                  e.currentTarget.style.display = 'none'
                  const lightLogo = e.currentTarget.previousElementSibling as HTMLElement
                  if (lightLogo) lightLogo.classList.remove('dark:hidden')
                }}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              DetectX
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground transition-all relative group"
              >
                <span className="inline-block overflow-hidden relative">
                  <span className="block group-hover:animate-slot-spin">
                    {link.name}
                  </span>
                </span>
                <span 
                  className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>

            {/* Auth buttons */}
            <Button variant="ghost" size="default">
              Login
            </Button>
            <Button variant="default" size="default" className="shadow-lg">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden glass dark:glass-dark border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {/* Theme toggle for mobile */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="Toggle theme"
              >
                <span>Theme</span>
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-5 h-5" />
                      <span className="text-xs">Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      <span className="text-xs">Dark</span>
                    </>
                  )}
                </span>
              </button>
              
              <Button variant="ghost" className="w-full">
                Login
              </Button>
              <Button variant="default" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

