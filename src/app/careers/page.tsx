import { Metadata } from 'next';
import CareersHero from '@/components/careers/CareersHero';
import CultureSection from '@/components/careers/CultureSection';
import LifeSection from '@/components/careers/LifeSection';
import CareerOpportunities from '@/components/careers/CareerOpportunities';
import CareersCTA from '@/components/careers/CareersCTA';
import Newsletter from '@/components/insights/Newsletter';

export const metadata: Metadata = {
  title: 'Careers - Unity Innovate',
  description: 'Join Unity Innovate and be one step closer to your dream job. Explore career opportunities with a cutting-edge global insights and innovation partner.',
  keywords: 'careers, jobs, Unity Innovate, consulting careers, innovation jobs, research careers'
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CultureSection />
      <LifeSection />
      <CareerOpportunities />
      <CareersCTA />
      <Newsletter />
    </>
  );
} 