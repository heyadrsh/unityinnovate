'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { extractTextFromContent } from '@/lib/utils';

interface HeroProps {
  heroData?: {
    mainTagline?: string;
    description?: any; // Rich text markdown from Strapi
    backgroundImage?: any;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
  };
  statsData?: {
    expertConsultantsNumber?: number;
    expertConsultantsText?: string;
    yearsExperienceNumber?: number;
    yearsExperienceText?: string;
    projectsDeliveredNumber?: number;
    projectsDeliveredText?: string;
    countriesNumber?: number;
    countriesText?: string;
  };
}

const Hero = ({ heroData, statsData }: HeroProps) => {
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Fallback text if Strapi data is not available
  const fallbackHero = {
    mainTagline: "Collaborate. Innovate. Elevate.",
    description: "Unity Innovate is a cutting-edge global insights and innovation partner that enables companies to make bold, proactive choices in a world that is changing quickly."
  };

  const fallbackStats = {
    expertConsultantsNumber: "50+",
    expertConsultantsText: "Expert Consultants",
    yearsExperienceNumber: "15+",
    yearsExperienceText: "Years Experience",
    projectsDeliveredNumber: "150+",
    projectsDeliveredText: "Projects Delivered",
    countriesNumber: "25+",
    countriesText: "Industry Partnerships"
  };

  // Use Strapi data or fallback
  const heroContent = {
    mainTagline: heroData?.mainTagline || fallbackHero.mainTagline,
    description: heroData?.description 
      ? extractTextFromContent(heroData.description)
      : fallbackHero.description
  };

  const statsContent = {
    expertConsultantsNumber: statsData?.expertConsultantsNumber?.toString() || fallbackStats.expertConsultantsNumber,
    expertConsultantsText: statsData?.expertConsultantsText || fallbackStats.expertConsultantsText,
    yearsExperienceNumber: statsData?.yearsExperienceNumber?.toString() || fallbackStats.yearsExperienceNumber,
    yearsExperienceText: statsData?.yearsExperienceText || fallbackStats.yearsExperienceText,
    projectsDeliveredNumber: statsData?.projectsDeliveredNumber?.toString() || fallbackStats.projectsDeliveredNumber,
    projectsDeliveredText: statsData?.projectsDeliveredText || fallbackStats.projectsDeliveredText,
    countriesNumber: statsData?.countriesNumber?.toString() || fallbackStats.countriesNumber,
    countriesText: statsData?.countriesText || fallbackStats.countriesText
  };

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300; // Distance to completely fade out
      
      // Calculate opacity: 1 at top, 0 after maxScroll pixels
      const opacity = Math.max(0, 1 - (scrollY / maxScroll));
      setScrollIndicatorOpacity(opacity);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize mouse position to -1 to 1 range
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Prevent hydration mismatch by showing static content first
  if (!isClient) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-gray-900/70 to-gray-900/75" />
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent/90" />
              <span className="text-white font-medium text-lg sm:text-xl md:text-2xl text-center">
                Welcome to Unity Innovate
              </span>
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent/90" />
            </div>
            
            <h1 className="mb-6 sm:mb-8">
              <span className="text-white drop-shadow-lg font-black tracking-tight leading-[1.1] block whitespace-nowrap
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" 
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                {heroContent.mainTagline}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow px-4 sm:px-0">
              {heroContent.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")',
          }}
        />
        
        {/* Dark overlay for text readability - adjusted for the new image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-gray-900/70 to-gray-900/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-6 sm:mb-8"
          >
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent/90" />
            <span className="text-white font-medium text-lg sm:text-xl md:text-2xl text-center">
              Welcome to Unity Innovate
            </span>
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent/90" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <span className="text-white drop-shadow-lg font-black tracking-tight leading-[1.1] block whitespace-nowrap
                     text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" 
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              {heroContent.mainTagline}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow px-4 sm:px-0"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0 mb-16 sm:mb-20"
          >
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#1D3A3A] via-[#2D5A5A] to-[#4A9B9B] text-white px-8 py-4 rounded-lg text-base font-semibold 
                shadow-lg hover:shadow-xl transform hover:-translate-y-[2px] transition-all duration-300 inline-flex items-center justify-center gap-3 group
                min-h-[56px] touch-manipulation"
            >
              Connect with Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="bg-white/90 backdrop-blur-sm text-[#1D3A3A] border-2 border-[#2D5A5A]/30 px-8 py-4 rounded-lg text-base font-semibold 
                hover:bg-[#2D5A5A] hover:text-white hover:border-[#2D5A5A] transition-all duration-300 inline-flex items-center justify-center
                min-h-[56px] touch-manipulation"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{statsContent.expertConsultantsNumber}</div>
              <div className="text-sm sm:text-base text-gray-200 leading-tight">{statsContent.expertConsultantsText}</div>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{statsContent.yearsExperienceNumber}</div>
              <div className="text-sm sm:text-base text-gray-200 leading-tight">{statsContent.yearsExperienceText}</div>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{statsContent.projectsDeliveredNumber}</div>
              <div className="text-sm sm:text-base text-gray-200 leading-tight">{statsContent.projectsDeliveredText}</div>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{statsContent.countriesNumber}</div>
              <div className="text-sm sm:text-base text-gray-200 leading-tight">{statsContent.countriesText}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with fade effect - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 hidden sm:block"
      >
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 
