'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Globe2, Award } from 'lucide-react';
import Link from 'next/link';
import { extractTextFromContent } from '@/lib/utils';

interface CompanyOverviewProps {
  whoWeAreData?: {
    sectionTitle?: string;
    content?: any; // Rich text markdown from Strapi
    sectionImage?: any;
  };
  featuresData?: {
    strategicIntelligenceTitle?: string;
    strategicIntelligenceDescription?: string;
    expertConsultantsTitle?: string;
    expertConsultantsDescription?: string;
    globalReachTitle?: string;
    globalReachDescription?: string;
    provenExcellenceTitle?: string;
    provenExcellenceDescription?: string;
  };
}

const CompanyOverview = ({ whoWeAreData, featuresData }: CompanyOverviewProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Fallback content if Strapi data is not available
  const fallbackContent = {
    sectionTitle: "Who We Are",
    content: "Unity Innovate is a cutting-edge global insights and innovation partner that enables companies to make bold, proactive choices in a world that is changing quickly. Since its founding in 2020, Unity Innovate has grown to become a reputable brand in the fields of intelligence, research, and strategic consulting.\n\nWith offices strategically positioned in the US, UK, and India, and a core staff of more than 50+ knowledgeable consultants and researchers, we provide unparalleled local expertise and international viewpoints."
  };

  const fallbackFeatures = [
    {
      icon: TrendingUp,
      title: 'Strategic Intelligence',
      description: 'Data-driven insights that power informed decision-making'
    },
    {
      icon: Users,
      title: 'Expert Consultants',
      description: '50+ industry experts with deep domain knowledge'
    },
    {
      icon: Globe2,
      title: 'Global Reach',
      description: 'Offices in US, UK, and India serving clients worldwide'
    },
    {
      icon: Award,
      title: 'Proven Excellence',
      description: 'Trusted by leading companies across industries'
    }
  ];

  // Use Strapi data or fallback
  const sectionTitle = whoWeAreData?.sectionTitle || fallbackContent.sectionTitle;
  const content = whoWeAreData?.content 
    ? extractTextFromContent(whoWeAreData.content)
    : fallbackContent.content;

  // Split content into paragraphs (handling both \n\n and Markdown paragraphs)
  const contentParagraphs = content.split(/\n\n|\r\n\r\n/).filter(p => p.trim().length > 0);

  // Use Strapi features data or fallback
  const features = [
    {
      icon: TrendingUp,
      title: featuresData?.strategicIntelligenceTitle || fallbackFeatures[0].title,
      description: featuresData?.strategicIntelligenceDescription || fallbackFeatures[0].description
    },
    {
      icon: Users,
      title: featuresData?.expertConsultantsTitle || fallbackFeatures[1].title,
      description: featuresData?.expertConsultantsDescription || fallbackFeatures[1].description
    },
    {
      icon: Globe2,
      title: fallbackFeatures[2].title, // Use fallback since this field doesn't exist in schema
      description: fallbackFeatures[2].description
    },
    {
      icon: Award,
      title: featuresData?.provenExcellenceTitle || fallbackFeatures[3].title,
      description: featuresData?.provenExcellenceDescription || fallbackFeatures[3].description
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Partner in <span className="section-heading">Future Readiness</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Empowering tomorrow's businesses, today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{sectionTitle}</h3>
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {paragraph}
            </p>
            ))}
            <Link href="/about" className="btn-primary inline-flex items-center text-sm sm:text-base">
              Learn More About Us
            </Link>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-light rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold mb-2">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-br from-primary to-secondary p-6 sm:p-8 rounded-xl text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">Our Mission</h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              To empower innovation and strategic decision-making through high-integrity, insight-driven research and advisory solutions.
            </p>
          </div>
          <div className="bg-gradient-to-br from-secondary to-accent p-6 sm:p-8 rounded-xl text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">Our Vision</h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Being the most reliable source for strategic intelligence and innovation-led research to help businesses all over the world foresee change, grasp opportunities, and confidently lead in fast-growing sectors.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyOverview; 