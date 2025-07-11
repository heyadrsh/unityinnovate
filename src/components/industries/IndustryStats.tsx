'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    value: "20+",
    label: "Years of Industry Experience",
    description: "Delivering innovative solutions across sectors"
  },
  {
    value: "500+",
    label: "Projects Completed",
    description: "Successful transformations across industries"
  },
  {
    value: "50+",
    label: "Industry Partners",
    description: "Strategic collaborations driving innovation"
  },
  {
    value: "95%",
    label: "Client Satisfaction",
    description: "Consistently exceeding expectations"
  }
];

const IndustryStats = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-dark to-primary text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-heading font-bold mb-4">
            Industry Impact
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our track record of delivering transformative solutions across industries speaks for itself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                <div className="text-5xl font-bold font-heading mb-2 text-accent">
                  {stat.value}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {stat.label}
                </h3>
                <p className="text-white/70">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryStats; 
 