'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-secondary/10 backdrop-blur-sm p-8 rounded-xl border border-secondary/20">
      <h3 className="text-xl font-semibold text-white mb-6">Quick Inquiry</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
            placeholder="Last Name"
                  required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                />
              </div>

        {/* Email */}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
          placeholder="Email Address"
                    required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
        />

        {/* Company */}
                      <input
          type="text"
          name="company"
          value={formData.company}
                        onChange={handleChange}
          placeholder="Company Name"
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                      />

        {/* Message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
          placeholder="How can we help you?"
          required
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200 resize-none"
        />

        {/* Submit Button */}
                <button
                  type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
          Send Message
                </button>
            </form>
          </div>
  );
};

export default ContactForm; 