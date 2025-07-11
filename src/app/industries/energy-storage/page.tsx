import IndustryHero from '@/components/industries/IndustryHero';
import IndustryContent from '@/components/industries/IndustryContent';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function EnergyStoragePage() {
  return (
    <main className="min-h-screen">
      <IndustryHero
        title="Energy & Storage"
        description="Driving innovation in sustainable energy solutions and advanced storage technologies to power the future of clean energy."
        breadcrumb="Energy & Storage"
        features={[
          "Renewable Energy Systems",
          "Energy Storage Solutions",
          "Smart Grid Technology",
          "Sustainable Infrastructure"
        ]}
      />
      <IndustryContent
        overview={{
          title: "Transforming Energy Systems",
          description: "We help organizations navigate the transition to sustainable energy through innovative solutions in renewable energy and advanced storage technologies. Our expertise spans the entire energy value chain, from generation to storage and distribution.",
          features: [
            "Solar & Wind Integration",
            "Battery Storage Systems",
            "Grid Modernization",
            "Energy Management",
            "Sustainable Solutions",
            "Smart Technology"
          ]
        }}
        approach={{
          title: "Our Energy Approach",
          description: "We take a comprehensive approach to energy transformation that balances sustainability with reliability and efficiency.",
          steps: [
            {
              title: "Assessment & Planning",
              description: "Analyzing current energy systems and future needs"
            },
            {
              title: "Solution Design",
              description: "Creating tailored energy and storage solutions"
            },
            {
              title: "Technology Integration",
              description: "Implementing advanced energy systems"
            },
            {
              title: "Grid Optimization",
              description: "Enhancing distribution and storage efficiency"
            },
            {
              title: "Performance Monitoring",
              description: "Ensuring optimal system operation"
            }
          ]
        }}
        expertise={{
          title: "Energy Expertise",
          description: "Our team brings deep expertise in renewable energy and storage technologies to help organizations achieve their sustainability goals.",
          areas: [
            "Renewable Energy Systems",
            "Battery Technology",
            "Grid Integration",
            "Energy Management",
            "Sustainable Design",
            "Smart Infrastructure"
          ]
        }}
      />
      <ServiceInquiryForm
        title="Ready to Transform Your Energy Systems?"
        subtitle="Let's discuss how our energy and storage solutions can help you achieve sustainability and efficiency goals."
        formTitle="Energy Consultation"
      />
    </main>
  );
} 
 