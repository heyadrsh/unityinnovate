'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const OfficeLocations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const offices = [
    {
      region: 'North America',
      country: 'United States',
      address: 'Coming Soon',
      phone: '+1 (555) 123-4567',
      email: 'us@unityinnovate.com'
    },
    {
      region: 'Europe',
      country: 'United Kingdom',
      address: 'Second Home Spitalfields, 68 Hanbury Street, London E1 5JL',
      phone: '+44 20 1234 5678',
      email: 'uk@unityinnovate.com'
    },
    {
      region: 'Asia',
      country: 'India',
      address: 'Will be shared soon',
      phone: '+91-141-4920704',
      email: 'india@unityinnovate.com'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Office <span className="text-gradient">Locations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Global presence with local expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={office.country}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{office.region}</h3>
              <p className="text-accent font-medium mb-4">{office.country}</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-gray-600 text-sm">{office.address}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href={`tel:${office.phone}`} className="text-gray-600 text-sm hover:text-primary transition-colors">
                    {office.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href={`mailto:${office.email}`} className="text-gray-600 text-sm hover:text-primary transition-colors">
                    {office.email}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations; 