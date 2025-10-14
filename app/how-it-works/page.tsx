'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Scan, Brain, CheckCircle, FileText, Image, Video } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

const pipeline = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload Content',
    description: 'User uploads text, image, or video for analysis',
  },
  {
    step: 2,
    icon: Scan,
    title: 'Feature Extraction',
    description: 'Extract relevant features and patterns from the content',
  },
  {
    step: 3,
    icon: Brain,
    title: 'Model Inference',
    description: 'Deep learning models analyze extracted features',
  },
  {
    step: 4,
    icon: CheckCircle,
    title: 'Classification',
    description: 'Generate confidence score and authenticity verdict',
  },
]

const methods = [
  {
    type: 'Text Detection',
    icon: FileText,
    color: '#38BDF8',
    features: [
      {
        title: 'Linguistic Patterns',
        description: 'Analyze word choice, sentence structure, and writing style',
      },
      {
        title: 'Token Distribution',
        description: 'Statistical analysis of token probabilities',
      },
      {
        title: 'Perplexity Analysis',
        description: 'Measure how "surprised" a model is by the text',
      },
    ],
  },
  {
    type: 'Image Detection',
    icon: Image,
    color: '#F472B6',
    features: [
      {
        title: 'Pixel Artifacts',
        description: 'Detect synthetic patterns and inconsistencies',
      },
      {
        title: 'Frequency Analysis',
        description: 'Analyze frequency domain signatures',
      },
      {
        title: 'GAN Fingerprints',
        description: 'Identify unique patterns from generative models',
      },
    ],
  },
  {
    type: 'Video Detection',
    icon: Video,
    color: '#FB923C',
    features: [
      {
        title: 'Temporal Consistency',
        description: 'Check frame-to-frame coherence',
      },
      {
        title: 'Facial Analysis',
        description: 'Detect unnatural facial movements',
      },
      {
        title: 'Audio-Visual Sync',
        description: 'Verify lip-sync and audio alignment',
      },
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center space-y-6"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold">
            How It{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Works
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Understanding the technology behind AI content detection
          </motion.p>
        </motion.div>

        {/* Pipeline */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center">
            Detection Pipeline
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {pipeline.map((item, index) => {
              const Icon = item.icon

              return (
                <React.Fragment key={item.step}>
                  <motion.div variants={fadeInUp} custom={index}>
                    <Card className="h-full glass dark:glass-dark border-foreground/10 text-center hover:shadow-2xl transition-all duration-300">
                      <CardContent className="pt-6 space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-primary">
                            Step {item.step}
                          </div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          <p className="text-sm text-foreground/70">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {index < pipeline.length - 1 && (
                    <div className="hidden md:flex items-center justify-center">
                      <div className="text-3xl text-primary">→</div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </motion.section>

        {/* Detection Methods */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center">
            Detection Methods
          </motion.h2>

          <div className="space-y-8">
            {methods.map((method, index) => {
              const Icon = method.icon

              return (
                <motion.div key={method.type} variants={fadeInUp} custom={index}>
                  <Card className="glass dark:glass-dark border-foreground/10 overflow-hidden">
                    <div
                      className="h-2"
                      style={{ background: method.color }}
                    />
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className="p-3 rounded-xl"
                          style={{ background: `${method.color}20` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: method.color }} />
                        </div>
                        <CardTitle className="text-2xl">{method.type}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        {method.features.map((feature) => (
                          <div key={feature.title} className="space-y-2">
                            <h4 className="font-semibold">{feature.title}</h4>
                            <p className="text-sm text-foreground/70">
                              {feature.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Model Architecture */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="glass dark:glass-dark rounded-3xl p-12 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Model Architecture</h2>
          <p className="text-lg text-foreground/70 text-center max-w-3xl mx-auto">
            Our detection models are built on state-of-the-art deep learning architectures, 
            trained on millions of authentic and synthetic samples across multiple domains.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">99.2%</div>
              <div className="text-sm text-foreground/70">Accuracy</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">10M+</div>
              <div className="text-sm text-foreground/70">Training Samples</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">&lt;2s</div>
              <div className="text-sm text-foreground/70">Analysis Time</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

