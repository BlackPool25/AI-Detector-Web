'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Search, BookOpen, Code, Database, Video as VideoIcon, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

type ResourceCategory = 'all' | 'tools' | 'datasets' | 'education' | 'research'

const resources = [
  {
    category: 'tools',
    icon: Code,
    name: 'GPTZero',
    description: 'AI text detection tool for educators and writers',
    url: 'https://gptzero.me',
    verified: true,
    color: '#38BDF8',
  },
  {
    category: 'tools',
    icon: Code,
    name: 'Hive Moderation',
    description: 'AI-powered content moderation platform',
    url: 'https://hivemoderation.com',
    verified: true,
    color: '#38BDF8',
  },
  {
    category: 'datasets',
    icon: Database,
    name: 'LAION-5B',
    description: 'Large-scale image dataset for training and research',
    url: 'https://laion.ai',
    verified: true,
    color: '#F472B6',
  },
  {
    category: 'datasets',
    icon: Database,
    name: 'Common Crawl',
    description: 'Open repository of web crawl data',
    url: 'https://commoncrawl.org',
    verified: true,
    color: '#F472B6',
  },
  {
    category: 'education',
    icon: BookOpen,
    name: 'Media Literacy Now',
    description: 'Educational resources on digital media literacy',
    url: 'https://medialiteracynow.org',
    verified: false,
    color: '#FB923C',
  },
  {
    category: 'education',
    icon: VideoIcon,
    name: 'Deepfake Detection Tutorial',
    description: 'Video course on identifying synthetic media',
    url: 'https://youtube.com',
    verified: false,
    color: '#FB923C',
  },
  {
    category: 'research',
    icon: Award,
    name: 'AI Safety Research',
    description: 'Center for AI safety and alignment research',
    url: 'https://aisafety.org',
    verified: true,
    color: '#8B5CF6',
  },
  {
    category: 'research',
    icon: Award,
    name: 'Partnership on AI',
    description: 'Organization studying AI\'s impact on society',
    url: 'https://partnershiponai.org',
    verified: true,
    color: '#8B5CF6',
  },
]

const categoryIcons = {
  all: Search,
  tools: Code,
  datasets: Database,
  education: BookOpen,
  research: Award,
}

export default function ResourcesPage() {
  const [filter, setFilter] = useState<ResourceCategory>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = filter === 'all' || resource.category === filter
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
              Resources
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Curated collection of tools, datasets, and educational content
          </motion.p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3"
        >
          {(['all', 'tools', 'datasets', 'education', 'research'] as ResourceCategory[]).map((category) => {
            const Icon = categoryIcons[category]
            return (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'ghost'}
                onClick={() => setFilter(category)}
                className="capitalize"
              >
                <Icon className="w-4 h-4 mr-2" />
                {category}
              </Button>
            )
          })}
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => {
            const Icon = resource.icon

            return (
              <motion.div
                key={resource.name}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass dark:glass-dark border-foreground/10 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: `${resource.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: resource.color }} />
                      </div>
                      {resource.verified && (
                        <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-semibold">
                          Verified
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl">{resource.name}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
                    >
                      Visit Resource
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-foreground/60"
          >
            <p className="text-lg">No resources found. Try adjusting your search or filters.</p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="glass dark:glass-dark rounded-3xl p-12 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">Suggest a Resource</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Know of a great tool or resource we should add? Let us know!
          </p>
          <Button variant="default" size="lg">
            Submit Resource →
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

