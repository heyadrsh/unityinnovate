'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getHomepageContactCTA, submitConsultationRequest } from '@/lib/data-loaders';
import { HomepageContactCTA } from '@/lib/types';
import { renderMarkdown, extractTextFromContent } from '@/lib/utils';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [contactData, setContactData] = useState<HomepageContactCTA | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        const response = await getHomepageContactCTA();
        if (response?.data) {
          setContactData(response.data);
        }
      } catch (error) {
        console.error('Error fetching contact CTA data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      await submitConsultationRequest(formData);
      setFormStatus({
        type: 'success',
        message: 'Thank you! We will get back to you soon.'
      });
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Fallback data
  const fallbackData = {
    mainTitle: 'Ready to Elevate Your Business?',
    description: "Let's explore how our comprehensive services can drive innovation, optimize operations, and create lasting value for your organization.",
    emailLabel: 'Email us at',
    emailAddress: 'contact@unityinnovate.com',
    phoneLabel: 'Call us at',
    Text: '+91 7835877980',
    addressLabel: 'Visit us at',
    address: '2088, Patel Nagar West, New Delhi, India - 110008',
    ctaButtonText: 'Get in Touch'
  };

  // Use Strapi data or fallback
  const mainTitle = contactData?.mainTitle || fallbackData.mainTitle;
  const description = contactData?.description 
    ? extractTextFromContent(contactData.description)
    : fallbackData.description;
  const emailLabel = contactData?.emailLabel || fallbackData.emailLabel;
  const emailAddress = contactData?.emailAddress || fallbackData.emailAddress;
  const phoneLabel = contactData?.phoneLabel || fallbackData.phoneLabel;
  const phoneNumber = contactData?.Text || fallbackData.Text;
  const addressLabel = contactData?.addressLabel || fallbackData.addressLabel;
  const address = contactData?.address || fallbackData.address;
  const ctaButtonText = contactData?.ctaButtonText || fallbackData.ctaButtonText;

  return (
    <section ref={ref} className="section-padding bg-[#1A2B2B] relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A2B2B] via-[#234242] to-[#1A2B2B] opacity-80" />
      
      {/* Subtle animated background elements - hidden on mobile for performance */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/10 to-transparent rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              {mainTitle}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
              {description}
            </p>

            <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white/70 mb-1">{emailLabel}</p>
                  <a 
                    href={`mailto:${emailAddress}`} 
                    className="text-base sm:text-lg font-medium text-white hover:text-accent transition-colors break-all touch-manipulation"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">{phoneLabel}</p>
                  <a 
                    href={`tel:${phoneNumber}`} 
                    className="text-base sm:text-lg font-medium text-white hover:text-accent transition-colors touch-manipulation"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">{addressLabel}</p>
                  <p className="text-base sm:text-lg font-medium text-white">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base font-semibold hover:bg-accent/90 transition-colors inline-flex items-center group shadow-lg shadow-accent/20 w-full sm:w-auto justify-center touch-manipulation min-h-[52px]"
            >
              {ctaButtonText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Content - Quick Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-white/[0.08] backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-white">Request a Consultation</h3>
              
              {formStatus.type && (
                <div 
                  className={`mb-6 p-4 rounded-lg ${
                    formStatus.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-lg placeholder-white/40 text-white text-base focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all touch-manipulation min-h-[48px]"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-lg placeholder-white/40 text-white text-base focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all touch-manipulation min-h-[48px]"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-lg placeholder-white/40 text-white text-base focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all touch-manipulation min-h-[48px]"
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  required
                  className="w-full px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-lg placeholder-white/40 text-white text-base focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all touch-manipulation min-h-[48px]"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  required
                  rows={4}
                  className="w-full px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-lg placeholder-white/40 text-white text-base focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all resize-none touch-manipulation"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent text-white px-6 py-4 rounded-lg text-base font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 touch-manipulation min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 