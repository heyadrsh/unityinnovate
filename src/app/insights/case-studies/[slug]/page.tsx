'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Building, Target, TrendingUp, Share2, FileText, ChevronRight, BookmarkCheck, Bookmark, CheckCircle, Award, Clock } from 'lucide-react';
import Image from 'next/image';
import { getCaseStudy } from '@/lib/data-loaders';
import { renderMarkdown } from '@/lib/utils';
import { StrapiCaseStudy, StrapiResponse } from '@/lib/types';

// Fallback case study data
const fallbackCaseStudies: Record<string, any> = {
  'pharma-innovation-case-study': {
    id: 'fallback-3',
    documentId: 'pharma-innovation-case-study',
    title: 'Pharma Innovation Success: Drug Discovery Acceleration',
    slug: 'pharma-innovation-case-study',
    excerpt: 'How we helped a leading pharmaceutical company accelerate their drug discovery process by 40% using innovative AI solutions.',
    content: `# Pharma Innovation Success: Drug Discovery Acceleration

## Executive Summary

Unity Innovate partnered with a leading pharmaceutical company to revolutionize their drug discovery process through the implementation of AI-driven methodologies and advanced data analytics platforms.

## Challenge

The pharmaceutical company faced several critical challenges:
- **Extended Development Timelines**: Traditional drug discovery was taking 10-15 years
- **High Failure Rates**: 90% of compounds were failing in clinical trials
- **Rising Costs**: R&D expenses were increasing without proportional success
- **Regulatory Complexity**: Navigation of evolving compliance requirements

## Solution Approach

### 1. AI-Powered Compound Screening
We implemented machine learning algorithms to:
- Analyze molecular structures and predict efficacy
- Identify potential side effects early in development
- Optimize compound selection based on historical data

### 2. Predictive Analytics Platform
Our custom analytics solution provided:
- **Real-time progress tracking** across all development stages
- **Risk assessment models** for each compound
- **Resource optimization** recommendations

### 3. Collaborative Research Framework
We established:
- Cross-functional teams with clear KPIs
- Streamlined communication protocols
- Knowledge sharing platforms

## Implementation Process

### Phase 1: Data Infrastructure (Months 1-3)
- Consolidated disparate data sources
- Established data quality standards
- Implemented security protocols

### Phase 2: AI Model Development (Months 4-8)
- Trained machine learning models on historical data
- Validated predictions against known outcomes
- Fine-tuned algorithms for specific therapeutic areas

### Phase 3: Platform Integration (Months 9-12)
- Integrated AI tools into existing workflows
- Provided comprehensive training to research teams
- Established continuous improvement processes

## Results Achieved

### Quantitative Outcomes
- **40% reduction** in drug discovery timeline
- **65% improvement** in compound success rates
- **$50M annual savings** in R&D costs
- **30% increase** in patent applications

### Qualitative Benefits
- Enhanced collaboration between departments
- Improved decision-making capabilities
- Increased researcher productivity and satisfaction
- Stronger competitive positioning in the market

## Key Success Factors

1. **Leadership Commitment**: Strong executive sponsorship throughout the project
2. **Change Management**: Comprehensive training and support for all stakeholders
3. **Technology Integration**: Seamless incorporation into existing systems
4. **Continuous Optimization**: Regular monitoring and refinement of processes

## Lessons Learned

- **Data Quality is Paramount**: Investing time in data cleaning and validation pays dividends
- **User Adoption Requires Support**: Comprehensive training and ongoing assistance are essential
- **Flexibility Enables Success**: Adapting the solution to specific organizational needs

## Future Roadmap

The pharmaceutical company is now expanding the AI-driven approach to:
- Clinical trial optimization
- Personalized medicine development
- Supply chain management
- Regulatory submission processes

This case study demonstrates how strategic implementation of AI and analytics can transform traditional pharmaceutical R&D, delivering significant improvements in efficiency, cost-effectiveness, and success rates.`,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center',
      alternativeText: 'Pharmaceutical research and drug discovery'
    },
    clientName: 'Leading Pharmaceutical Company',
    industry: 'Pharmaceuticals',
    projectDuration: '12 months',
    teamSize: '8 specialists',
    author: 'Unity Innovate Team',
    publicationDate: new Date().toISOString(),
    keywords: 'pharmaceuticals, AI, drug discovery, innovation, case study',
    isPublished: true
  }
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [caseStudy, setCaseStudy] = useState<StrapiCaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // First try to get the case study from Strapi
        const response = await getCaseStudy(slug);
        if (response?.data?.length > 0) {
          setCaseStudy(response.data[0]);
        } else {
          // If not found in Strapi, check fallback data
          const fallbackCaseStudy = fallbackCaseStudies[slug];
          if (fallbackCaseStudy) {
            setCaseStudy(fallbackCaseStudy);
          } else {
            setError('Case study not found');
          }
        }
      } catch (err) {
        console.error('Error fetching case study:', err);
        // Try fallback data if Strapi fails
        const fallbackCaseStudy = fallbackCaseStudies[slug];
        if (fallbackCaseStudy) {
          setCaseStudy(fallbackCaseStudy);
        } else {
          setError('Failed to load case study');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/insights/case-studies"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  // Render Markdown content
  const challengeContent = renderMarkdown(caseStudy.challenge);
  const solutionContent = renderMarkdown(caseStudy.solution);
  const resultsContent = renderMarkdown(caseStudy.results);
  const featuredImageUrl = caseStudy.featuredImage?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${caseStudy.featuredImage.url}`
    : null;

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: caseStudy.title,
        text: caseStudy.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/insights" className="hover:text-primary transition-colors">Insights</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/insights/case-studies" className="hover:text-primary transition-colors">Case Studies</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{caseStudy.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-dark via-primary to-secondary text-white py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/insights/case-studies"
              className="inline-flex items-center text-accent hover:text-white transition-colors duration-200 mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </Link>
            
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-accent text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-full">
                  Case Study
                </span>
                <span className="bg-white/10 text-white px-3 py-1 text-sm font-medium rounded-full">
                  {caseStudy.industry}
                </span>
                <span className="bg-green-500/20 text-green-200 px-3 py-1 text-sm font-medium rounded-full">
                  Project Completed
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-light">
                {caseStudy.excerpt}
              </p>
            </div>
            
            {/* Project Meta Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <div className="text-gray-300 mb-1">Client</div>
                <div className="text-white font-semibold">{caseStudy.clientName}</div>
              </div>
              <div>
                <div className="text-gray-300 mb-1">Industry</div>
                <div className="text-white font-semibold">{caseStudy.industry}</div>
              </div>
              <div>
                <div className="text-gray-300 mb-1">Published</div>
                <div className="text-white font-semibold">
                  {new Date(caseStudy.publicationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featuredImageUrl && (
      <div className="relative h-[500px] overflow-hidden bg-gray-100">
        <Image
            src={featuredImageUrl}
            alt={caseStudy.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      )}

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Case Study Content */}
          <article className="lg:col-span-8">
            {/* The Challenge */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                The Challenge
              </h2>
              <div 
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: challengeContent }}
              />
            </section>

            {/* Our Solution */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Our Solution
              </h2>
              <div 
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: solutionContent }}
              />
            </section>

            {/* Results & Impact */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Results & Impact
              </h2>
              <div 
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: resultsContent }}
              />
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              {/* Action Buttons */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Share & Save</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleBookmark}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 
                      bg-gray-50 border border-gray-200 rounded-xl hover:bg-accent hover:text-white 
                      hover:border-accent transition-all duration-200 font-medium"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                    <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Study'}</span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 
                      bg-primary text-white border border-primary rounded-xl hover:bg-secondary 
                      hover:border-secondary transition-all duration-200 font-medium"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share Case Study</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Related Case Studies */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Continue Reading</h2>
            <Link
              href="/insights/case-studies"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <BookmarkCheck className="h-5 w-5" />
              Explore More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 