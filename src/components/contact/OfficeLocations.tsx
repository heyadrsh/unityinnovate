'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const OfficeLocations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const offices = [
    {
      region: 'Asia',
      country: 'India',
      city: 'New Delhi',
      address: '2088, Patel Nagar West, New Delhi, India - 110008',
      phone: '+91 7835877980',
      email: 'india@unityinnovate.com',
      status: 'Active',
      flag: '🇮🇳'
    }
  ];

  return (
    <section id="office-locations" ref={ref} className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Office Location</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Headquartered in New Delhi, serving clients across the globe
          </p>
        </motion.div>

        {/* Single Office - Centered */}
        <div className="max-w-2xl mx-auto mb-12">
          {offices.map((office, index) => (
            <motion.div
              key={office.country}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-white rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Status Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                {office.status} Headquarters
              </div>

              {/* Flag and Region - Centered */}
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">{office.flag}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{office.region}</h3>
                <p className="text-accent font-semibold text-xl">{office.country}</p>
              </div>

              {/* City */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <Globe className="w-6 h-6 text-primary" />
                <span className="font-semibold text-gray-700 text-lg">{office.city}</span>
              </div>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 justify-center">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-600 leading-relaxed text-center max-w-md">{office.address}</p>
                </div>
                
                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Phone */}
                  <div className="text-center">
                    <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
                    <a 
                      href={`tel:${office.phone}`} 
                      className="text-gray-600 hover:text-primary transition-colors font-medium"
                    >
                      {office.phone}
                    </a>
                  </div>
                  
                  {/* Email */}
                  <div className="text-center">
                    <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                    <a 
                      href={`mailto:${office.email}`} 
                      className="text-gray-600 hover:text-primary transition-colors font-medium"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <motion.div
                className="mt-8 pt-6 border-t border-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href={`mailto:${office.email}`}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg text-lg"
                >
                  Contact {office.city}
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Global Reach Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Global Impact from <span className="text-accent">New Delhi</span>
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Our centralized operations enable us to deliver world-class consulting services to clients across continents
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1</div>
              <div className="text-white/90 text-sm">Global Headquarters</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-white/90 text-sm">Expert Consultants</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-white/90 text-sm">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-white/90 text-sm">Global Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfficeLocations; 