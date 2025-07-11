'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Users, Coffee, Award, Heart } from 'lucide-react';
import Link from 'next/link';

const LifeSection = () => {
  const celebrations = [
    {
      title: "Global Innovation Day",
      description: "Annual celebration of breakthrough innovations and achievements across all offices.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400&auto=format&fit=crop",
      category: "Innovation",
      date: "December",
      icon: <Award className="w-5 h-5" />
    },
    {
      title: "Team Building Retreats",
      description: "Quarterly off-site activities fostering collaboration and team bonding.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop",
      category: "Team Building",
      date: "Quarterly",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Cultural Festivals",
      description: "Celebrating diversity with festivals like Diwali, Christmas, and cultural appreciation events.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=400&auto=format&fit=crop",
      category: "Culture",
      date: "Year-round",
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: "Coffee & Learning Sessions",
      description: "Informal knowledge sharing sessions with industry experts and thought leaders.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      category: "Learning",
      date: "Monthly",
      icon: <Coffee className="w-5 h-5" />
    },
    {
      title: "Office Opening Celebrations",
      description: "Grand openings of new offices with local community engagement and festivities.",
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop",
      category: "Milestones",
      date: "As we grow",
      icon: <MapPin className="w-5 h-5" />
    },
    {
      title: "Annual Achievement Awards",
      description: "Recognizing outstanding performance, innovation, and dedication of team members.",
      image: "https://images.unsplash.com/photo-1569156179812-204d04e66df8?q=80&w=400&auto=format&fit=crop",
      category: "Recognition",
      date: "Annually",
      icon: <Award className="w-5 h-5" />
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Flexible Time Off",
      description: "Generous paid time off and flexible working arrangements"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Performance Bonuses",
      description: "Merit-based rewards and recognition programs"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Learning Budget",
      description: "Annual budget for conferences, courses, and skill development"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">
            Life At Unity Innovate
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the vibrant culture at Unity Innovate through stories, celebrations, 
            and moments that capture the spirit of our global team.
          </p>
        </motion.div>

        {/* Celebrations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {celebrations.map((celebration, index) => (
            <motion.div
              key={celebration.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={celebration.image}
                  alt={celebration.title}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary">
                  {celebration.category}
                </div>
                <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-sm p-2 rounded-lg text-white">
                  {celebration.icon}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-dark text-lg group-hover:text-primary transition-colors duration-300">
                    {celebration.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {celebration.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{celebration.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <h3 className="text-2xl font-heading font-bold text-dark text-center mb-4">
            Why Work With Us?
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            At Unity Innovate, your growth is our responsibility. Each acquired skill is celebrated and 
            rewarded, creating a motivating environment for continuous learning and professional development.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h4 className="font-semibold text-dark mb-3">{benefit.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="#opportunities" className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
              <Users className="w-5 h-5" />
              <span>Join Our Growing Team</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifeSection; 