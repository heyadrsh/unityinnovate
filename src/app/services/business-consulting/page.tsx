import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceContent from '@/components/services/ServiceContent';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export const metadata: Metadata = {
  title: 'Business Consulting - Unity Innovate',
  description: 'Optimize your business operations and accelerate growth with our comprehensive business consulting services. We provide strategic guidance and practical solutions for sustainable success.',
  openGraph: {
    title: 'Business Consulting - Unity Innovate',
    description: 'Optimize your business operations and accelerate growth with our comprehensive business consulting services.',
    url: 'https://unityinnovate.com/services/business-consulting',
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

export default function BusinessConsultingPage() {
  return (
    <main className="min-h-screen">
      <ServiceHero
        title="Business Consulting"
        description="We provide comprehensive business consulting services that help organizations improve efficiency, enhance performance, and achieve sustainable growth."
        breadcrumb="Business Consulting"
        features={[
          "Strategic Planning",
          "Process Optimization",
          "Performance Improvement",
          "Growth Strategy"
        ]}
      />
      <ServiceContent
        overview={{
          title: "Strategic Business Solutions",
          description: "Our business consulting services deliver actionable insights and practical solutions that drive operational excellence and business growth. We work closely with you to understand your challenges and develop tailored strategies for success.",
          features: [
            "Strategic Planning",
            "Process Optimization",
            "Performance Improvement",
            "Change Management",
            "Risk Management",
            "Growth Strategy Development"
          ]
        }}
        approach={{
          title: "Our Consulting Approach",
          description: "We take a collaborative, data-driven approach to business consulting that focuses on delivering measurable results and sustainable improvements.",
          steps: [
            {
              title: "Business Analysis",
              description: "Comprehensive assessment of your current business state"
            },
            {
              title: "Strategy Formulation",
              description: "Developing targeted solutions and action plans"
            },
            {
              title: "Implementation Planning",
              description: "Creating detailed roadmaps for execution"
            },
            {
              title: "Execution Support",
              description: "Guiding implementation and change management"
            },
            {
              title: "Performance Monitoring",
              description: "Tracking progress and adjusting strategies"
            }
          ]
        }}
        expertise={{
          title: "Business Expertise",
          description: "Our consultants bring extensive experience across industries and business functions to deliver comprehensive solutions.",
          areas: [
            "Operational Excellence",
            "Financial Management",
            "Supply Chain Optimization",
            "Market Entry Strategy",
            "Business Model Innovation",
            "Customer Experience Enhancement"
          ]
        }}
      />
      <ServiceInquiryForm
        title="Ready to Optimize Your Business?"
        subtitle="Let's explore how our business consulting services can help you improve performance, reduce costs, and drive sustainable growth."
        formTitle="Business Consultation Request"
      />
    </main>
  );
} 