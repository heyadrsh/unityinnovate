'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceContactSectionProps {
  title?: string;
  subtitle?: string;
  gradientClasses?: string;
  serviceType: string;
}

const ServiceContactSection = ({
  title = "Ready to Transform Your Business?",
  subtitle = "Let's discuss how Unity Innovate can help you navigate change, seize opportunities, and lead in your industry.",
  gradientClasses = "bg-gradient-to-br from-primary to-secondary",
  serviceType
}: ServiceContactSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    const formData = new FormData(e.currentTarget);
    console.log('Form submitted:', {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      companyName: formData.get('companyName'),
      message: formData.get('message'),
      serviceType
    });
  };

  return (
    <section ref={ref} className={`section-padding ${gradientClasses} text-white`}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {subtitle}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email us at</p>
                  <a href="mailto:contact@unityinnovate.com" className="font-medium hover:text-accent transition-colors">
                    contact@unityinnovate.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Call us at</p>
                  <a href="tel:+91-141-4920704" className="font-medium hover:text-accent transition-colors">
                    +91-141-4920704
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Visit us at</p>
                  <p className="font-medium">
                    Second Home Spitalfields, London
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center group"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Content - Quick Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Quick Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md placeholder-white/60 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md placeholder-white/60 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md placeholder-white/60 text-white focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md placeholder-white/60 text-white focus:outline-none focus:border-accent transition-colors"
                />
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md placeholder-white/60 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center group"
                >
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContactSection; 