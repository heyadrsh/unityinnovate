'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { submitNewsletterSignup } from '@/lib/data-loaders';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await submitNewsletterSignup(email);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setEmail('');
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium text-sm">Successfully subscribed!</p>
                    <p className="text-green-300 text-xs">Welcome to our newsletter community.</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-red-400 font-medium text-sm">Subscription failed</p>
                    <p className="text-red-300 text-xs">{errorMessage}</p>
                  </div>
                </div>
              )}

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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (submitStatus !== 'idle') {
                          setSubmitStatus('idle');
                        }
                      }}
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
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full bg-accent text-white px-6 py-4 rounded-lg font-semibold hover:bg-accent/90 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe to Newsletter
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
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