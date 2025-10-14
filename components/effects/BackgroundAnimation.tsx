'use client'

import React, { useEffect, useRef } from 'react'
import { useMode } from '@/components/providers/ThemeProvider'
import { DetectionMode } from '@/lib/utils'

export function BackgroundAnimation() {
  const { mode } = useMode()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string

      constructor(mode: DetectionMode) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = this.getColorForMode(mode)
      }

      getColorForMode(mode: DetectionMode): string {
        const colors = {
          text: '#38BDF8',
          image: '#F472B6',
          video: '#FB923C',
        }
        return colors[mode]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles based on mode
    let particles: Particle[] = []
    const createParticles = (mode: DetectionMode) => {
      const count = mode === 'text' ? 100 : mode === 'image' ? 80 : 60
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(mode))
      }
    }

    createParticles(mode)

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mode-specific effects
      if (mode === 'text') {
        // Flowing lines for text mode
        particles.forEach((particle) => {
          particle.update()
          particle.draw(ctx)
        })

        // Draw connections
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.save()
              ctx.globalAlpha = (1 - distance / 100) * 0.2
              ctx.strokeStyle = p1.color
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
              ctx.restore()
            }
          })
        })
      } else if (mode === 'image') {
        // Bokeh particles for image mode
        particles.forEach((particle) => {
          particle.update()
          
          // Larger, blurred circles
          ctx.save()
          ctx.globalAlpha = particle.opacity * 0.3
          ctx.filter = 'blur(4px)'
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      } else {
        // Film grain and light rays for video mode
        particles.forEach((particle) => {
          particle.update()
          
          // Vertical light rays
          ctx.save()
          const gradient = ctx.createLinearGradient(
            particle.x,
            0,
            particle.x,
            canvas.height
          )
          gradient.addColorStop(0, 'transparent')
          gradient.addColorStop(0.5, particle.color + '10')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.fillRect(particle.x - 1, 0, 2, canvas.height)
          ctx.restore()
        })
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

