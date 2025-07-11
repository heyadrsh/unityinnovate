'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

const ServicesHero = () => {
  // Parallax motion values
  const blob1X = useMotionValue(0);
  const blob1Y = useMotionValue(0);
  const blob2X = useMotionValue(0);
  const blob2Y = useMotionValue(0);

  const blob1XS = useSpring(blob1X, { stiffness: 50, damping: 20 });
  const blob1YS = useSpring(blob1Y, { stiffness: 50, damping: 20 });
  const blob2XS = useSpring(blob2X, { stiffness: 50, damping: 20 });
  const blob2YS = useSpring(blob2Y, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const xRel = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRel = (e.clientY / window.innerHeight - 0.5) * 2;
    const factor1 = 40;
    const factor2 = 30;
    blob1X.set(xRel * factor1);
    blob1Y.set(yRel * factor1);
    blob2X.set(-xRel * factor2);
    blob2Y.set(-yRel * factor2);
  }, []);

  return (
    <section onMouseMove={handleMouseMove} className="relative min-h-[70vh] py-24 flex items-center bg-gradient-to-br from-dark to-primary overflow-hidden">
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
          style={{ x: blob1XS, y: blob1YS }}
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
          style={{ x: blob2XS, y: blob2YS }}
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
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-white mb-6">
            Transformative Solutions for Future Success
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We combine deep industry expertise with innovative methodologies to deliver impactful solutions that drive sustainable growth and competitive advantage.
          </p>
          
          {/* Service Categories Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            {[
              {
                title: 'Innovation Consulting',
                description: 'Future-proof your business with cutting-edge innovation strategies',
                href: '/services/innovation-consulting'
              },
              {
                title: 'Business Consulting',
                description: 'Optimize operations and accelerate growth with expert guidance',
                href: '/services/business-consulting'
              },
              {
                title: 'Value & Access',
                description: 'Maximize market potential with strategic value optimization',
                href: '/services/value-access'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-lg font-heading text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-white/80 mb-3">{service.description}</p>
                    <div className="flex items-center text-accent group-hover:text-white transition-colors">
                      <span className="text-sm">Learn More</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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

export default ServicesHero; 