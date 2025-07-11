import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceContent from '@/components/services/ServiceContent';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export const metadata: Metadata = {
  title: 'Innovation Consulting - Unity Innovate',
  description: 'Drive transformative change and create breakthrough solutions with our innovation consulting services. We help organizations identify opportunities, develop new products, and implement cutting-edge technologies.',
  openGraph: {
    title: 'Innovation Consulting - Unity Innovate',
    description: 'Drive transformative change and create breakthrough solutions with our innovation consulting services.',
    url: 'https://unityinnovate.com/services/innovation-consulting',
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

export default function InnovationConsultingPage() {
  return (
    <main className="min-h-screen">
      <ServiceHero
        title="Innovation Consulting"
        description="We help organizations embrace digital transformation, leverage emerging technologies, and create innovative solutions that drive growth and competitive advantage."
        breadcrumb="Innovation Consulting"
        features={[
          "Digital Transformation",
          "Technology Innovation",
          "Product Development",
          "Innovation Strategy"
        ]}
      />
      <ServiceContent
        overview={{
          title: "Driving Digital Transformation",
          description: "Our innovation consulting services help organizations navigate the rapidly evolving digital landscape. We combine deep industry expertise with cutting-edge technology insights to create transformative solutions that deliver measurable results.",
          features: [
            "Digital Strategy Development",
            "Technology Assessment & Selection",
            "Innovation Roadmap Creation",
            "Digital Product Development",
            "Emerging Technology Integration",
            "Innovation Culture Building"
          ]
        }}
        approach={{
          title: "Our Approach to Innovation",
          description: "We take a systematic, human-centered approach to innovation that balances creativity with practicality. Our process ensures that innovation initiatives are aligned with business objectives and deliver tangible value.",
          steps: [
            {
              title: "Discovery & Assessment",
              description: "Understanding your current state, challenges, and opportunities"
            },
            {
              title: "Strategy Development",
              description: "Creating a tailored innovation roadmap aligned with your goals"
            },
            {
              title: "Solution Design",
              description: "Developing innovative solutions using cutting-edge technologies"
            },
            {
              title: "Implementation",
              description: "Executing the strategy with agile methodologies"
            },
            {
              title: "Optimization",
              description: "Continuously improving and adapting solutions"
            }
          ]
        }}
        expertise={{
          title: "Innovation Expertise",
          description: "Our team brings deep expertise in emerging technologies and innovation methodologies to help you stay ahead of the curve.",
          areas: [
            "Artificial Intelligence & Machine Learning",
            "Internet of Things (IoT)",
            "Blockchain Technology",
            "Cloud Computing",
            "Digital Experience Design",
            "Data Analytics & Insights"
          ]
        }}
      />
      <ServiceInquiryForm
        title="Ready to Drive Innovation?"
        subtitle="Let's discuss how our innovation consulting services can help you transform your business and create sustainable competitive advantages."
        formTitle="Innovation Inquiry"
      />
    </main>
  );
} 