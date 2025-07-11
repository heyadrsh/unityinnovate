'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

interface IndustryHeroProps {
  title: string;
  description: string;
  breadcrumb: string;
  features: string[];
}

const IndustryHero = ({ title, description, breadcrumb, features }: IndustryHeroProps) => {
  const p1x = useMotionValue(0);
  const p1y = useMotionValue(0);
  const p2x = useMotionValue(0);
  const p2y = useMotionValue(0);

  const p1xs = useSpring(p1x, { stiffness: 50, damping: 20 });
  const p1ys = useSpring(p1y, { stiffness: 50, damping: 20 });
  const p2xs = useSpring(p2x, { stiffness: 50, damping: 20 });
  const p2ys = useSpring(p2y, { stiffness: 50, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const xr = (e.clientX / window.innerWidth - 0.5) * 2;
    const yr = (e.clientY / window.innerHeight - 0.5) * 2;
    const f1 = 40;
    const f2 = 30;
    p1x.set(xr * f1);
    p1y.set(yr * f1);
    p2x.set(-xr * f2);
    p2y.set(-yr * f2);
  }, []);

  return (
    <section onMouseMove={handleMove} className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-dark to-primary overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-transparent" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          style={{ x: p1xs, y: p1ys }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          style={{ x: p2xs, y: p2ys }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center text-white/80 text-sm mb-8">
            <Link href="/industries" className="hover:text-white transition-colors">
              Industries
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>{breadcrumb}</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gradient-white mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl">
              {description}
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-white">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-12">
              <Link href="/contact" className="btn-primary">
                Get Started
              </Link>
              <Link href="/insights/case-studies" className="btn-secondary">
                View Case Studies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryHero; 
 