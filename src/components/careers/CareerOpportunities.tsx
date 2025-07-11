'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, ChevronDown, ExternalLink, Send, Briefcase } from 'lucide-react';
import Link from 'next/link';
import JobDetailModal from './JobDetailModal';
import { getJobs } from '@/lib/data-loaders';
import { StrapiJob } from '@/lib/types';
import { renderMarkdown, extractTextFromContent } from '@/lib/utils';

const CareerOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Opportunities');
  const [selectedJob, setSelectedJob] = useState<StrapiJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobListings, setJobListings] = useState<StrapiJob[]>([]);
  const [loading, setLoading] = useState(true);

  const handleJobSelect = (job: StrapiJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const jobCategories = [
    'All Opportunities',
    'Consulting',
    'Research & Analytics',
    'Technology',
    'Business Development',
    'Operations'
  ];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobs();
      if (response?.data) {
        setJobListings(response.data);
      } else {
        console.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All Opportunities' || job.department === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getJobExperience = (job: StrapiJob) => {
    // Use experienceLevel from Strapi or extract from requirements
    if (job.experienceLevel) {
      return job.experienceLevel;
    }
    
    // Extract experience from requirements markdown or use type-based default
    const requirementsText = extractTextFromContent(job.requirements);
    const experienceReq = requirementsText.split('\n').find(req => 
      req.toLowerCase().includes('years') || req.toLowerCase().includes('experience')
    );
    
    if (experienceReq) {
      const match = experienceReq.match(/(\d+)[\+\-\s]*years?/i);
      if (match) {
        return `${match[1]}+ years`;
      }
    }
    
    // Default based on job type
    switch (job.jobType) {
      case 'Remote': return 'Entry level';
      case 'Part-time': return '1-3 years';
      case 'Contract': return '3-5 years';
      default: return '3-5 years';
    }
  };

  const getPostedDate = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getJobDescription = (job: StrapiJob) => {
    const descriptionText = extractTextFromContent(job.description);
    return descriptionText.length > 200 
      ? descriptionText.substring(0, 200) + '...'
      : descriptionText;
  };

  const getJobRequirements = (job: StrapiJob) => {
    const requirementsText = extractTextFromContent(job.requirements);
    return requirementsText.split('\n')
      .filter(req => req.trim().length > 0)
      .slice(0, 3)
      .map(req => req.length > 40 ? req.substring(0, 40) + '...' : req);
  };

  return (
    <section id="opportunities" className="section-padding bg-white">
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
            Career Opportunities
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Skyrocket your career with us!
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12 justify-center"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, locations, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full md:w-80 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 min-w-48 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200"
            >
              {jobCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading job opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No job opportunities found matching your criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-dark group-hover:text-accent transition-colors duration-300">
                      {job.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded ml-4">
                        {getPostedDate(job.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
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
                        <span>{getJobExperience(job)}</span>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {job.department}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                      {getJobDescription(job)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {getJobRequirements(job).map((req, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-6 mt-4 lg:mt-0">
                  <button 
                    onClick={() => handleJobSelect(job)}
                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>More Details</span>
                  </button>
                  <button 
                    onClick={() => handleJobSelect(job)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>

        {/* No Relevant Opportunities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-dark mb-4">
            "Did you not find a relevant opportunity?"
          </h3>
          <p className="text-gray-600 mb-4">
            Email your resume to: <span className="font-semibold text-green-600">jobs@unityinnovate.com</span>
          </p>
          <p className="text-gray-600 text-sm">
            We will respond as soon as we find a relevant opening for you.
          </p>
        </motion.div>

      {/* Job Detail Modal */}
        {selectedJob && (
      <JobDetailModal
            job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
        )}
      </div>
    </section>
  );
};

export default CareerOpportunities; 