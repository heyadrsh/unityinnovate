'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

const IndustriesHero = () => {
  const industries = [
    { name: "Energy & Storage", href: "/industries/energy-storage" },
    { name: "Consumer Health", href: "/industries/consumer-health" },
    { name: "Cosmetics & Personal Care", href: "/industries/cosmetics-personal-care" },
    { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
    { name: "Mobility & Automotives", href: "/industries/mobility-automotives" }
  ];

  const b1x = useMotionValue(0);
  const b1y = useMotionValue(0);
  const b2x = useMotionValue(0);
  const b2y = useMotionValue(0);

  const b1xs = useSpring(b1x, { stiffness: 50, damping: 20 });
  const b1ys = useSpring(b1y, { stiffness: 50, damping: 20 });
  const b2xs = useSpring(b2x, { stiffness: 50, damping: 20 });
  const b2ys = useSpring(b2y, { stiffness: 50, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const xr = (e.clientX / window.innerWidth - 0.5) * 2;
    const yr = (e.clientY / window.innerHeight - 0.5) * 2;
    const f1 = 40;
    const f2 = 30;
    b1x.set(xr * f1);
    b1y.set(yr * f1);
    b2x.set(-xr * f2);
    b2y.set(-yr * f2);
  }, []);

  return (
    <section onMouseMove={onMove} className="relative min-h-[70vh] py-24 flex items-center justify-center bg-gradient-to-br from-dark to-primary overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-transparent" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          style={{ x: b1xs, y: b1ys }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          style={{ x: b2xs, y: b2ys }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-white mb-6">
            Industry Expertise
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-16 max-w-3xl mx-auto">
            We deliver transformative solutions across diverse industries, combining deep sector knowledge with cutting-edge innovation to drive sustainable growth and competitive advantage.
          </p>

          {/* Key Industries Preview - Symmetric Layout */}
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]"
              >
                <Link href={industry.href}>
                  <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-white text-lg font-medium group-hover:text-accent transition-colors duration-300">
                        {industry.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesHero; 