import { Metadata } from 'next';
import CompanyBlueprint from '@/components/about/CompanyBlueprint';

export const metadata: Metadata = {
  title: 'About Us - Unity Innovate',
  description: 'Learn about Unity Innovate, our mission, vision, and core values that drive our strategic intelligence and innovation consulting.',
};

export default function AboutPage() {
  return (
    <>
      <CompanyBlueprint />
    </>
  );
} 