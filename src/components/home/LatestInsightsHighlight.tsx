'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const LatestInsightsHighlight = () => {
  // Featured content with one main highlight and two supporting items
  const featuredInsight = {
    id: 1,
    type: 'Featured Article',
    title: 'The Future of Innovation Consulting: Trends Shaping 2025',
    excerpt: 'An in-depth analysis of emerging trends and methodologies that will define innovation consulting in the coming year, from AI integration to sustainable practices.',
    date: 'July 11, 2025',
    href: '/insights/articles/future-innovation-consulting-2025',
    readTime: '10 min read',
    isNew: true
  };

  const supportingInsights = [
    {
      id: 2,
      type: 'Case Study',
      title: 'Digital Health Transformation Success',
      date: 'July 10, 2025',
      href: '/insights/case-studies/digital-health-transformation',
      readTime: '6 min read'
    },
    {
      id: 3,
      type: 'Blog',
      title: 'Sustainable Innovation Strategies',
      date: 'July 9, 2025',
      href: '/insights/blogs/sustainable-innovation-strategies',
      readTime: '4 min read'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay ahead with our latest research, analysis, and strategic insights
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Link href={featuredInsight.href}>
                <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 group h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {featuredInsight.type}
                    </span>
                    {featuredInsight.isNew && (
                      <span className="bg-accent px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    {featuredInsight.title}
                  </h3>
                  <p className="text-white/90 mb-6 text-lg leading-relaxed">
                    {featuredInsight.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{featuredInsight.date}</span>
                      </div>
                      <span className="text-sm">{featuredInsight.readTime}</span>
                    </div>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Supporting Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {supportingInsights.map((insight, index) => (
                <Link key={insight.id} href={insight.href}>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-primary">
                        {insight.type}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{insight.readTime}</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-3 text-dark group-hover:text-primary transition-colors duration-200 leading-tight">
                      {insight.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {insight.date}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* View All Link */}
              <div className="pt-4">
                <Link
                  href="/insights"
                  className="flex items-center justify-center gap-2 w-full bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
                >
                  View All Insights
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestInsightsHighlight; 