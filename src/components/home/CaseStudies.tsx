'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Award, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const caseStudies = [
    {
      title: 'Digital Transformation for Global Pharma Leader',
      client: 'Fortune 500 Pharmaceutical Company',
      challenge: 'Needed to accelerate drug discovery process and reduce time-to-market',
      solution: 'Implemented AI-driven drug discovery platform with predictive analytics',
      results: [
        { icon: TrendingUp, metric: '40%', label: 'Faster drug discovery' },
        { icon: Award, metric: '$50M', label: 'Cost savings' },
        { icon: Users, metric: '3x', label: 'Research efficiency' }
      ],
      industry: 'Pharmaceuticals'
    },
    {
      title: 'Sustainable Innovation Strategy for Beauty Brand',
      client: 'Leading Personal Care Company',
      challenge: 'Required sustainable product formulation without compromising quality',
      solution: 'Developed clean beauty framework with digital validation tools',
      results: [
        { icon: TrendingUp, metric: '60%', label: 'Sustainable products' },
        { icon: Award, metric: '25%', label: 'Market share growth' },
        { icon: Users, metric: '95%', label: 'Customer satisfaction' }
      ],
      industry: 'Cosmetics & Personal Care'
    }
  ];

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Success <span className="section-heading">Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real impact delivered for industry leaders
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 h-full border border-gray-200 hover:border-accent transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-sm text-accent font-medium">{study.industry}</span>
                    <h3 className="text-2xl font-semibold mt-2">{study.title}</h3>
                    <p className="text-gray-600 mt-1">{study.client}</p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Challenge</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Solution</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Key Results</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {study.results.map((result) => (
                      <div key={result.label} className="text-center">
                        <div className="w-10 h-10 bg-light rounded-lg flex items-center justify-center mx-auto mb-2">
                          <result.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-primary">{result.metric}</div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/insights/case-studies" className="btn-primary inline-flex items-center">
            View All Case Studies
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies; 