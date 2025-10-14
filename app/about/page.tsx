'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Shield, Users, Heart, Github, Linkedin, Twitter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'

const mission = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To preserve digital authenticity and build trust in an age of synthetic media',
    color: '#38BDF8',
  },
  {
    icon: Shield,
    title: 'Our Commitment',
    description: 'Transparent, ethical AI detection accessible to everyone',
    color: '#F472B6',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Open source, privacy-focused, and community-driven',
    color: '#FB923C',
  },
]

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Lead Researcher',
    bio: 'PhD in Computer Vision, 10+ years in AI research',
    image: '👩‍🔬',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Alex Rodriguez',
    role: 'ML Engineer',
    bio: 'Specializing in deep learning and neural networks',
    image: '👨‍💻',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Maya Patel',
    role: 'Data Scientist',
    bio: 'Expert in NLP and text analysis',
    image: '👩‍💼',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Jordan Kim',
    role: 'Full Stack Developer',
    bio: 'Building the platform and user experience',
    image: '👨‍🎨',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
]

const principles = [
  {
    title: 'Transparency',
    description: 'Open about our methods, limitations, and accuracy',
  },
  {
    title: 'Privacy',
    description: 'Your data is never stored or used for training',
  },
  {
    title: 'Open Source',
    description: 'Core detection models available to the community',
  },
  {
    title: 'Responsible AI',
    description: 'Committed to ethical use and preventing misuse',
  },
]

export default function AboutPage() {
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
            About{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Us
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Building trust in the digital age through transparent AI detection
          </motion.p>
        </motion.div>

        {/* Mission Cards */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {mission.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div key={item.title} variants={fadeInUp} custom={index}>
                <Card className="h-full glass dark:glass-dark border-foreground/10 hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${item.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.section>

        {/* Story */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="glass dark:glass-dark rounded-3xl p-12 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Our Story</h2>
          <div className="space-y-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            <p>
              AI Detection Hub was founded in 2023 by a team of researchers and engineers 
              who witnessed the rapid proliferation of synthetic media and recognized the 
              urgent need for reliable detection tools.
            </p>
            <p>
              What started as an academic research project has evolved into a comprehensive 
              platform serving thousands of users—from journalists verifying sources to 
              educators teaching media literacy.
            </p>
            <p>
              We believe that as AI generation becomes ubiquitous, detection technology 
              must remain accessible, transparent, and constantly evolving.
            </p>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center">
            Meet the Team
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass dark:glass-dark border-foreground/10 hover:shadow-2xl transition-all duration-300 text-center">
                  <CardContent className="pt-8 pb-8 space-y-4">
                    <div className="text-6xl">{member.image}</div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-primary font-semibold">{member.role}</p>
                      <p className="text-sm text-foreground/70">{member.bio}</p>
                    </div>
                    <div className="flex justify-center gap-3 pt-2">
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Ethical Principles */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center">
            Our Principles
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                variants={fadeInUp}
                custom={index}
                className="glass dark:glass-dark rounded-2xl p-6 border border-foreground/10"
              >
                <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                <p className="text-foreground/70">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

