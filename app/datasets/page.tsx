'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Download, ExternalLink, FileText, Image, Video, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'
import { cn } from '@/lib/utils'

type DatasetType = 'all' | 'text' | 'image' | 'video'

const datasets = [
  {
    name: 'GPT-Detection Corpus',
    type: 'text',
    size: '2.4 GB',
    samples: '1.2M',
    description: 'Large-scale dataset of human and GPT-generated text across multiple domains',
    sources: ['GPT-4', 'GPT-3.5', 'Human'],
    license: 'MIT',
    github: 'https://github.com',
    paper: 'https://arxiv.org',
  },
  {
    name: 'LAION AI-Art Dataset',
    type: 'image',
    size: '450 GB',
    samples: '10M',
    description: 'AI-generated images from Stable Diffusion, Midjourney, and DALL-E',
    sources: ['Stable Diffusion', 'Midjourney', 'DALL-E 2'],
    license: 'Creative Commons',
    github: 'https://github.com',
    paper: 'https://arxiv.org',
  },
  {
    name: 'FaceForensics++',
    type: 'video',
    size: '38 GB',
    samples: '5K videos',
    description: 'Comprehensive deepfake detection dataset with multiple manipulation methods',
    sources: ['FaceSwap', 'Face2Face', 'NeuralTextures'],
    license: 'Academic',
    github: 'https://github.com',
    paper: 'https://arxiv.org',
  },
  {
    name: 'Synthetic Text Benchmark',
    type: 'text',
    size: '890 MB',
    samples: '500K',
    description: 'Curated benchmark for testing text detection models',
    sources: ['Multiple LLMs', 'Human Writers'],
    license: 'Apache 2.0',
    github: 'https://github.com',
    paper: 'https://arxiv.org',
  },
  {
    name: 'AI Image Forensics',
    type: 'image',
    size: '125 GB',
    samples: '3M',
    description: 'Mixed real and AI-generated images with detailed metadata',
    sources: ['GANs', 'Diffusion Models', 'Real Photos'],
    license: 'MIT',
    github: 'https://github.com',
    paper: 'https://arxiv.org',
  },
  {
    name: 'Deepfake Detection Challenge',
    type: 'video',
    size: '470 GB',
    samples: '100K videos',
    description: 'Facebook/Meta deepfake detection challenge dataset',
    sources: ['Various Deepfake Methods'],
    license: 'Custom',
    github: 'https://github.com',
    paper: 'https://arxiv.org',
  },
]

const typeIcons = {
  text: FileText,
  image: Image,
  video: Video,
}

const typeColors = {
  text: '#38BDF8',
  image: '#F472B6',
  video: '#FB923C',
}

export default function DatasetsPage() {
  const [filter, setFilter] = useState<DatasetType>('all')

  const filteredDatasets = filter === 'all' 
    ? datasets 
    : datasets.filter(d => d.type === filter)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center space-y-6"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Datasets
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Comprehensive training and testing datasets for AI content detection
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3"
        >
          {(['all', 'text', 'image', 'video'] as DatasetType[]).map((type) => {
            const Icon = type === 'all' ? Filter : typeIcons[type as keyof typeof typeIcons]
            return (
              <Button
                key={type}
                variant={filter === type ? 'default' : 'ghost'}
                onClick={() => setFilter(type)}
                className="capitalize"
              >
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {type}
              </Button>
            )
          })}
        </motion.div>

        {/* Dataset Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDatasets.map((dataset, index) => {
            const Icon = typeIcons[dataset.type as keyof typeof typeIcons]
            const color = typeColors[dataset.type as keyof typeof typeColors]

            return (
              <motion.div
                key={dataset.name}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full glass dark:glass-dark border-foreground/10 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: `${color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          background: `${color}20`,
                          color 
                        }}
                      >
                        {dataset.type}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{dataset.name}</CardTitle>
                    <CardDescription>{dataset.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex gap-4 text-sm">
                      <div>
                        <div className="text-foreground/60">Size</div>
                        <div className="font-semibold">{dataset.size}</div>
                      </div>
                      <div>
                        <div className="text-foreground/60">Samples</div>
                        <div className="font-semibold">{dataset.samples}</div>
                      </div>
                    </div>

                    {/* Sources */}
                    <div>
                      <div className="text-sm text-foreground/60 mb-2">Sources</div>
                      <div className="flex flex-wrap gap-2">
                        {dataset.sources.map((source) => (
                          <span
                            key={source}
                            className="px-2 py-1 rounded-lg bg-foreground/5 text-xs"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* License */}
                    <div className="text-sm">
                      <span className="text-foreground/60">License: </span>
                      <span className="font-medium">{dataset.license}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="default" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

