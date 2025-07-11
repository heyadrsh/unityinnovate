import IndustryHero from '@/components/industries/IndustryHero';
import IndustryContent from '@/components/industries/IndustryContent';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function CosmeticsPersonalCarePage() {
  return (
    <main className="min-h-screen">
      <IndustryHero
        title="Cosmetics & Personal Care"
        description="Creating advanced cosmetic and personal care solutions that combine innovation with sustainability to enhance beauty, well-being, and self-care experiences."
        breadcrumb="Cosmetics & Personal Care"
        features={[
          "Cosmetic Innovation",
          "Skincare Technology",
          "Sustainable Solutions",
          "Advanced Formulations"
        ]}
      />
      <IndustryContent
        overview={{
          title: "Innovating Beauty & Personal Care",
          description: "We help organizations develop and deliver innovative cosmetic and personal care solutions that meet evolving consumer preferences and sustainability requirements. Our expertise combines scientific innovation with consumer insights to create effective and environmentally conscious products.",
          features: [
            "Sustainable Formulations",
            "Natural Ingredients",
            "Clean Beauty Solutions",
            "Product Innovation",
            "Green Chemistry",
            "Consumer Experience"
          ]
        }}
        approach={{
          title: "Our Cosmetics & Personal Care Approach",
          description: "We take a holistic approach to beauty and personal care innovation that balances effectiveness with sustainability and consumer experience.",
          steps: [
            {
              title: "Market Research",
              description: "Understanding consumer needs and trends"
            },
            {
              title: "Formulation Development",
              description: "Creating innovative and sustainable solutions"
            },
            {
              title: "Safety & Compliance",
              description: "Ensuring product safety and regulations"
            },
            {
              title: "Sustainability Integration",
              description: "Implementing eco-friendly practices"
            },
            {
              title: "Consumer Validation",
              description: "Testing and optimizing products"
            }
          ]
        }}
        expertise={{
          title: "Cosmetics & Personal Care Expertise",
          description: "Our team brings deep expertise in cosmetics and personal care innovation to help organizations create successful and sustainable products.",
          areas: [
            "Cosmetic Technology",
            "Skincare Innovation",
            "Natural Formulations",
            "Sustainable Packaging",
            "Clinical Testing",
            "Regulatory Affairs"
          ]
        }}
      />
      <ServiceInquiryForm
        title="Ready to Transform Beauty & Personal Care?"
        subtitle="Let's discuss how our expertise can help you develop innovative and sustainable cosmetic and personal care solutions."
        formTitle="Cosmetics & Personal Care Consultation"
      />
    </main>
  );
} 
 