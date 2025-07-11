import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import TeamSection from '@/components/about/TeamSection';
import CompanyBlueprint from '@/components/about/CompanyBlueprint';
import AwardsRecognition from '@/components/about/AwardsRecognition';

export const metadata: Metadata = {
  title: 'About Us - Unity Innovate',
  description: 'Learn about Unity Innovate, our mission, vision, team, and how we empower businesses with strategic intelligence and innovation.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyBlueprint />
      <TeamSection />
      <AwardsRecognition />
    </>
  );
} 