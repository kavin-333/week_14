'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Hero Section with 3D Scrollable Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 perspective">
          {/* Floating Cards - 3D Depth Effect */}
          <motion.div
            className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30 backdrop-blur-xl"
            style={{
              top: '10%',
              left: '10%',
              transform: `translateY(${scrollY * 0.3}px) rotateX(${scrollY * 0.02}deg) rotateY(${scrollY * 0.02}deg)`,
            }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-2xl border border-cyan-400/30 backdrop-blur-xl"
            style={{
              top: '40%',
              right: '5%',
              transform: `translateY(${scrollY * 0.4}px) rotateX(${-scrollY * 0.025}deg) rotateY(${-scrollY * 0.025}deg)`,
            }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-2xl border border-purple-400/30 backdrop-blur-xl"
            style={{
              bottom: '5%',
              left: '20%',
              transform: `translateY(${scrollY * 0.35}px) rotateX(${scrollY * 0.015}deg) rotateY(${scrollY * 0.015}deg)`,
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            TaskFlow
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          >
            Immerse yourself in a seamless task management experience. Organize, track, and accomplish with style.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 border-2 border-cyan-400 rounded-lg font-bold text-lg text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-cyan-400 text-sm">Scroll to explore</div>
          <svg className="w-6 h-6 mx-auto mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Choose TaskFlow?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🚀',
              title: 'Lightning Fast',
              description: 'Built with Next.js and Supabase for blazing-fast performance',
            },
            {
              icon: '🔒',
              title: 'Secure & Private',
              description: 'Your data is protected with enterprise-grade Row Level Security',
            },
            {
              icon: '✨',
              title: 'Beautiful Design',
              description: 'Stunning 3D animations and intuitive interface',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/60 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-4 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-gray-300 text-lg mb-8">Join thousands using TaskFlow to manage their work efficiently.</p>
          <Link
            href="/auth/signup"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold text-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
          >
            Start Free Today
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
