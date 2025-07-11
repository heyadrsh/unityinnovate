'use client';

import { motion } from 'framer-motion';
import { 
  Rocket, 
  LineChart, 
  Users, 
  Globe2, 
  Lightbulb,
  Target
} from 'lucide-react';

const ServiceFeatures = () => {
  const features = [
    {
      icon: Rocket,
      title: 'Accelerated Growth',
      description: 'Fast-track your business growth with our proven methodologies and expert guidance.'
    },
    {
      icon: LineChart,
      title: 'Data-Driven Insights',
      description: 'Make informed decisions backed by comprehensive market analysis and industry data.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Work with seasoned consultants bringing decades of industry and functional expertise.'
    },
    {
      icon: Globe2,
      title: 'Global Perspective',
      description: 'Benefit from our worldwide network and cross-industry best practices.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'Stay ahead of the curve with cutting-edge solutions and innovative approaches.'
    },
    {
      icon: Target,
      title: 'Results Oriented',
      description: 'Achieve measurable outcomes with our performance-driven methodology.'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Why Choose Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the difference of working with a partner committed to your success through our comprehensive suite of professional services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: '15+', label: 'Years Experience' },
            { number: '200+', label: 'Global Clients' },
            { number: '95%', label: 'Client Satisfaction' },
            { number: '500+', label: 'Projects Completed' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures; 