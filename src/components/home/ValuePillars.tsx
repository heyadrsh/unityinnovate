'use client';

import { motion } from 'framer-motion';
import { Sparkles, Target, Users, Globe } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: "Innovation Excellence",
    description: "Pioneering transformative solutions that redefine industry standards and drive meaningful change."
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "Building lasting relationships through deep understanding and unwavering commitment to client success."
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Leveraging worldwide insights and expertise to deliver locally relevant solutions."
  }
];

export default function ValuePillars() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              Our Core Values
            </h2>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guiding principles that define our approach to innovation and client success
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-dark group-hover:to-primary group-hover:border-transparent">
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-accent/10 group-hover:bg-white/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4 text-dark group-hover:text-white transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Card Glow Effect */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-accent/0 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 