'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Shield, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

const timeline = [
  { year: '2014', event: 'Generative Adversarial Networks (GANs) invented', description: 'Ian Goodfellow introduces GANs, laying foundation for AI-generated content' },
  { year: '2016', event: 'DeepMind\'s WaveNet creates realistic speech', description: 'First convincing AI-generated audio, marking the beginning of synthetic media' },
  { year: '2017', event: 'Face2Face real-time facial reenactment', description: 'Technology enables real-time face manipulation in video calls' },
  { year: '2018', event: 'First deepfake videos emerge publicly', description: 'Deepfake technology goes mainstream, raising concerns about misinformation' },
  { year: '2019', event: 'GPT-2 deemed "too dangerous to release"', description: 'OpenAI delays GPT-2 release due to fears of misuse in generating fake news' },
  { year: '2020', event: 'GPT-3 revolutionizes text generation', description: 'Large language models achieve near-human quality in text generation' },
  { year: '2021', event: 'DALL-E introduces text-to-image generation', description: 'AI can now create images from text descriptions with stunning accuracy' },
  { year: '2022', event: 'Stable Diffusion & Midjourney democratize AI art', description: 'AI image generation becomes accessible to everyone, sparking creative revolution' },
  { year: '2023', event: 'ChatGPT reaches 100M users in 2 months', description: 'Fastest-growing consumer application in history, AI goes mainstream' },
  { year: '2024', event: 'Sora & video generation becomes mainstream', description: 'AI-generated videos become indistinguishable from reality' },
  { year: '2025', event: 'AI detection becomes critical infrastructure', description: 'Detection tools become essential for maintaining digital trust and authenticity' },
]

const impacts = [
  {
    icon: AlertTriangle,
    title: 'Misinformation Crisis',
    description: 'AI-generated fake news spreads 6x faster than truth on social media',
    color: '#EF4444',
  },
  {
    icon: Shield,
    title: 'Identity Theft',
    description: 'Deepfake videos used in fraud schemes, costing millions annually',
    color: '#F97316',
  },
  {
    icon: Users,
    title: 'Trust Erosion',
    description: '73% of people can\'t distinguish AI-generated content from real',
    color: '#EC4899',
  },
  {
    icon: TrendingUp,
    title: 'Growing Threat',
    description: 'Synthetic media volume increasing by 900% year over year',
    color: '#8B5CF6',
  },
]

export default function AwarenessPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-16">
      <div className="w-full space-y-20">
        {/* Hero */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center space-y-6"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold">
            The Rise of{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Synthetic Media
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Understanding the impact of AI-generated content on society, truth, and trust
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-center mb-16">
            Timeline: From Novelty to Crisis
          </motion.h2>
          
          <div className="relative py-16">
            {/* Timeline line with gradient */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 md:w-2 bg-gradient-to-b from-primary via-accent to-primary opacity-20" />
            
            <div className="space-y-32 md:space-y-40">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -200 : 200,
                    scale: 0.8
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1
                  }}
                  viewport={{ once: true, margin: '-100px', amount: 0.3 }}
                  transition={{ 
                    duration: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    scale: {
                      duration: 0.8,
                      ease: 'easeOut'
                    }
                  }}
                  className={`relative flex items-start gap-4 md:gap-16 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content side */}
                  <motion.div 
                    className={`flex-1 ${index % 2 === 0 ? 'text-right pr-4 md:pr-12' : 'text-left pl-4 md:pl-12'}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="glass dark:glass-dark rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border border-primary/10">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                          delay: 0.3
                        }}
                      >
                        <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-3 md:mb-6">
                          {item.year}
                        </h3>
                      </motion.div>
                      
                      <motion.h4 
                        className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {item.event}
                      </motion.h4>
                      
                      <motion.p 
                        className="text-base md:text-xl text-foreground/70 font-light leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  {/* Timeline dot */}
                  <motion.div 
                    className="relative flex-shrink-0 z-20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1
                    }}
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary ring-8 md:ring-12 ring-primary/20 relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Empty side */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Impact Cards */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-center">
            Real-World Impact
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {impacts.map((impact, index) => {
              const Icon = impact.icon
              return (
                <motion.div key={impact.title} variants={fadeInUp} custom={index}>
                  <Card className="h-full glass dark:glass-dark border-foreground/10 hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: `${impact.color}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: impact.color }} />
                      </div>
                      <CardTitle>{impact.title}</CardTitle>
                      <CardDescription className="text-base">{impact.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Why Detection Matters */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="glass dark:glass-dark rounded-3xl p-12 text-center space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Why Detection Matters</h2>
          <blockquote className="text-2xl italic text-foreground/80 max-w-3xl mx-auto">
            "Without the ability to distinguish real from synthetic, we lose our shared foundation of truth."
          </blockquote>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            AI detection technology is not just a tool—it's a necessity for preserving trust, 
            protecting identities, and maintaining the integrity of information in the digital age.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center space-y-6"
        >
          <h3 className="text-2xl font-bold">Test Your Ability to Spot AI</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Take the Challenge →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

