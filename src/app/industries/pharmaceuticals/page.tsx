import IndustryHero from '@/components/industries/IndustryHero';
import IndustryContent from '@/components/industries/IndustryContent';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function PharmaceuticalsPage() {
  return (
    <main className="min-h-screen">
      <IndustryHero
        title="Pharmaceuticals"
        description="Advancing healthcare through innovative pharmaceutical solutions, cutting-edge research, and efficient development processes."
        breadcrumb="Pharmaceuticals"
        features={[
          "Drug Development",
          "Clinical Research",
          "Regulatory Strategy",
          "Manufacturing Excellence"
        ]}
      />
      <IndustryContent
        overview={{
          title: "Transforming Pharmaceutical Development",
          description: "We help pharmaceutical organizations accelerate innovation, optimize development processes, and ensure regulatory compliance. Our expertise spans the entire drug development lifecycle, from discovery to commercialization.",
          features: [
            "Drug Discovery Innovation",
            "Clinical Trial Optimization",
            "Regulatory Compliance",
            "Process Optimization",
            "Quality Assurance",
            "Market Access"
          ]
        }}
        approach={{
          title: "Our Pharmaceutical Approach",
          description: "We take a comprehensive approach to pharmaceutical development that balances innovation with compliance and efficiency.",
          steps: [
            {
              title: "Research & Discovery",
              description: "Accelerating drug discovery through innovation"
            },
            {
              title: "Development Strategy",
              description: "Optimizing clinical development processes"
            },
            {
              title: "Regulatory Planning",
              description: "Ensuring compliance and approval pathways"
            },
            {
              title: "Manufacturing Excellence",
              description: "Implementing efficient production processes"
            },
            {
              title: "Market Strategy",
              description: "Optimizing market access and commercialization"
            }
          ]
        }}
        expertise={{
          title: "Pharmaceutical Expertise",
          description: "Our team brings extensive experience in pharmaceutical development to help organizations innovate and succeed in this complex industry.",
          areas: [
            "Drug Development",
            "Clinical Research",
            "Regulatory Affairs",
            "Quality Systems",
            "Process Optimization",
            "Market Access"
          ]
        }}
      />
      <ServiceInquiryForm
        title="Ready to Advance Pharmaceutical Innovation?"
        subtitle="Let's discuss how our expertise can help you optimize development processes and accelerate time-to-market."
        formTitle="Pharmaceutical Consultation"
      />
    </main>
  );
} 
 