import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceContent from '@/components/services/ServiceContent';
import ConsultationSection from '@/components/services/ConsultationSection';

export const metadata: Metadata = {
  title: 'Value & Access - Unity Innovate',
  description: 'Maximize your market potential and ensure optimal value realization with our specialized value and access solutions. We help navigate complex market dynamics and regulatory landscapes.',
  openGraph: {
    title: 'Value & Access - Unity Innovate',
    description: 'Maximize your market potential and ensure optimal value realization with our specialized value and access solutions.',
    url: 'https://unityinnovate.com/services/value-access',
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

export default function ValueAccessPage() {
  const heroProps = {
    title: "Value & Access",
    description: "Maximize your market potential and ensure optimal value realization with our specialized value and access solutions. We help navigate complex market dynamics and regulatory landscapes.",
    breadcrumb: "Value & Access",
    features: [
      "Market Access Strategy",
      "Value Proposition Development",
      "Pricing Strategy",
      "Stakeholder Engagement",
      "Market Research & Analysis"
    ]
  };

  const consultationProps = {
    title: "Ready to Optimize Your Market Access Strategy?",
    description: "Let's explore how our value and access solutions can help you maximize market potential, optimize pricing strategies, and ensure sustainable growth.",
    contactInfo: {
      email: "sales@unityinnovate.com",
      phone: "+91-141-4920704",
      address: "Second Home Spitalfields, London"
    }
  };

  return (
    <div className="min-h-screen">
      <ServiceHero {...heroProps} />
      <ServiceContent
        overview={{
          title: "Value & Access Solutions",
          description: "In today's complex healthcare and technology markets, demonstrating and capturing value is critical for success. Our Value & Access services help organizations navigate intricate market dynamics, develop compelling value propositions, and ensure optimal market access.",
          features: [
            "Market Access Strategy",
            "Value Proposition Development",
            "Pricing Strategy",
            "Stakeholder Engagement",
            "Market Research & Analysis",
            "Value Chain Optimization"
          ]
        }}
        approach={{
          title: "Our Value & Access Approach",
          description: "We take a comprehensive, evidence-based approach to help organizations optimize their market value and access strategies.",
          steps: [
            {
              title: "Market Assessment",
              description: "We analyze market dynamics, regulatory requirements, and competitive landscape to identify key opportunities and challenges."
            },
            {
              title: "Value Story Development",
              description: "We help craft compelling value narratives supported by robust evidence and aligned with stakeholder needs."
            },
            {
              title: "Access Strategy",
              description: "We develop comprehensive market access strategies tailored to your specific market context and objectives."
            },
            {
              title: "Pricing Optimization",
              description: "We help determine optimal pricing strategies that maximize value capture while ensuring market access."
            },
            {
              title: "Stakeholder Engagement",
              description: "We design and implement effective engagement strategies for key decision-makers and influencers."
            }
          ]
        }}
        expertise={{
          title: "Areas of Value & Access Expertise",
          description: "Our value and access practice brings together specialized expertise across key areas to help you succeed in complex markets.",
          areas: [
            "Market Access Strategy",
            "Value Proposition Development",
            "Pricing & Reimbursement",
            "Health Economics",
            "Regulatory Navigation",
            "Stakeholder Management",
            "Evidence Generation",
            "Market Analytics"
          ]
        }}
      />
      <ConsultationSection {...consultationProps} />
    </div>
  );
} 