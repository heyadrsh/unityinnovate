import Hero from '@/components/home/Hero';
import CompanyOverview from '@/components/home/CompanyOverview';
import Services from '@/components/home/Services';
import ValuePillars from '@/components/home/ValuePillars';
import Industries from '@/components/home/Industries';
import CaseStudies from '@/components/home/CaseStudies';
import ClientTestimonials from '@/components/home/ClientTestimonials';
import ContactSection from '@/components/home/ContactSection';
import { getHomepageHero, getHomepageStats, getHomepageWhoWeAre, getHomepageFeatures } from '@/lib/data-loaders';

export default async function Home() {
  console.log('🏠 Homepage loading...');
  
  try {
    // Load Strapi data with error handling
    console.log('📡 Fetching homepage data...');
    
    const [heroData, statsData, whoWeAreData, featuresData] = await Promise.allSettled([
      getHomepageHero(),
      getHomepageStats(),
      getHomepageWhoWeAre(),
      getHomepageFeatures()
    ]);

    // Process results
    const hero = heroData.status === 'fulfilled' ? heroData.value : { data: null, error: heroData.reason };
    const stats = statsData.status === 'fulfilled' ? statsData.value : { data: null, error: statsData.reason };
    const whoWeAre = whoWeAreData.status === 'fulfilled' ? whoWeAreData.value : { data: null, error: whoWeAreData.reason };
    const features = featuresData.status === 'fulfilled' ? featuresData.value : { data: null, error: featuresData.reason };

  // Debug log to see data structure
    console.log('✅ Hero Data:', hero.data ? 'LOADED' : 'EMPTY', hero.error || '');
    console.log('✅ Stats Data:', stats.data ? 'LOADED' : 'EMPTY', stats.error || '');
    console.log('✅ Who We Are Data:', whoWeAre.data ? 'LOADED' : 'EMPTY', whoWeAre.error || '');
    console.log('✅ Features Data:', features.data ? 'LOADED' : 'EMPTY', features.error || '');

  return (
    <>
        <Hero heroData={hero?.data} statsData={stats?.data} />
        <CompanyOverview whoWeAreData={whoWeAre?.data} featuresData={features?.data} />
        <Services />
        <Industries />
        <CaseStudies />
        <ValuePillars />
        <ClientTestimonials />
        <ContactSection />
      </>
    );
  } catch (error) {
    console.error('❌ Homepage error:', error);
    
    // Return homepage with fallback data
    return (
      <>
        <Hero heroData={undefined} statsData={undefined} />
        <CompanyOverview whoWeAreData={undefined} featuresData={undefined} />
      <Services />
      <Industries />
      <CaseStudies />
        <ValuePillars />
      <ClientTestimonials />
      <ContactSection />
    </>
  );
  }
}
