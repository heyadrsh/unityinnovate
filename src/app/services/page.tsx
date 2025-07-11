import { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceCategories from '@/components/services/ServiceCategories';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceCaseStudies from '@/components/services/ServiceCaseStudies';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export const metadata: Metadata = {
  title: 'Services - Unity Innovate',
  description: 'Explore our comprehensive range of services including Innovation Consulting, Business Consulting, and Value & Access solutions.',
  openGraph: {
    title: 'Services - Unity Innovate',
    description: 'Explore our comprehensive range of services including Innovation Consulting, Business Consulting, and Value & Access solutions.',
    url: 'https://unityinnovate.com/services',
    siteName: 'Unity Innovate',
    images: [
      {
        url: '/logo.webp',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServiceCategories />
      <ServiceFeatures />
      <ServiceCaseStudies />
      <ServiceInquiryForm
        title="Ready to Elevate Your Business?"
        subtitle="Let's explore how our comprehensive services can drive innovation, optimize operations, and create lasting value for your organization."
        formTitle="Request a Consultation"
      />
    </main>
  );
} 