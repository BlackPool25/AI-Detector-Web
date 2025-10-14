'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image, Video, ExternalLink, Copy, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'
import { cn } from '@/lib/utils'

type PaperType = 'text' | 'image' | 'video'

const papers = [
  {
    title: 'DetectGPT: Zero-Shot Machine-Generated Text Detection',
    authors: 'Mitchell et al.',
    venue: 'NeurIPS 2023',
    date: '2023',
    type: 'text',
    abstract: 'We propose DetectGPT, a novel zero-shot method for detecting machine-generated text...',
    tags: ['GPT-4', 'Zero-Shot', 'Perplexity'],
    pdf: 'https://arxiv.org',
    arxiv: 'https://arxiv.org',
    code: 'https://github.com',
  },
  {
    title: 'Detecting AI-Generated Images with Frequency Analysis',
    authors: 'Zhang et al.',
    venue: 'CVPR 2024',
    date: '2024',
    type: 'image',
    abstract: 'A frequency-domain approach to identifying synthetic images from diffusion models...',
    tags: ['Frequency Analysis', 'CNNs', 'Diffusion Models'],
    pdf: 'https://arxiv.org',
    arxiv: 'https://arxiv.org',
    code: 'https://github.com',
  },
  {
    title: 'Deepfake Detection Through Temporal Inconsistency',
    authors: 'Kumar et al.',
    venue: 'ICCV 2023',
    date: '2023',
    type: 'video',
    abstract: 'Leveraging temporal inconsistencies in facial movements for deepfake video detection...',
    tags: ['Temporal Analysis', 'Face Manipulation', 'Deep Learning'],
    pdf: 'https://arxiv.org',
    arxiv: 'https://arxiv.org',
    code: 'https://github.com',
  },
  {
    title: 'Large Language Model Watermarking via Statistical Signatures',
    authors: 'Li et al.',
    venue: 'ACL 2024',
    date: '2024',
    type: 'text',
    abstract: 'A watermarking technique for LLM-generated text using statistical signatures...',
    tags: ['Watermarking', 'LLMs', 'Statistical Analysis'],
    pdf: 'https://arxiv.org',
    arxiv: 'https://arxiv.org',
    code: 'https://github.com',
  },
  {
    title: 'GAN Fingerprints: Forensic Analysis of Generated Images',
    authors: 'Wang et al.',
    venue: 'SIGGRAPH 2023',
    date: '2023',
    type: 'image',
    abstract: 'Identifying unique fingerprints left by different GAN architectures...',
    tags: ['GANs', 'Forensics', 'Image Analysis'],
    pdf: 'https://arxiv.org',
    arxiv: 'https://arxiv.org',
    code: 'https://github.com',
  },
  {
    title: 'Audio-Visual Synchronization for Deepfake Detection',
    authors: 'Chen et al.',
    venue: 'ICASSP 2024',
    date: '2024',
    type: 'video',
    abstract: 'Detecting deepfakes by analyzing audio-visual synchronization patterns...',
    tags: ['Audio-Visual', 'Multimodal', 'Synchronization'],
    pdf: 'https://arxiv.org',
    arxiv: 'https://arxiv.org',
    code: 'https://github.com',
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

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<PaperType>('text')
  const [copiedPaper, setCopiedPaper] = useState<string | null>(null)

  const filteredPapers = papers.filter((p) => p.type === activeTab)

  const handleCiteCopy = (paperTitle: string) => {
    // Mock citation copy
    navigator.clipboard.writeText(`@inproceedings{${paperTitle},\n  title={${paperTitle}},\n  author={...},\n  year={2023}\n}`)
    setCopiedPaper(paperTitle)
    setTimeout(() => setCopiedPaper(null), 2000)
  }

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
            Research &{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Papers
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Academic research and methodology behind our detection technology
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="flex justify-center gap-3"
        >
          {(['text', 'image', 'video'] as PaperType[]).map((type) => {
            const Icon = typeIcons[type]
            const color = typeColors[type]
            const isActive = activeTab === type

            return (
              <Button
                key={type}
                variant={isActive ? 'default' : 'ghost'}
                onClick={() => setActiveTab(type)}
                className="capitalize"
                style={
                  isActive
                    ? {
                        background: `${color}20`,
                        color: color,
                        borderColor: color,
                      }
                    : undefined
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {type}
              </Button>
            )
          })}
        </motion.div>

        {/* Papers Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-6"
        >
          {filteredPapers.map((paper, index) => {
            const Icon = typeIcons[paper.type]
            const color = typeColors[paper.type]

            return (
              <motion.div key={paper.title} variants={fadeInUp} custom={index}>
                <Card className="glass dark:glass-dark border-foreground/10 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className="p-3 rounded-xl flex-shrink-0"
                        style={{ background: `${color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-xl">{paper.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 text-sm text-foreground/70">
                          <span>{paper.authors}</span>
                          <span>•</span>
                          <span className="text-primary">{paper.venue}</span>
                          <span>•</span>
                          <span>{paper.date}</span>
                        </div>
                        <CardDescription className="text-base">
                          {paper.abstract}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${color}15`,
                            color: color,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="ghost" size="sm">
                        arXiv
                      </Button>
                      <Button variant="ghost" size="sm">
                        Code
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCiteCopy(paper.title)}
                      >
                        {copiedPaper === paper.title ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Cite
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Our Contributions */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="glass dark:glass-dark rounded-3xl p-12 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">Our Contributions</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our research team has published extensively on AI detection methods, 
            contributing to the advancement of digital authenticity verification.
          </p>
          <Button variant="default" size="lg">
            View All Publications →
          </Button>
        </motion.section>
      </div>
    </div>
  )
}

