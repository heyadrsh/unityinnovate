import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import OfficeLocations from '@/components/contact/OfficeLocations';
import GlobalPresence from '@/components/contact/GlobalPresence';

export const metadata: Metadata = {
  title: 'Contact Us - Unity Innovate',
  description: 'Get in touch with Unity Innovate. We have offices in US, UK, and India ready to help transform your business.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-dark to-primary text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Have a question?
            </h1>
            <p className="text-xl text-white/90">
              We look forward to your message. Contact us today.
            </p>
          </div>
        </div>
      </section>
      <ContactForm />
      <OfficeLocations />
      <GlobalPresence />
    </>
  );
} 