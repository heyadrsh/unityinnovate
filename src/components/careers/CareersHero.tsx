'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Building2, Target, Lightbulb } from 'lucide-react';
import Link from 'next/link';

const CareersHero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark to-primary text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-2xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 15, -10, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-xl"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -15, 25, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/20 rounded-lg"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              One Step Closer To{' '}
              <span className="text-white drop-shadow-lg">Your Dream Job</span>
            </h1>
            <p className="text-xl text-white/95 mb-8 leading-relaxed drop-shadow-sm">
              Join Unity Innovate and accelerate your career in strategic consulting and innovation. 
              Be part of a team that shapes the future of global industries.
            </p>
            <Link 
              href="#opportunities"
              className="inline-flex items-center bg-white text-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Current Openings
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right visual elements - Building blocks metaphor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Building blocks arrangement */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {/* Foundation blocks */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                >
                  <Building2 className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="w-24 h-24 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center"
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>

              {/* Top block */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="w-32 h-24 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mt-4"
              >
                <Lightbulb className="w-12 h-12 text-white" />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-accent/30 rounded-full"
              />
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/20"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-sm">50+</div>
            <div className="text-white/90 text-sm drop-shadow-sm">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-sm">3</div>
            <div className="text-white/90 text-sm drop-shadow-sm">Global Offices</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-sm">100%</div>
            <div className="text-white/90 text-sm drop-shadow-sm">Growth Focused</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersHero; 