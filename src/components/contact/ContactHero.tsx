'use client';

import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ArrowRight, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const ContactHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize mouse position to -1 to 1 range
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    setMousePosition({ x, y });
  }, []);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-primary to-secondary"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 md:w-72 h-48 md:h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          style={{
            x: mousePosition.x * 40,
            y: mousePosition.y * 40,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          style={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-6 sm:mb-8"
          >
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent/90" />
            <span className="text-white font-medium text-lg sm:text-xl md:text-2xl">
              Ready to Elevate Your Business?
            </span>
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent/90" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 sm:mb-8"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            <span className="text-white drop-shadow-lg">
              Let&apos;s Connect &
            </span>
            <br />
            <span className="text-gradient-white">
              Transform Together
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-100 text-center mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow px-4 sm:px-0"
          >
            Let us explore how our comprehensive services can drive innovation, optimize operations, and create lasting value for your organization.
          </motion.p>

          {/* Quick Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 sm:mb-12"
          >
            <div className="text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">Email us at</p>
              <a href="mailto:contact@unityinnovate.com" className="text-accent hover:text-accent/80 transition-colors">
                contact@unityinnovate.com
              </a>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">Call us at</p>
              <a href="tel:+917835877980" className="text-accent hover:text-accent/80 transition-colors">
                +91 7835877980
              </a>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">Visit us at</p>
              <p className="text-gray-200 text-sm">
                2088, Patel Nagar West, New Delhi, India - 110008
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
          >
            <Link
              href="#contact-form"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg text-base font-semibold 
                shadow-lg hover:shadow-xl transform hover:-translate-y-[2px] transition-all duration-300 inline-flex items-center justify-center gap-3 group
                min-h-[56px] touch-manipulation"
            >
              Schedule a Meeting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#office-locations"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg text-base font-semibold 
                hover:bg-white/20 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center
                min-h-[56px] touch-manipulation"
            >
              View Office Locations
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero; 