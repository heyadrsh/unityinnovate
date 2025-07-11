import IndustriesHero from '@/components/industries/IndustriesHero';
import IndustryCategories from '@/components/industries/IndustryCategories';
import IndustryStats from '@/components/industries/IndustryStats';
import ServiceInquiryForm from '@/components/services/ServiceInquiryForm';

export default function IndustriesPage() {
  return (
    <main className="min-h-screen">
      <IndustriesHero />
      <IndustryCategories />
      <IndustryStats />
      <ServiceInquiryForm
        title="Ready to Transform Your Industry?"
        subtitle="Let's explore how our industry expertise can help you drive innovation and create lasting value in your sector."
        formTitle="Industry Consultation"
      />
    </main>
  );
} 
 