'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, BookmarkCheck, Calendar, User, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface InsightItem {
  id: string;
  title: string;
  excerpt: string;
  category: 'blogs' | 'case-studies' | 'articles';
  image: string;
  author: string;
  publishDate: string;
  slug: string;
}

const LatestInsights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/insights/latest');
        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }
        const data = await response.json();
        setInsights(data);
      } catch (error) {
        console.error('Error fetching insights:', error);
        setError('Failed to load insights. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'articles':
        return {
          label: 'ARTICLE',
          className: 'bg-dark text-white'
        };
      case 'blogs':
        return {
          label: 'BLOG',
          className: 'bg-accent text-white'
        };
      case 'case-studies':
        return {
          label: 'CASE STUDY',
          className: 'bg-orange-500 text-white'
        };
      default:
        return {
          label: 'CONTENT',
          className: 'bg-gray-500 text-white'
        };
    }
  };

  if (loading) {
    return (
      <section ref={ref} className="section-padding">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Latest <span className="text-accent">Insights</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Stay ahead with our expert analysis and industry perspectives that drive innovation and strategic thinking
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 sm:h-56 rounded-t-xl"></div>
                <div className="p-6 bg-white rounded-b-xl border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={ref} className="section-padding">
        <div className="container px-4 sm:px-6">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section-padding">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Latest <span className="text-accent">Insights</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Stay ahead with our expert analysis and industry perspectives that drive innovation and strategic thinking
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {insights.map((insight, index) => {
            const categoryConfig = getCategoryConfig(insight.category);
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/insights/${insight.category}/${insight.slug}`} className="group block">
                  <article className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent hover:-translate-y-1 transition-all duration-300 touch-manipulation">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={insight.image}
                        alt={insight.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // TODO: Implement bookmark functionality
                        }}
                        className="absolute top-3 left-3 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200 touch-manipulation"
                      >
                        <Bookmark className="h-4 w-4 text-gray-600 hover:text-accent" />
                      </button>

                      <div className="absolute top-3 right-3 z-10">
                        <span className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wide rounded-full ${categoryConfig.className}`}>
                          {categoryConfig.label}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-dark mb-3 sm:mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-tight">
                        {insight.title}
                      </h3>

                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 line-clamp-3">
                        {insight.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                          <div className="flex items-center min-w-0">
                            <User className="h-3 w-3 mr-1.5 flex-shrink-0" />
                            <span className="truncate">{insight.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1.5 flex-shrink-0" />
                            <span className="whitespace-nowrap">{insight.publishDate}</span>
                          </div>
                        </div>
                        
                        <div className="text-accent text-xs sm:text-sm font-medium flex-shrink-0 ml-2">
                          Read more →
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <Link
            href="/insights"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-200 text-base font-semibold touch-manipulation min-h-[52px]"
          >
            View All Insights
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestInsights; 