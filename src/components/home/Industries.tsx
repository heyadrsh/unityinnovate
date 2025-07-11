'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Building2, FlaskConical, ShieldCheck, Zap, Truck } from 'lucide-react';
import Link from 'next/link';
import { getHomepageIndustriesOverview } from '@/lib/data-loaders';
import { HomepageIndustriesOverview } from '@/lib/types';

const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [industriesData, setIndustriesData] = useState<HomepageIndustriesOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustriesData = async () => {
      try {
        setLoading(true);
        const response = await getHomepageIndustriesOverview();
        if (response?.data) {
          setIndustriesData(response.data);
        }
      } catch (error) {
        console.error('Error fetching industries overview data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustriesData();
  }, []);

  // Fallback data
  const fallbackData = {
    sectionTitle: 'Industries We Transform',
    sectionSubtitle: 'Deep sector expertise across innovation-driven industries',
    pharmaceuticalsTitle: 'Pharmaceuticals',
    pharmaceuticalsDescription: 'AI-driven drug discovery, real-world evidence strategies, and clinical trial digitization.',
    cosmeticsTitle: 'Cosmetics & Personal Care',
    cosmeticsDescription: 'Clean formulation design, digital product validation, and regulatory intelligence.',
    consumerHealthTitle: 'Consumer Health',
    consumerHealthDescription: 'Connected wellness devices, consumer analytics, and product certification roadmaps.',
    energyStorageTitle: 'Energy & Storage',
    energyStorageDescription: 'ESG impact modeling, sustainability strategies, and battery technology scoping.',
    mobilityTitle: 'Mobility & Automotives',
    mobilityDescription: 'MaaS business modeling, EV roadmap development, and smart mobility solutions.'
  };

  // Use Strapi data or fallback
  const sectionTitle = industriesData?.sectionTitle || fallbackData.sectionTitle;
  const sectionSubtitle = industriesData?.sectionSubtitle || fallbackData.sectionSubtitle;

  const industries = [
    {
      icon: Building2,
      title: industriesData?.pharmaceuticalsTitle || fallbackData.pharmaceuticalsTitle,
      description: industriesData?.pharmaceuticalsDescription || fallbackData.pharmaceuticalsDescription
    },
    {
      icon: FlaskConical,
      title: industriesData?.cosmeticsTitle || fallbackData.cosmeticsTitle,
      description: industriesData?.cosmeticsDescription || fallbackData.cosmeticsDescription
    },
    {
      icon: ShieldCheck,
      title: industriesData?.consumerHealthTitle || fallbackData.consumerHealthTitle,
      description: industriesData?.consumerHealthDescription || fallbackData.consumerHealthDescription
    },
    {
      icon: Zap,
      title: industriesData?.energyStorageTitle || fallbackData.energyStorageTitle,
      description: industriesData?.energyStorageDescription || fallbackData.energyStorageDescription
    },
    {
      icon: Truck,
      title: industriesData?.mobilityTitle || fallbackData.mobilityTitle,
      description: industriesData?.mobilityDescription || fallbackData.mobilityDescription
    }
  ];

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            {sectionTitle.includes('Transform') ? (
              <>
                {sectionTitle.split(' Transform')[0]} <span className="text-gradient">Transform</span>
              </>
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl p-4 sm:p-6 h-full border border-gray-200 hover:border-accent transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-100 border border-gray-200 p-2.5 sm:p-3 mb-3 sm:mb-4 group-hover:bg-gray-50 transition-colors">
                  <industry.icon className="w-full h-full text-gray-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{industry.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-6 sm:p-8 text-white text-center"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 leading-tight">
            With extensive sector expertise, delivering targeted insights and strategic consulting solutions across industries
          </h3>
          <Link href="/industries" className="bg-white text-primary px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            Explore All Industries
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries; 