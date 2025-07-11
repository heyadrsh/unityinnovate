'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, Users, Globe, Briefcase } from 'lucide-react';
import Link from 'next/link';

const CareersCTA = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "50+",
      label: "Team Members",
      description: "Diverse professionals across industries"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: "3",
      label: "Global Offices",
      description: "North America, Europe, and Asia"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      number: "100%",
      label: "Growth Focused",
      description: "Committed to your career development"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Shape the Future of Consulting?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join Unity Innovate and become part of a team that's redefining strategic consulting. 
              We're looking for innovative minds who are passionate about driving change.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="font-semibold mb-2">{stat.label}</div>
                <div className="text-white/80 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="text-left lg:text-left">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Don't See the Perfect Role?
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  We're always looking for exceptional talent. Send us your resume and let us know 
                  how you'd like to contribute to Unity Innovate's mission.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="mailto:hitesh@unityinnovate.com"
                    className="inline-flex items-center justify-center bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/95 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Email Your Resume
                  </Link>
                  <Link
                    href="#opportunities"
                    className="inline-flex items-center justify-center border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Browse Open Positions
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right Content - Contact Info */}
              <div className="text-left lg:text-left">
                <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                <div className="space-y-3 text-white/90">
                  <div>
                    <div className="font-medium">Careers Team</div>
                    <div className="text-sm">hitesh@unityinnovate.com</div>
                  </div>
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-sm">5-7 business days</div>
                  </div>
                  <div>
                    <div className="font-medium">Follow Us</div>
                    <div className="text-sm">LinkedIn | Unity Innovate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-white/80 text-lg italic">
              "Your next career breakthrough is just one application away."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareersCTA; 