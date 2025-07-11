'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { getTeamMembers } from '@/lib/data-loaders';
import { StrapiTeamMember } from '@/lib/types';
import { extractTextFromContent } from '@/lib/utils';

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [teamMembers, setTeamMembers] = useState<StrapiTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await getTeamMembers();
        if (response?.data) {
          setTeamMembers(response.data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Keep fallback team members if Strapi fails
        setTeamMembers([
          {
            id: 1,
            fullName: 'Hitesh Sharma',
            position: 'Founder & CEO',
      bio: 'Visionary leader with over 15 years of experience in strategic consulting and innovation management.',
            linkedinUrl: 'https://linkedin.com/in/hitesh',
            email: 'hitesh@unityinnovate.com',
            isActive: true,
            photo: { id: 1, url: '', alternativeText: '' },
            createdAt: '',
            updatedAt: ''
    },
    {
            id: 2,
            fullName: 'Abhishek Kumar',
            position: 'Co-Founder & CTO',
      bio: 'Technology expert with deep expertise in digital transformation and emerging technologies.',
            linkedinUrl: 'https://linkedin.com/in/abhishek',
            email: 'abhishek@unityinnovate.com',
            isActive: true,
            photo: { id: 2, url: '', alternativeText: '' },
            createdAt: '',
            updatedAt: ''
    },
    {
            id: 3,
            fullName: 'Dr. Priya Sharma',
            position: 'Head of Research',
      bio: 'PhD in Innovation Management from MIT, 15+ years experience',
            linkedinUrl: '#',
            email: 'priya@unityinnovate.com',
            isActive: true,
            photo: { id: 3, url: '', alternativeText: '' },
            createdAt: '',
            updatedAt: ''
    },
    {
            id: 4,
            fullName: 'Michael Roberts',
            position: 'VP Business Development',
      bio: 'Growth strategist with track record in Fortune 500 companies',
            linkedinUrl: '#',
            email: 'michael@unityinnovate.com',
            isActive: true,
            photo: { id: 4, url: '', alternativeText: '' },
            createdAt: '',
            updatedAt: ''
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getBioText = (bio: string) => {
    return extractTextFromContent(bio);
  };

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-gradient">Leadership Team</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industry experts driving innovation and excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  {member.photo?.url ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${member.photo.url}`}
                      alt={member.photo.alternativeText || member.fullName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-primary to-accent h-full flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {member.fullName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                  </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.fullName}</h3>
                  <p className="text-accent font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{getBioText(member.bio)}</p>
                  <div className="flex gap-4">
                    {member.linkedinUrl && (
                    <a
                        href={member.linkedinUrl}
                      className="text-gray-400 hover:text-primary transition-colors"
                        aria-label={`${member.fullName} LinkedIn`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <Linkedin size={20} />
                    </a>
                    )}
                    {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-primary transition-colors"
                        aria-label={`Email ${member.fullName}`}
                    >
                      <Mail size={20} />
                    </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-4">
            Join our team of experts and shape the future of strategic consulting
          </p>
          <a href="/careers" className="btn-primary inline-flex items-center">
            View Open Positions
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection; 