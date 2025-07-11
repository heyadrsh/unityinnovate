'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Heart, Sparkles, Pill, Car, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getIndustries } from '@/lib/data-loaders';
import Image from 'next/image';

interface Industry {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  solutions?: any[];
  orderIndex?: number;
  isActive: boolean;
  featuredImage?: {
    url: string;
    alternativeText?: string;
  };
  icon?: string;
}

const IndustryCategories = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for industries
  const getIconComponent = (iconName?: string) => {
    const icons: { [key: string]: any } = {
      'zap': Zap,
      'heart': Heart,
      'sparkles': Sparkles,
      'pill': Pill,
      'car': Car,
      'building2': Building2,
    };
    return icons[iconName?.toLowerCase() || 'building2'] || Building2;
  };

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const response = await getIndustries();
        if (response?.data) {
          setIndustries(response.data);
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
        // Fallback to hardcoded data if Strapi fails
        setIndustries([
          {
            id: '1',
            name: 'Energy & Storage',
            slug: 'energy-storage',
            shortDescription: 'Leading the transition to sustainable energy with cutting-edge storage technologies and renewable solutions.',
            description: 'We drive innovation in clean energy infrastructure and smart grid systems.',
            isActive: true,
            icon: 'zap'
          },
          {
            id: '2',
            name: 'Consumer Health',
            slug: 'consumer-health',
            shortDescription: 'Empowering consumers with innovative health solutions and wellness products.',
            description: 'We combine digital health technologies with traditional healthcare to improve patient outcomes.',
            isActive: true,
            icon: 'heart'
          },
          {
            id: '3',
            name: 'Cosmetics & Personal Care',
            slug: 'cosmetics-personal-care',
            shortDescription: 'Creating advanced personal care solutions that enhance quality of life.',
            description: 'Through innovative formulations and sustainable practices.',
            isActive: true,
            icon: 'sparkles'
          },
          {
            id: '4',
            name: 'Pharmaceuticals',
            slug: 'pharmaceuticals',
            shortDescription: 'Advancing healthcare through innovative pharmaceutical solutions and research.',
            description: 'We accelerate drug development and optimize clinical research processes.',
            isActive: true,
            icon: 'pill'
          },
          {
            id: '5',
            name: 'Mobility & Automotives',
            slug: 'mobility-automotives',
            shortDescription: 'Shaping the future of transportation with sustainable and smart mobility solutions.',
            description: 'We drive innovation in electric vehicles and connected transport systems.',
            isActive: true,
            icon: 'car'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading industries...</p>
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
            Industry Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We deliver transformative solutions across diverse industries, combining deep sector knowledge with cutting-edge innovation to drive sustainable growth and competitive advantage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = getIconComponent(industry.icon);
            const solutions = industry.solutions || [];
            
            return (
            <motion.div
                key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300 h-full">
                  {industry.featuredImage?.url ? (
                    <div className="w-12 h-12 mb-6 relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${industry.featuredImage.url}`}
                        alt={industry.featuredImage.alternativeText || industry.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <IconComponent className="w-12 h-12 text-primary mb-6" />
                  )}
                  
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    {industry.name}
                </h3>
                <p className="text-gray-600 mb-6">
                    {industry.shortDescription}
                </p>
                
                  {/* Solutions/Advantages */}
                  {solutions.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
                        Our Solutions
                  </h4>
                  <ul className="space-y-3">
                        {solutions.slice(0, 5).map((solution: any, i: number) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">
                              {typeof solution === 'string' ? solution : solution.name || solution.title}
                            </span>
                      </li>
                    ))}
                  </ul>
                </div>
                  )}

                  <Link href={`/industries/${industry.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors group-hover:translate-x-1 transform duration-200"
                >
                  Explore Solutions
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

export default IndustryCategories; 
 