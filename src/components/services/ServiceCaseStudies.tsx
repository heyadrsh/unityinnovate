'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ServiceCaseStudies = () => {
  const caseStudies = [
    {
      title: 'Digital Transformation for Global Pharma',
      category: 'Innovation Consulting',
      description: 'Led a comprehensive digital transformation initiative for a leading pharmaceutical company, resulting in 40% operational efficiency improvement.',
      image: '/case-studies/pharma-digital.jpg',
      href: '/insights/case-studies/pharma-digital-transformation'
    },
    {
      title: 'Market Entry Strategy Success',
      category: 'Business Consulting',
      description: 'Developed and executed a successful market entry strategy for a tech company expanding into APAC, achieving 200% growth in first year.',
      image: '/case-studies/market-entry.jpg',
      href: '/insights/case-studies/market-entry-strategy'
    },
    {
      title: 'Value-Based Healthcare Model',
      category: 'Value & Access',
      description: 'Implemented an innovative value-based care model for a healthcare provider, improving patient outcomes while reducing costs by 25%.',
      image: '/case-studies/healthcare-value.jpg',
      href: '/insights/case-studies/healthcare-value-model'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore how we've helped organizations across industries achieve their strategic objectives and drive meaningful results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={study.href} className="block">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent z-10" />
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-primary text-sm font-medium px-3 py-1 rounded-full">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {study.description}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      Read Case Study
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/insights/case-studies"
            className="btn-primary inline-flex items-center"
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCaseStudies; 