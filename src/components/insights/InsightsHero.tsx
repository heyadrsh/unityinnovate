'use client';

import { useState, useCallback } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface InsightsHeroProps {
  title: string;
  subtitle: string;
  breadcrumb?: string; // e.g., "Blogs", "Case Studies"
  align?: 'left' | 'center';
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export default function InsightsHero({ 
  title, 
  subtitle, 
  breadcrumb,
  align = 'center',
  onSearch, 
  showSearch = true 
}: InsightsHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // mouse parallax for blobs
  const b1x = useMotionValue(0);
  const b1y = useMotionValue(0);
  const b2x = useMotionValue(0);
  const b2y = useMotionValue(0);

  const s = { stiffness: 50, damping: 20 } as const;
  const b1xs = useSpring(b1x, s);
  const b1ys = useSpring(b1y, s);
  const b2xs = useSpring(b2x, s);
  const b2ys = useSpring(b2y, s);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  // Determine if we should left-align based on prop or presence of breadcrumb
  const isLeftAligned = align === 'left' || !!breadcrumb;

  return (
    <section onMouseMove={onMove} className="relative min-h-[70vh] py-24 flex items-center overflow-hidden bg-gradient-to-br from-dark to-primary">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-transparent" />

      {/* Animated background elements */}
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
            ease: 'easeInOut',
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
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className={`container relative z-10 ${isLeftAligned ? 'pt-32' : 'px-6'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${isLeftAligned ? 'max-w-4xl' : 'max-w-4xl mx-auto text-center'}`}
        >
          {/* Breadcrumb Navigation */}
          {breadcrumb && (
            <div className="flex items-center text-white/80 text-sm mb-8">
              <Link href="/insights" className="hover:text-white transition-colors">
                Insights
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span>{breadcrumb}</span>
            </div>
          )}

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gradient-white mb-6 ${isLeftAligned ? '' : 'mx-auto'}`}
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {title}
          </h1>
          <p className={`text-lg md:text-xl text-white/90 mb-8 leading-relaxed ${isLeftAligned ? 'max-w-2xl' : 'max-w-3xl mx-auto'}`}>
            {subtitle}
          </p>

          {/* Search Bar (center aligned only) */}
          {showSearch && (
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`${isLeftAligned ? 'max-w-lg' : 'max-w-2xl mx-auto'}`}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search insights, articles, case studies..."
                  className="w-full pl-14 pr-6 py-3.5 text-base bg-white/95 backdrop-blur-sm border-2 border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute inset-y-1.5 right-2 flex items-center"
                >
                  <span className="bg-accent hover:bg-secondary text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    Search
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
} 