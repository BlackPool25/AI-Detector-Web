'use client'

import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animationVariants'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      
      {/* Quote Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="w-full max-w-6xl mx-auto text-center space-y-6"
        >
          <blockquote className="text-3xl md:text-5xl font-bold italic">
            "In an age of AI, truth has pixels."
          </blockquote>
          <p className="text-lg text-foreground/70">
            Digital authenticity is the foundation of trust. Our detectors help preserve truth in an increasingly synthetic world.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="w-full max-w-6xl mx-auto text-center space-y-8 glass dark:glass-dark rounded-3xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Detecting?
          </h2>
          <p className="text-lg text-foreground/70">
            Join thousands of users who trust our AI detection technology to verify content authenticity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Detecting →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl border-2 border-primary bg-transparent font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Explore API
            </motion.button>
          </div>
        </motion.div>
      </section>
    </>
  )
}

