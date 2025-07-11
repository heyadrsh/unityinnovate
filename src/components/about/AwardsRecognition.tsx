'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Award, Trophy, Medal, Star } from 'lucide-react';
import { getAboutPageAward } from '@/lib/data-loaders';
import { AboutPageAward } from '@/lib/types';

const AwardsRecognition = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [awardData, setAwardData] = useState<AboutPageAward | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwardData = async () => {
      try {
        setLoading(true);
        const response = await getAboutPageAward();
        if (response?.data) {
          setAwardData(response.data);
        }
      } catch (error) {
        console.error('Error fetching award data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwardData();
  }, []);

  // Fallback data if Strapi is not available
  const fallbackData = {
    sectionTitle: 'Awards & Recognition',
    sectionSubtitle: 'Recognized for excellence in innovation and strategic consulting',
    awardsList: [
      {
        icon: 'Trophy',
      year: '2024',
      title: 'Best Innovation Consulting Firm',
      organization: 'Global Business Awards'
    },
    {
        icon: 'Award',
      year: '2023',
      title: 'Excellence in Strategic Research',
      organization: 'International Research Council'
    },
    {
        icon: 'Medal',
      year: '2023',
      title: 'Top 50 Consulting Firms',
      organization: 'Consulting Magazine'
    },
    {
        icon: 'Star',
      year: '2022',
      title: 'Rising Star in Business Advisory',
      organization: 'Industry Leaders Forum'
    }
    ],
    certificationsList: [
    'ISO 9001:2015 Certified',
    'ISO 27001:2013 Certified',
    'GDPR Compliant',
    'SOC 2 Type II Certified'
    ],
    clientSatisfactionPercentage: 98,
    projectsCompletedNumber: 150,
    industryAwardsNumber: 50,
    dataSecurityPercentage: 100
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'trophy':
        return Trophy;
      case 'award':
        return Award;
      case 'medal':
        return Medal;
      case 'star':
        return Star;
      default:
        return Award;
    }
  };

  // Use Strapi data or fallback
  const sectionTitle = awardData?.sectionTitle || fallbackData.sectionTitle;
  const sectionSubtitle = awardData?.sectionSubtitle || fallbackData.sectionSubtitle;
  const awards = awardData?.awardsList || fallbackData.awardsList;
  const certifications = awardData?.certificationsList || fallbackData.certificationsList;
  const stats = {
    clientSatisfaction: awardData?.clientSatisfactionPercentage || fallbackData.clientSatisfactionPercentage,
    projectsCompleted: awardData?.projectsCompletedNumber || fallbackData.projectsCompletedNumber,
    industryAwards: awardData?.industryAwardsNumber || fallbackData.industryAwardsNumber,
    dataSecurity: awardData?.dataSecurityPercentage || fallbackData.dataSecurityPercentage
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading awards and recognition...</p>
          </div>
        </div>
      </section>
    );
  }

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
            {sectionTitle.split('&').map((part, index) => 
              index === 1 ? <span key={index} className="text-gradient">&{part}</span> : part
            )}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {awards.map((award: any, index: number) => {
            const IconComponent = getIconComponent(award.icon);
            return (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-accent mb-2">{award.year}</div>
              <h3 className="font-semibold mb-2">{award.title}</h3>
              <p className="text-sm text-gray-600">{award.organization}</p>
            </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.clientSatisfaction}%</div>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.projectsCompleted}+</div>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.industryAwards}+</div>
            <p className="text-gray-600">Industry Awards</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.dataSecurity}%</div>
            <p className="text-gray-600">Data Security</p>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Certifications & Compliance</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert: string, index: number) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                <span className="text-gray-700 font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsRecognition; 
 