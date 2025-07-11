import IndustryHero from '@/components/industries/IndustryHero';
import IndustryContent from '@/components/industries/IndustryContent';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function ConsumerHealthPage() {
  return (
    <main className="min-h-screen">
      <IndustryHero
        title="Consumer Health"
        description="Empowering consumers with innovative health solutions and wellness products that enhance quality of life and promote better health outcomes."
        breadcrumb="Consumer Health"
        features={[
          "Digital Health Solutions",
          "OTC Products",
          "Wellness Innovation",
          "Consumer Care"
        ]}
      />
      <IndustryContent
        overview={{
          title: "Advancing Consumer Health",
          description: "We help organizations develop and deliver innovative consumer health solutions that meet evolving consumer needs and regulatory requirements. Our expertise combines deep healthcare knowledge with consumer insights to create impactful products and services.",
          features: [
            "Digital Health Platforms",
            "OTC Product Development",
            "Wellness Solutions",
            "Consumer Analytics",
            "Regulatory Compliance",
            "Market Access"
          ]
        }}
        approach={{
          title: "Our Healthcare Approach",
          description: "We take a consumer-centric approach to health innovation that balances effectiveness with accessibility and user experience.",
          steps: [
            {
              title: "Consumer Insights",
              description: "Understanding health needs and preferences"
            },
            {
              title: "Solution Development",
              description: "Creating effective health products and services"
            },
            {
              title: "Regulatory Strategy",
              description: "Ensuring compliance and market access"
            },
            {
              title: "Market Launch",
              description: "Optimizing go-to-market strategy"
            },
            {
              title: "Performance Tracking",
              description: "Monitoring outcomes and consumer satisfaction"
            }
          ]
        }}
        expertise={{
          title: "Healthcare Expertise",
          description: "Our team brings extensive experience in consumer health to help organizations innovate and succeed in this dynamic market.",
          areas: [
            "Digital Health",
            "OTC Products",
            "Wellness Solutions",
            "Consumer Insights",
            "Regulatory Affairs",
            "Market Strategy"
          ]
        }}
      />
      <ServiceInquiryForm
        title="Ready to Innovate in Consumer Health?"
        subtitle="Let's discuss how our expertise can help you develop and deliver impactful consumer health solutions."
        formTitle="Healthcare Consultation"
      />
    </main>
  );
} 
 