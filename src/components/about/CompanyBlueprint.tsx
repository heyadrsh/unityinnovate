'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Lightbulb, Shield } from 'lucide-react';

const CompanyBlueprint = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every project, delivering insights that drive real business impact.'
    },
    {
      icon: Eye,
      title: 'Integrity',
      description: 'High-integrity research and transparent advisory services are at the core of our approach.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and methodologies to stay ahead of the curve.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Building lasting partnerships based on trust, reliability, and consistent delivery.'
    }
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Company <span className="text-gradient">Blueprint</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The foundation that drives our success
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-primary to-secondary p-8 rounded-xl text-white"
          >
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-white/90">
              To empower innovation and strategic decision-making through high-integrity, insight-driven research and advisory solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-secondary to-accent p-8 rounded-xl text-white"
          >
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-white/90">
              Being the most reliable source for strategic intelligence and innovation-led research to help businesses all over the world foresee change, grasp opportunities, and confidently lead in fast-growing sectors.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyBlueprint; 