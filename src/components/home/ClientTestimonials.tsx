'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { getHomepageClientLogos, getHomepageTestimonials } from '@/lib/data-loaders';
import { HomepageClientLogos, HomepageTestimonials } from '@/lib/types';
import { extractTextFromContent, getStrapiMedia } from '@/lib/utils';

const ClientTestimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [clientLogosData, setClientLogosData] = useState<HomepageClientLogos | null>(null);
  const [testimonialsData, setTestimonialsData] = useState<HomepageTestimonials | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientLogosResponse, testimonialsResponse] = await Promise.all([
          getHomepageClientLogos(),
          getHomepageTestimonials()
        ]);
        
        if (clientLogosResponse?.data) {
          setClientLogosData(clientLogosResponse.data);
        }
        if (testimonialsResponse?.data) {
          setTestimonialsData(testimonialsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials and client logos data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback testimonials data
  const fallbackTestimonials = [
    {
      content: "Unity Innovate's strategic insights transformed our approach to market expansion. Their data-driven recommendations led to a 40% increase in market share within 18 months.",
      author: 'Sarah Johnson',
      role: 'CEO',
      company: 'Global Pharma Inc.',
      rating: 5,
      photo: undefined
    },
    {
      content: "The team's expertise in sustainable innovation helped us develop a groundbreaking product line that resonated with our eco-conscious consumers. Exceptional partnership!",
      author: 'Michael Chen',
      role: 'Head of Innovation',
      company: 'Beauty Leaders Corp',
      rating: 5,
      photo: undefined
    },
    {
      content: "Their deep understanding of the energy sector and future trends enabled us to pivot our strategy successfully. The ROI has been remarkable.",
      author: 'Emma Williams',
      role: 'Strategy Director',
      company: 'Energy Solutions Ltd',
      rating: 5,
      photo: undefined
    }
  ];

  // Use Strapi data or fallback
  const sectionTitle = testimonialsData?.sectionTitle || 'What Our Clients Say';
  const sectionSubtitle = testimonialsData?.sectionSubtitle || 'Trusted by industry leaders worldwide';

  const testimonials = testimonialsData ? [
    {
      content: testimonialsData.testimonial1Quote 
        ? extractTextFromContent(testimonialsData.testimonial1Quote)
        : fallbackTestimonials[0].content,
      author: testimonialsData.testimonial1Author || fallbackTestimonials[0].author,
      role: testimonialsData.testimonial1Position || fallbackTestimonials[0].role,
      company: 'Global Pharma Inc.', // This could be added to schema later
      rating: 5,
      photo: testimonialsData.testimonial1Photo?.[0]?.url
    },
    {
      content: testimonialsData.testimonial2Quote 
        ? extractTextFromContent(testimonialsData.testimonial2Quote)
        : fallbackTestimonials[1].content,
      author: testimonialsData.testimonial2Author || fallbackTestimonials[1].author,
      role: testimonialsData.testimonial2Position || fallbackTestimonials[1].role,
      company: 'Beauty Leaders Corp',
      rating: 5,
      photo: testimonialsData.testimonial2Photo?.url
    },
    {
      content: testimonialsData.testimonial3Quote 
        ? extractTextFromContent(testimonialsData.testimonial3Quote)
        : fallbackTestimonials[2].content,
      author: testimonialsData.testimonial3Author || fallbackTestimonials[2].author,
      role: testimonialsData.testimonial3Position || fallbackTestimonials[2].role,
      company: 'Energy Solutions Ltd',
      rating: 5,
      photo: testimonialsData.testimonial3Photo?.url
    }
  ] : fallbackTestimonials;

  return (
    <section ref={ref} className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {sectionTitle.includes('Clients') ? (
              <>
            What Our <span className="section-heading">Clients Say</span>
              </>
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg h-full flex flex-col">
                <Quote className="w-10 h-10 text-accent/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 flex-grow italic">
                  "{testimonial.content}"
                </p>

                <div className="border-t pt-4 flex items-center gap-4">
                  {testimonial.photo && getStrapiMedia(testimonial.photo) && (
                    <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={getStrapiMedia(testimonial.photo)!}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-center text-gray-600 mb-8">
            {clientLogosData?.sectionTitle || 'Trusted by leading companies worldwide'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {clientLogosData?.clientLogos?.length ? (
              clientLogosData.clientLogos.map((logo, index) => {
                const logoUrl = getStrapiMedia(logo.url);
                if (!logoUrl) return null;
                
                return (
                  <motion.div
                    key={logo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="w-32 h-12 relative grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <Image
                      src={logoUrl}
                      alt={logo.alternativeText || `Client logo ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                );
              })
            ) : loading ? (
              // Loading state
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-32 h-12 bg-gray-200 rounded animate-pulse"></div>
              ))
            ) : (
              // Fallback placeholder
              Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-32 h-12 bg-gray-300 rounded"></div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientTestimonials; 