'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, BarChart3, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const servicesData = {
    sectionTitle: "Our Services",
    sectionSubtitle: "Comprehensive solutions tailored to your business needs",
    innovationTitle: "Innovation Consulting",
    innovationDescription: "Transform your business with cutting-edge innovation strategies and technology-driven solutions that drive growth and competitive advantage.",
    innovationServices: [
      "Technology Scouting",
      "Innovation Roadmapping",
      "Digital Transformation"
    ],
    businessTitle: "Business Consulting",
    businessDescription: "Strategic business advisory services that help you navigate market complexities and achieve sustainable growth.",
    businessServices: [
      "Market Analysis",
      "Growth Strategy",
      "Operational Excellence"
    ],
    valueAccessTitle: "Value & Access",
    valueAccessDescription: "Unlock market opportunities and optimize value chains with our comprehensive access strategies.",
    valueAccessServices: [
      "Market Access",
      "Value Optimization",
      "Partnership Development"
    ]
  };

  const services = [
    {
      id: 1,
      name: servicesData.innovationTitle,
      description: servicesData.innovationDescription,
      features: servicesData.innovationServices,
      icon: 'lightbulb',
      slug: 'innovation-consulting'
    },
    {
      id: 2,
      name: servicesData.businessTitle,
      description: servicesData.businessDescription,
      features: servicesData.businessServices,
      icon: 'barchart3',
      slug: 'business-consulting'
    },
    {
      id: 3,
      name: servicesData.valueAccessTitle,
      description: servicesData.valueAccessDescription,
      features: servicesData.valueAccessServices,
      icon: 'target',
      slug: 'value-access'
    }
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'lightbulb':
        return Lightbulb;
      case 'barchart3':
        return BarChart3;
      case 'target':
        return Target;
      default:
        return Lightbulb;
    }
  };

  return (
    <section ref={ref} className="section-padding">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="section-heading">Services</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            {servicesData.sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.icon);
            
            return (
            <motion.div
                key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="card h-full flex flex-col">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-light rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-accent transition-colors duration-300">
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{service.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                    {service.features.map((feature: string) => (
                    <li key={feature} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                    href={`/services/${service.slug}`}
                  className="inline-flex items-center text-sm sm:text-base text-primary font-medium group-hover:text-accent transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services; 