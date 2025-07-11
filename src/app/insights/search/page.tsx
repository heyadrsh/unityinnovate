'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import InsightsHero from '@/components/insights/InsightsHero';
import SearchBar from '@/components/insights/SearchBar';
import ContentGrid from '@/components/insights/ContentGrid';
import Pagination from '@/components/insights/Pagination';
import Newsletter from '@/components/insights/Newsletter';

// Mock data - combine all content types
const allContent = [
  // Blogs
  {
    id: '1',
    title: 'The Future of Digital Transformation in Healthcare',
    excerpt: 'Exploring how digital technologies are revolutionizing patient care and medical research across the pharmaceutical industry.',
    category: 'blogs' as const,
    industry: 'Pharmaceuticals',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center',
    author: 'Dr. Sarah Chen',
    publishDate: 'March 15, 2024',
    href: '/insights/blogs/future-digital-transformation-healthcare',
  },
  // Case Studies
  {
    id: '3',
    title: 'Accelerating Drug Discovery: AI-Powered Research Platform',
    excerpt: 'How a leading pharmaceutical company reduced research timelines by 40% using innovative AI technologies.',
    category: 'case-studies' as const,
    industry: 'Pharmaceuticals',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
    author: 'Unity Innovate Team',
    publishDate: 'March 8, 2024',
    href: '/insights/case-studies/ai-drug-discovery-platform',
  },
  // Articles
  {
    id: '5',
    title: 'Innovation Management in the Post-Pandemic Era',
    excerpt: 'Key strategies for maintaining innovation momentum while adapting to remote collaboration and changing market demands.',
    category: 'articles' as const,
    industry: 'Consumer Health',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
    author: 'Dr. James Wilson',
    publishDate: 'February 28, 2024',
    href: '/insights/articles/innovation-management-post-pandemic',
  },
];

const ITEMS_PER_PAGE = 9;

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const [filteredContent, setFilteredContent] = useState(allContent);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<{ category?: string; industry?: string }>({
    category: searchParams.get('category') || '',
    industry: searchParams.get('industry') || '',
  });
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  // Calculate pagination
  const totalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentContent = filteredContent.slice(startIndex, endIndex);

  useEffect(() => {
    // Apply initial filters from URL params
    applyFilters(searchQuery, filters);
  }, []);

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
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filtered = allContent;

      // Apply search query
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(searchTerm) ||
          item.excerpt.toLowerCase().includes(searchTerm) ||
          item.industry?.toLowerCase().includes(searchTerm) ||
          item.author?.toLowerCase().includes(searchTerm)
        );
      }

      // Apply category filter
      if (currentFilters.category) {
        filtered = filtered.filter(item => 
          item.category === currentFilters.category
        );
      }

      // Apply industry filter
      if (currentFilters.industry) {
        filtered = filtered.filter(item => 
          item.industry?.toLowerCase() === currentFilters.industry?.toLowerCase()
        );
      }

      setFilteredContent(filtered);
      setLoading(false);
    }, 300);
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

  const getResultsText = () => {
    const hasQuery = searchQuery.trim();
    const hasFilters = filters.category || filters.industry;
    
    if (hasQuery && hasFilters) {
      return `Search results for "${searchQuery}" with filters applied`;
    } else if (hasQuery) {
      return `Search results for "${searchQuery}"`;
    } else if (hasFilters) {
      return 'Filtered results';
    } else {
      return 'All insights';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <InsightsHero
        title="Search Results"
        subtitle="Find the insights you're looking for across our comprehensive knowledge base of articles, case studies, and expert analysis."
        showSearch={false}
      />

      {/* Search and Filters */}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        placeholder="Search across all insights..."
        initialFilters={filters}
      />

      {/* Content Section */}
      <main className="container py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">
              {getResultsText()}
            </h1>
            <p className="text-gray-600">
              {filteredContent.length} {filteredContent.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        {!filters.category && (
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => handleFilterChange({ ...filters, category: 'blogs' })}
              className="px-4 py-2 bg-accent/10 text-accent rounded-lg border border-accent/20 hover:bg-accent hover:text-white transition-colors duration-200"
            >
              Blogs Only
            </button>
            <button
              onClick={() => handleFilterChange({ ...filters, category: 'case-studies' })}
              className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-200 hover:bg-orange-500 hover:text-white transition-colors duration-200"
            >
              Case Studies Only
            </button>
            <button
              onClick={() => handleFilterChange({ ...filters, category: 'articles' })}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-600 hover:text-white transition-colors duration-200"
            >
              Articles Only
            </button>
          </div>
        )}

        {/* Content Grid */}
        <ContentGrid
          content={currentContent.map(item => ({
            ...item,
            isBookmarked: bookmarkedItems.has(item.id)
          }))}
          loading={loading}
          onBookmark={handleBookmark}
          emptyMessage={
            searchQuery || filters.category || filters.industry
              ? "No results match your search criteria. Try adjusting your search terms or filters."
              : "No content available at the moment."
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

const SearchPageFallback = () => (
  <div className="min-h-screen bg-white">
    <InsightsHero
      title="Search Results"
      subtitle="Find the insights you're looking for across our comprehensive knowledge base of articles, case studies, and expert analysis."
      showSearch={false}
    />
    <div className="container py-12">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </div>
  </div>
);

const SearchPage = () => {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage; 