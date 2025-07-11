'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe } from 'lucide-react';

const GlobalPresence = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const regions = [
    { name: 'North America', countries: ['United States', 'Canada'] },
    { name: 'Europe', countries: ['United Kingdom', 'Germany'] },
    { name: 'Asia', countries: ['India'] }
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
            Global <span className="text-gradient">Presence</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Serving clients worldwide with strategic locations across three continents
          </p>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 mb-12"
        >
          <div className="h-96 flex items-center justify-center">
            <div className="text-center text-white">
              <Globe className="w-24 h-24 mx-auto mb-4 opacity-50" />
              <p className="text-xl font-medium">Interactive Global Map</p>
              <p className="text-white/70 mt-2">Coming Soon</p>
            </div>
          </div>
        </motion.div>

        {/* Regions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-4">{region.name}</h3>
              <ul className="space-y-2">
                {region.countries.map((country) => (
                  <li key={country} className="text-gray-600">
                    {country}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to work with a global partner who understands your local market?
          </p>
          <a href="mailto:sales@unityinnovate.com" className="btn-primary inline-flex items-center">
            Get in Touch Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalPresence; 