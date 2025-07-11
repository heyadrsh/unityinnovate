'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Target, Lightbulb, Globe, Award, TrendingUp } from 'lucide-react';

const CultureSection = () => {
  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Excellence",
      description: "We believe in the power of diverse teams working together to solve complex challenges."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation First",
      description: "We foster creativity and unconventional thinking to deliver breakthrough solutions."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Results Driven",
      description: "We are committed to delivering measurable impact for our clients and partners."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Perspective",
      description: "We bring international insights and cross-cultural understanding to every project."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Standards",
      description: "We maintain the highest standards of excellence in everything we do."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Continuous Growth",
      description: "We invest in our people's development and encourage lifelong learning."
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">
              Working With Unity Innovate
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              As a global consulting and advisory company, we are striving towards our vision of 
              developing an ecosystem of innovation facilitating exceptional, qualitative, and 
              profitable services in technology & business research & consulting.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We believe in harvesting the in-house talent and exploring all unconventional ways to 
              deliver excellence. As innovators ourselves, we adapt and thrive in the constantly 
              changing market dynamics.
            </p>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              We are always looking for people who are ambitious, eager, and enthusiastic to push 
              the boundaries of innovation for our partners.
            </p>

            {/* Company highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">4+ Years</div>
                <div className="text-gray-600 text-sm">Industry Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600 text-sm">Successful Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                alt="Unity Innovate team collaboration"
                width={600}
                height={450}
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            </div>
            
            {/* Floating accent elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            >
              <Lightbulb className="w-8 h-8 text-accent" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <Target className="w-6 h-6 text-secondary" />
            </motion.div>
          </motion.div>
        </div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-heading font-bold text-dark text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="font-semibold text-lg text-dark mb-3">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CultureSection; 