import IndustryHero from '@/components/industries/IndustryHero';
import IndustryContent from '@/components/industries/IndustryContent';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function MobilityAutomotivesPage() {
  return (
    <main className="min-h-screen">
      <IndustryHero
        title="Mobility & Automotives"
        description="Shaping the future of transportation with sustainable and smart mobility solutions that transform how people and goods move, while revolutionizing the automotive industry."
        breadcrumb="Mobility & Automotives"
        features={[
          "Electric Vehicles",
          "Automotive Innovation",
          "Connected Solutions",
          "Smart Infrastructure"
        ]}
      />
      <IndustryContent
        overview={{
          title: "Revolutionizing Transportation & Automotive",
          description: "We help organizations navigate the transition to sustainable mobility and automotive excellence through innovative solutions in electric vehicles, connected technologies, and smart infrastructure. Our expertise spans the entire mobility and automotive ecosystem, from vehicle development to infrastructure integration.",
          features: [
            "EV Technology",
            "Automotive Systems",
            "Connected Solutions",
            "Smart Infrastructure",
            "Sustainable Mobility",
            "Digital Integration"
          ]
        }}
        approach={{
          title: "Our Mobility & Automotive Approach",
          description: "We take a comprehensive approach to mobility and automotive transformation that balances innovation with sustainability and user experience.",
          steps: [
            {
              title: "Industry Assessment",
              description: "Analyzing transportation and automotive needs"
            },
            {
              title: "Solution Design",
              description: "Creating integrated mobility solutions"
            },
            {
              title: "Technology Integration",
              description: "Implementing smart systems"
            },
            {
              title: "Infrastructure Development",
              description: "Building sustainable networks"
            },
            {
              title: "Performance Optimization",
              description: "Ensuring efficient and reliable operations"
            }
          ]
        }}
        expertise={{
          title: "Mobility & Automotive Expertise",
          description: "Our team brings deep expertise in mobility and automotive innovation to help organizations create sustainable and efficient transportation solutions.",
          areas: [
            "Electric Mobility",
            "Automotive Systems",
            "Connected Technologies",
            "Smart Infrastructure",
            "Sustainable Solutions",
            "Digital Integration"
          ]
        }}
      />
      <ServiceInquiryForm
        title="Ready to Transform Mobility & Automotive?"
        subtitle="Let's discuss how our expertise can help you develop innovative and sustainable mobility and automotive solutions."
        formTitle="Mobility & Automotive Consultation"
      />
    </main>
  );
} 
 