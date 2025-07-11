'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Briefcase, Globe, Users } from 'lucide-react';
import { getAboutPageOverview } from '@/lib/data-loaders';
import { AboutPageOverview } from '@/lib/types';

const AboutHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [aboutData, setAboutData] = useState<AboutPageOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await getAboutPageOverview();
        if (response?.data) {
          setAboutData(response.data);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Fallback data
  const fallbackData = {
    mainTitle: 'About Unity Innovate',
    foundedDescription: 'Building the future of strategic consulting',
    officesNumber: 3,
    officesDescription: 'US, UK, and India presence',
    expertsNumber: 50,
    expertsDescription: 'Industry-leading consultants'
  };

  // Use Strapi data or fallback
  const mainTitle = aboutData?.mainTitle || fallbackData.mainTitle;
  const foundedDescription = aboutData?.foundedDescription || fallbackData.foundedDescription;
  const officesNumber = aboutData?.officesNumber || fallbackData.officesNumber;
  const officesDescription = aboutData?.officesDescription || fallbackData.officesDescription;
  const expertsNumber = aboutData?.expertsNumber || fallbackData.expertsNumber;
  const expertsDescription = aboutData?.expertsDescription || fallbackData.expertsDescription;

  const b1x = useSpring(mousePosition.x * 0.02, { stiffness: 100, damping: 30 });
  const b1y = useSpring(mousePosition.y * 0.02, { stiffness: 100, damping: 30 });
  const b2x = useSpring(mousePosition.x * -0.01, { stiffness: 100, damping: 30 });
  const b2y = useSpring(mousePosition.y * -0.01, { stiffness: 100, damping: 30 });

  const b1xs = useTransform(b1x, (latest) => `${latest}px`);
  const b1ys = useTransform(b1y, (latest) => `${latest}px`);
  const b2xs = useTransform(b2x, (latest) => `${latest}px`);
  const b2ys = useTransform(b2y, (latest) => `${latest}px`);

  if (loading) {
    return (
      <section className="relative pt-32 pb-20 min-h-[70vh] flex items-center bg-gradient-to-br from-dark to-primary overflow-hidden text-white">
        <div className="container relative z-10 w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-white/80">Loading about information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section onMouseMove={onMove} className="relative pt-32 pb-20 min-h-[70vh] flex items-center bg-gradient-to-br from-dark to-primary overflow-hidden text-white">
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
          style={{ x: b1xs, y: b1ys }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          style={{ x: b2xs, y: b2ys }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            {mainTitle}
          </h1>
          <p className="text-xl text-white/95 mb-12 drop-shadow-sm">
            A cutting-edge global insights and innovation partner that enables companies to make bold, proactive choices in a world that is changing quickly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-sm">Founded in 2020</h3>
            <p className="text-white/90 text-sm drop-shadow-sm">{foundedDescription}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-sm">{officesNumber} Global Offices</h3>
            <p className="text-white/90 text-sm drop-shadow-sm">{officesDescription}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-sm">{expertsNumber}+ Experts</h3>
            <p className="text-white/90 text-sm drop-shadow-sm">{expertsDescription}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero; 