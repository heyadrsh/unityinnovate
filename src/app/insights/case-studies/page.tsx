'use client';

import { useState, useEffect } from 'react';
import InsightsHero from '@/components/insights/InsightsHero';
import SearchBar from '@/components/insights/SearchBar';
import ContentGrid from '@/components/insights/ContentGrid';
import Pagination from '@/components/insights/Pagination';
import Newsletter from '@/components/insights/Newsletter';
import { getCaseStudies } from '@/lib/data-loaders';
import { extractTextFromContent } from '@/lib/utils';

const ITEMS_PER_PAGE = 6;

interface StrapiImage {
  url: string;
  alternativeText?: string;
}

interface StrapiCaseStudy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any[];
  excerpt: string;
  clientName: string;
  industry: string;
  challenge: any[];
  solution: any[];
  results: any[];
  publicationDate: string;
  isPublished: boolean;
  featuredImage?: StrapiImage;
  gallery?: StrapiImage[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

interface CaseStudyData {
  data: StrapiCaseStudy[];
}

const CaseStudiesPage = () => {
  const [allCaseStudies, setAllCaseStudies] = useState<StrapiCaseStudy[]>([]);
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ category?: string; industry?: string }>({});
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  // Fetch case studies from Strapi
  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        setLoading(true);
        const response: CaseStudyData = await getCaseStudies();
        const caseStudies = response.data || [];
        
        // Transform Strapi data to frontend format
        const transformedCaseStudies = caseStudies.map(caseStudy => ({
          id: caseStudy.documentId,
          title: caseStudy.title,
          excerpt: caseStudy.excerpt || extractTextFromContent(caseStudy.challenge).substring(0, 200) + '...',
          category: 'case-studies' as const,
          industry: caseStudy.industry || '',
          image: caseStudy.featuredImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${caseStudy.featuredImage.url}` : 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
          author: 'Unity Innovate Team',
          publishDate: new Date(caseStudy.publicationDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          href: `/insights/case-studies/${caseStudy.slug}`,
        }));
        
        setAllCaseStudies(caseStudies);
        setFilteredContent(transformedCaseStudies);
      } catch (error) {
        console.error('Error fetching case studies:', error);
        setFilteredContent([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCaseStudies();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentContent = filteredContent.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    applyFilters(query, filters);
  };

  const handleFilterChange = (newFilters: { category?: string; industry?: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query: string, currentFilters: { category?: string; industry?: string }) => {
    let filtered = allCaseStudies.map(caseStudy => ({
      id: caseStudy.documentId,
      title: caseStudy.title,
      excerpt: caseStudy.excerpt || extractTextFromContent(caseStudy.challenge).substring(0, 200) + '...',
      category: 'case-studies' as const,
      industry: caseStudy.industry || '',
      image: caseStudy.featuredImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${caseStudy.featuredImage.url}` : 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
      author: 'Unity Innovate Team',
      publishDate: new Date(caseStudy.publicationDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      href: `/insights/case-studies/${caseStudy.slug}`,
    }));

      // Apply search query
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(searchTerm) ||
          item.excerpt.toLowerCase().includes(searchTerm) ||
          item.industry?.toLowerCase().includes(searchTerm)
        );
      }

      // Apply industry filter
      if (currentFilters.industry) {
        filtered = filtered.filter(item => 
          item.industry?.toLowerCase() === currentFilters.industry?.toLowerCase()
        );
      }

      setFilteredContent(filtered);
  };

  const handleBookmark = (id: string) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <InsightsHero
        title="Success Stories & Case Studies"
        subtitle="Explore real-world implementations and measurable results from our strategic consulting engagements across diverse industries."
        breadcrumb="Case Studies"
        align="left"
        showSearch={false}
      />

      {/* Search and Filters */}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        placeholder="Search case studies by title, industry, or solution..."
        initialFilters={{ ...filters, category: 'case-studies' }}
      />

      {/* Content Section */}
      <main className="container py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">
              Case Studies
            </h1>
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${filteredContent.length} ${filteredContent.length === 1 ? 'case study' : 'case studies'} found`}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <ContentGrid
          content={currentContent.map(item => ({
            ...item,
            isBookmarked: bookmarkedItems.has(item.id)
          }))}
          loading={loading}
          onBookmark={handleBookmark}
          emptyMessage={
            searchQuery || filters.industry
              ? "No case studies match your search criteria. Try adjusting your filters."
              : "No case studies available at the moment."
          }
        />

        {/* Pagination */}
        {!loading && filteredContent.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default CaseStudiesPage; 