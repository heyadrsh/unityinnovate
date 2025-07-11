import { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import OfficeLocations from '@/components/contact/OfficeLocations';
import ContactCTA from '@/components/contact/ContactCTA';

export const metadata: Metadata = {
  title: 'Contact Us - Unity Innovate',
  description: 'Ready to elevate your business? Get in touch with Unity Innovate. Global presence with offices in US, UK, and India.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <OfficeLocations />
      <ContactCTA />
    </>
  );
} 