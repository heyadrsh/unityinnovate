'use client';

import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  LineChart, 
  Users, 
  Cog, 
  Globe 
} from 'lucide-react';

const capabilities = [
  {
    icon: Lightbulb,
    title: "Innovation Strategy",
    description: "Developing future-proof strategies for sustainable growth"
  },
  {
    icon: Target,
    title: "Market Analysis",
    description: "Deep insights into market trends and opportunities"
  },
  {
    icon: LineChart,
    title: "Performance Optimization",
    description: "Enhancing operational efficiency and ROI"
  },
  {
    icon: Users,
    title: "Change Management",
    description: "Guiding organizations through transformation"
  },
  {
    icon: Cog,
    title: "Process Excellence",
    description: "Streamlining operations for maximum impact"
  },
  {
    icon: Globe,
    title: "Global Solutions",
    description: "Delivering value across international markets"
  }
];

export default function CapabilitiesGrid() {
  return (
    <section className="py-20 bg-gradient-to-br from-dark to-primary text-white overflow-hidden">
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
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Strategic Capabilities
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Comprehensive expertise to drive your business transformation and growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <capability.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                  {capability.title}
                </h3>
                <p className="text-white/80">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 