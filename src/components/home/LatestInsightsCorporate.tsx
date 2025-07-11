'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, FileText, BookOpen, Briefcase } from 'lucide-react';
import Link from 'next/link';

const LatestInsightsCorporate = () => {
  // Professional static content
  const insights = [
    {
      id: 1,
      type: 'Blog Post',
      title: 'Strategic Innovation in the Post-Digital Era',
      excerpt: 'Key strategies for maintaining innovation momentum in rapidly evolving markets.',
      date: 'July 11, 2025',
      href: '/insights/blogs/strategic-innovation-post-digital',
      icon: BookOpen,
      readTime: '5 min read'
    },
    {
      id: 2,
      type: 'Research Article',
      title: 'Emerging Technologies in Pharmaceutical Development',
      excerpt: 'Comprehensive analysis of breakthrough technologies transforming drug discovery.',
      date: 'July 10, 2025',
      href: '/insights/articles/emerging-tech-pharma',
      icon: FileText,
      readTime: '8 min read'
    },
    {
      id: 3,
      type: 'Case Study',
      title: 'Accelerating Time-to-Market: A Success Story',
      excerpt: 'How we helped reduce product development cycles by 45% through strategic consulting.',
      date: 'July 9, 2025',
      href: '/insights/case-studies/accelerating-time-to-market',
      icon: Briefcase,
      readTime: '6 min read'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="text-primary">Insights</span>
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed with our expert analysis and strategic perspectives
            </p>
          </div>

          <div className="space-y-6">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={insight.href}>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-primary">
                              {insight.type}
                            </span>
                            <span className="text-gray-300">•</span>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {insight.date}
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">
                              {insight.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-dark group-hover:text-primary transition-colors duration-200">
                            {insight.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {insight.excerpt}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
            >
              Explore All Insights
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestInsightsCorporate; 