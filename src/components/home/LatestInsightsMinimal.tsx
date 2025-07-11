'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

const LatestInsightsMinimal = () => {
  // Simple static content
  const insights = [
    {
      id: 1,
      type: 'Blog',
      title: 'Digital Transformation in Healthcare',
      date: 'July 11, 2025',
      href: '/insights/blogs/digital-transformation-healthcare',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 2,
      type: 'Article',
      title: 'AI-Driven Market Research Insights',
      date: 'July 10, 2025',
      href: '/insights/articles/ai-market-research',
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 3,
      type: 'Case Study',
      title: 'Pharmaceutical Innovation Success',
      date: 'July 9, 2025',
      href: '/insights/case-studies/pharma-innovation',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert analysis and industry perspectives
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={insight.href}>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${insight.color}`}>
                      {insight.type}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {insight.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {insight.date}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
          >
            View All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestInsightsMinimal; 