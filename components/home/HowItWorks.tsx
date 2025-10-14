'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Image, Video, Activity, Brain, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { TiltText } from '@/components/animations/TiltText'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

const detectors = [
  {
    icon: FileText,
    title: 'Text Detection',
    description: 'Linguistic patterns and statistical fingerprints',
    features: [
      'Perplexity analysis',
      'Token distribution',
      'Syntax anomalies',
      'Model signatures',
    ],
    color: '#38BDF8',
  },
  {
    icon: Image,
    title: 'Image Detection',
    description: 'Computer vision and forensic analysis',
    features: [
      'GAN artifacts',
      'Pixel inconsistencies',
      'Frequency analysis',
      'Metadata inspection',
    ],
    color: '#F472B6',
  },
  {
    icon: Video,
    title: 'Video Detection',
    description: 'Temporal analysis and frame inspection',
    features: [
      'Temporal consistency',
      'Motion artifacts',
      'Frame interpolation',
      'Audio-visual sync',
    ],
    color: '#FB923C',
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16">
      <div className="w-full">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <TiltText>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                How Our Detectors Work
              </h2>
            </TiltText>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Advanced AI models trained on millions of samples to identify synthetic content
            </p>
          </motion.div>

          {/* Detection cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {detectors.map((detector, index) => {
              const Icon = detector.icon

              return (
                <motion.div
                  key={detector.title}
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    y: -20,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="h-full glass dark:glass-dark border-foreground/10 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${detector.color}15, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    
                    <CardHeader className="relative z-10">
                      <motion.div
                        className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                        style={{
                          background: `${detector.color}20`,
                        }}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Pulsing background */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ background: detector.color }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        
                        <Icon
                          className="w-10 h-10 relative z-10"
                          style={{ color: detector.color }}
                        />
                      </motion.div>
                      
                      <CardTitle className="text-2xl mb-3">{detector.title}</CardTitle>
                      <CardDescription className="text-base">{detector.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <ul className="space-y-3">
                        {detector.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.2 + featureIndex * 0.1,
                            }}
                            className="flex items-start space-x-3 text-sm group/item"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <CheckCircle
                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                                style={{ color: detector.color }}
                              />
                            </motion.div>
                            <span className="text-foreground/70 group-hover/item:text-foreground transition-colors">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    {/* Corner accent */}
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${detector.color}, transparent)`,
                      }}
                    />
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Process flow */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 glass dark:glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)), transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              {[
                { 
                  icon: Zap, 
                  step: 1, 
                  title: 'Upload Content', 
                  description: 'Upload your file for analysis',
                  color: '#38BDF8'
                },
                { 
                  icon: Brain, 
                  step: 2, 
                  title: 'AI Analysis', 
                  description: 'Our models process the content',
                  color: '#F472B6'
                },
                { 
                  icon: Shield, 
                  step: 3, 
                  title: 'Get Results', 
                  description: 'Receive confidence score',
                  color: '#FB923C'
                },
              ].map((item, index) => {
                const StepIcon = item.icon
                return (
                  <React.Fragment key={item.step}>
                    <motion.div 
                      className="flex-1 text-center space-y-4"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + index * 0.2,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      <motion.div 
                        className="relative w-20 h-20 mx-auto"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div 
                          className="w-full h-full rounded-2xl flex items-center justify-center relative"
                          style={{ background: `${item.color}20` }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{ background: item.color }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.3,
                            }}
                          />
                          <StepIcon className="w-10 h-10 relative z-10" style={{ color: item.color }} />
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + index * 0.2 }}
                      >
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-sm text-foreground/60">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>

                    {index < 2 && (
                      <motion.div 
                        className="hidden md:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
                      >
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Sparkles className="w-6 h-6 text-primary" />
                        </motion.div>
                      </motion.div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

