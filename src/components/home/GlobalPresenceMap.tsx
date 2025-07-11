'use client';

import { motion } from 'framer-motion';

const locations = [
  { x: "20%", y: "30%", label: "North America" },
  { x: "35%", y: "40%", label: "Europe" },
  { x: "50%", y: "35%", label: "Asia" },
  { x: "45%", y: "60%", label: "Australia" },
  { x: "30%", y: "50%", label: "Africa" },
  { x: "25%", y: "45%", label: "South America" }
];

export default function GlobalPresenceMap() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Global Presence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Delivering innovative solutions across continents
          </p>
        </motion.div>

        <div className="relative h-[600px] max-w-5xl mx-auto">
          {/* World Map Background - Stylized */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl">
            {/* Decorative Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Location Markers */}
          {locations.map((location, index) => (
            <motion.div
              key={location.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute"
              style={{ left: location.x, top: location.y }}
            >
              {/* Pulse Effect */}
              <div className="relative">
                <motion.div
                  className="absolute w-6 h-6 bg-primary/20 rounded-full"
                  animate={{
                    scale: [1, 2],
                    opacity: [0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.div
                  className="relative w-4 h-4 bg-primary rounded-full"
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {location.label}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {locations.map((start, i) => 
              locations.slice(i + 1).map((end, j) => (
                <motion.path
                  key={`${i}-${j}`}
                  d={`M ${start.x} ${start.y} Q ${(parseFloat(start.x) + parseFloat(end.x)) / 2}% 
                     ${Math.min(parseFloat(start.y), parseFloat(end.y)) - 10}% ${end.x} ${end.y}`}
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: (i + j) * 0.1 }}
                />
              ))
            )}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-accent)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Stats Overlay */}
          <div className="absolute bottom-8 left-8 right-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Countries", value: "25+" },
              { label: "Client Projects", value: "500+" },
              { label: "Global Partners", value: "50+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <span className="block text-2xl font-bold text-gray-900 mb-1">{stat.value}</span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 