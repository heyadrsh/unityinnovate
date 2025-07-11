'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <span className="text-accent font-medium text-sm uppercase tracking-wider">Newsletter</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                Stay Informed with Industry Insights
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Receive strategic insights, market trends, and innovation updates directly from our expert consultants. Join 5,000+ industry leaders already subscribed.
              </p>
            </div>

            {/* Right Content - Enhanced Form */}
            <div className="lg:pl-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="newsletter-email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your business email"
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent text-white px-6 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  Subscribe to Newsletter
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <p className="text-xs text-gray-500 leading-relaxed">
                  By subscribing, you agree to receive marketing communications. Unsubscribe anytime.
                  <Link href="/privacy-policy" className="text-accent hover:underline ml-1">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 