'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar, User, BookOpen, FileText, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LatestInsightsSimple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Static content - one from each category (most recent)
  const insights = [
    {
      id: 1,
      type: 'blog',
      title: 'Digital Transformation: A Complete Guide for Business Leaders',
      excerpt: 'A comprehensive guide for business leaders navigating digital transformation in the modern business landscape.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center',
      author: 'Unity Innovate',
      date: 'July 11, 2025',
      href: '/insights/blogs/digital-transformation-complete-guide',
      icon: BookOpen,
      category: 'BLOG'
    },
    {
      id: 2,
      type: 'article',
      title: 'Market Research Trends 2024: Emerging Methodologies',
      excerpt: 'Key insights into emerging market research methodologies and consumer behavior patterns that are shaping the industry.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
      author: 'Unity Innovate',
      date: 'July 11, 2025',
      href: '/insights/articles/market-research-trends-2024',
      icon: FileText,
      category: 'ARTICLE'
    },
    {
      id: 3,
      type: 'case-study',
      title: 'Pharma Innovation Success: Drug Discovery Acceleration',
      excerpt: 'How we helped a leading pharmaceutical company accelerate their drug discovery process by 40% using innovative AI technologies.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
      author: 'Unity Innovate',
      date: 'July 11, 2025',
      href: '/insights/case-studies/pharma-drug-discovery-acceleration',
      icon: Briefcase,
      category: 'CASE STUDY'
    }
  ];

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-500';
      case 'article':
        return 'bg-green-500';
      case 'case-study':
        return 'bg-purple-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay ahead with our expert analysis and industry perspectives that drive 
            innovation and strategic thinking
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={insight.href}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={insight.image}
                        alt={insight.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(insight.type)}`}>
                          <IconComponent className="w-3 h-3" />
                          {insight.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-dark group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {insight.excerpt}
                      </p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{insight.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{insight.date}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            View All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestInsightsSimple; 