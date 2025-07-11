'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Briefcase, DollarSign, Users, CheckCircle } from 'lucide-react';
import { StrapiJob } from '@/lib/types';
import { renderMarkdown, extractTextFromContent } from '@/lib/utils';

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: StrapiJob;
}

const JobDetailModal = ({ isOpen, onClose, job }: JobDetailModalProps) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    linkedIn: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the application data to your backend
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setShowApplicationForm(false);
      onClose();
    }, 2000);
  };

  // Extract requirements and responsibilities from markdown
  const getMarkdownList = (markdownContent: string) => {
    const text = extractTextFromContent(markdownContent);
    return text.split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^[\-\*\+]\s*/, '')); // Remove markdown bullet points
  };

  const responsibilities = getMarkdownList(job.responsibilities);
  const requirements = getMarkdownList(job.requirements);
  const benefits = job.benefits ? getMarkdownList(job.benefits) : [
      "Competitive salary and performance bonuses",
      "Comprehensive health insurance",
      "Flexible working arrangements",
      "Annual learning and development budget",
      "Global career opportunities",
      "Retirement savings plan with company matching"
  ];

  const jobDetails = {
    salary: job.salaryRange || "$80,000 - $120,000",
    teamSize: "8-12 people",
    experienceLevel: job.experienceLevel || "Mid Level",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.jobType}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.department}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              {!showApplicationForm ? (
                <div className="p-6 space-y-8">
                  {/* Quick Info */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="font-semibold text-dark">{jobDetails.salary}</div>
                      <div className="text-sm text-gray-600">Annual Salary</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="font-semibold text-dark">{jobDetails.teamSize}</div>
                      <div className="text-sm text-gray-600">Team Size</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Briefcase className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="font-semibold text-dark">{jobDetails.experienceLevel}</div>
                      <div className="text-sm text-gray-600">Experience Level</div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-dark mb-4">About This Role</h3>
                    <div 
                      className="text-gray-600 leading-relaxed prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(job.description) }}
                    />
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h3 className="text-xl font-semibold text-dark mb-4">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <h3 className="text-xl font-semibold text-dark mb-4">Required Qualifications</h3>
                    <ul className="space-y-2">
                      {requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-semibold text-dark mb-4">Benefits & Perks</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Instructions */}
                  {job.applicationInstructions && (
                    <div>
                      <h3 className="text-xl font-semibold text-dark mb-4">Application Instructions</h3>
                      <div 
                        className="text-gray-600 leading-relaxed prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(job.applicationInstructions) }}
                      />
                    </div>
                  )}

                  {/* Apply Button */}
                  <div className="border-t border-gray-200 pt-6">
                    <button
                      onClick={() => setShowApplicationForm(true)}
                      className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Apply for This Position
                    </button>
                  </div>
                </div>
              ) : (
                /* Application Form */
                <div className="p-6">
                  {!applicationSubmitted ? (
                    <form onSubmit={handleSubmitApplication} className="space-y-6">
                      <h3 className="text-xl font-semibold text-dark mb-6">Application Form</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience *
                          </label>
                          <select
                            name="experience"
                            required
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                          >
                            <option value="">Select experience</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-8">5-8 years</option>
                            <option value="8+">8+ years</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            name="linkedIn"
                            value={formData.linkedIn}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter *
                        </label>
                        <textarea
                          name="coverLetter"
                          required
                          rows={6}
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          placeholder="Tell us why you're interested in this role and how your experience makes you a great fit..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 resize-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setShowApplicationForm(false)}
                          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                        >
                          Back to Job Details
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Success Message */
                    <div className="text-center py-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-dark mb-4">
                        Application Submitted!
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Thank you for your interest in Unity Innovate. We'll review your application and get back to you within 5-7 business days.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobDetailModal; 