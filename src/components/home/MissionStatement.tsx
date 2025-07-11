'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MissionStatement() {
  return (
    <section className="py-24 bg-gradient-to-br from-dark to-primary text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                Transforming Ideas into{' '}
                <span className="text-accent">Impact</span>
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-8" />
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                We empower organizations to navigate complexity and drive meaningful innovation in an ever-evolving global landscape.
              </p>
              <Link 
                href="/about"
                className="inline-flex items-center group"
              >
                <span className="text-accent group-hover:text-white transition-colors duration-300">
                  Learn More About Our Vision
                </span>
                <ArrowRight className="w-5 h-5 ml-2 text-accent group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Strategic Innovation",
                  "Global Expertise",
                  "Client Partnership",
                  "Sustainable Growth"
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors duration-300"
                  >
                    <span className="text-lg font-medium text-white">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 