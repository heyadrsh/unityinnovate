'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, BarChart3, Target } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getServices } from '@/lib/data-loaders';
import { StrapiService } from '@/lib/types';
import { extractTextFromContent } from '@/lib/utils';

const ServiceCategories = () => {
  const [services, setServices] = useState<StrapiService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();
        if (response?.data) {
          setServices(response.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'lightbulb':
      case 'innovation':
        return Lightbulb;
      case 'bar-chart-3':
      case 'barchart3':
      case 'analytics':
      case 'business':
        return BarChart3;
      case 'target':
      case 'value':
      case 'access':
        return Target;
      default:
        return Lightbulb;
    }
  };

  const getServiceFeatures = (service: StrapiService) => {
    if (service.features && Array.isArray(service.features)) {
      return service.features.slice(0, 5);
    }
    // Fallback features based on service name
    if (service.name.toLowerCase().includes('innovation')) {
      return [
        'Innovation Strategy Development',
        'Digital Transformation',
        'Product Innovation & Design',
        'Technology Integration',
        'Innovation Culture Building'
      ];
    } else if (service.name.toLowerCase().includes('business')) {
      return [
        'Strategic Planning',
        'Process Optimization',
        'Market Entry Strategy',
        'Business Model Innovation',
        'Performance Improvement'
      ];
    } else if (service.name.toLowerCase().includes('value') || service.name.toLowerCase().includes('access')) {
      return [
        'Market Access Strategy',
        'Value Proposition Development',
        'Pricing Strategy',
        'Stakeholder Engagement',
        'Market Research & Analysis'
      ];
    }
    return ['Consulting Services', 'Strategic Planning', 'Expert Guidance'];
  };

  const getServiceDescription = (service: StrapiService) => {
    if (service.shortDescription) {
      return service.shortDescription;
    }
    return extractTextFromContent(service.description);
  };

  const getServiceColor = (index: number) => {
    const colors = [
      'from-blue-500/20 to-cyan-500/20',
      'from-emerald-500/20 to-teal-500/20',
      'from-purple-500/20 to-pink-500/20'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Our Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of services designed to help your organization thrive in today's dynamic business environment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative group animate-pulse">
                <div className="relative z-10 p-8 bg-gray-100 border border-gray-200 rounded-2xl h-full">
                  <div className="w-12 h-12 bg-gray-200 rounded mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="space-y-3 mb-8">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-5 h-5 bg-gray-200 rounded mt-1 mr-2"></div>
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            Our Service Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of services designed to help your organization thrive in today's dynamic business environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.icon);
            const features = getServiceFeatures(service);
            const description = getServiceDescription(service);
            const colorClass = getServiceColor(index);
            
            return (
            <motion.div
                key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colorClass}`} />
              <div className="relative z-10 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300">
                  <IconComponent className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    {service.name}
                </h3>
                <p className="text-gray-600 mb-6">
                    {description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                    {features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                  <Link href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
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

export default ServiceCategories; 