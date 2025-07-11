'use client';

import { useState, useEffect } from 'react';
import InsightsHero from '@/components/insights/InsightsHero';
import SearchBar from '@/components/insights/SearchBar';
import ContentGrid from '@/components/insights/ContentGrid';
import Pagination from '@/components/insights/Pagination';
import Newsletter from '@/components/insights/Newsletter';
import { getBlogs } from '@/lib/data-loaders';
import { extractTextFromContent } from '@/lib/utils';

const ITEMS_PER_PAGE = 6;

interface StrapiImage {
  url: string;
  alternativeText?: string;
}

interface StrapiBlog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any[];
  excerpt: string;
  publicationDate: string;
  isPublished: boolean;
  featuredImage?: StrapiImage;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

interface BlogData {
  data: StrapiBlog[];
}

const BlogsPage = () => {
  const [allBlogs, setAllBlogs] = useState<StrapiBlog[]>([]);
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ category?: string; industry?: string }>({});
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  // Fetch blogs from Strapi
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response: BlogData = await getBlogs();
        const blogs = response.data || [];
        
        // Transform Strapi data to frontend format
        const transformedBlogs = blogs.map(blog => ({
          id: blog.documentId,
          title: blog.title,
          excerpt: blog.excerpt || extractTextFromContent(blog.content).substring(0, 200) + '...',
          category: 'blogs' as const,
          industry: '', // You can add industry field to Strapi schema if needed
          image: blog.featuredImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${blog.featuredImage.url}` : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center',
          author: 'Unity Innovate', // You can add author field to Strapi schema if needed
          publishDate: new Date(blog.publicationDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          href: `/insights/blogs/${blog.slug}`,
        }));
        
        setAllBlogs(blogs);
        setFilteredContent(transformedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setFilteredContent([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
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
    let filtered = allBlogs.map(blog => ({
      id: blog.documentId,
      title: blog.title,
      excerpt: blog.excerpt || extractTextFromContent(blog.content).substring(0, 200) + '...',
      category: 'blogs' as const,
      industry: '', 
      image: blog.featuredImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${blog.featuredImage.url}` : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center',
      author: 'Unity Innovate',
      publishDate: new Date(blog.publicationDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      href: `/insights/blogs/${blog.slug}`,
    }));

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
        title="Expert Blogs & Insights"
        subtitle="Discover thought leadership articles and expert perspectives on industry trends, emerging technologies, and strategic innovations."
        breadcrumb="Blogs"
        align="left"
        showSearch={false}
      />

      {/* Search and Filters */}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        placeholder="Search blogs by title, topic, or author..."
        initialFilters={{ ...filters, category: 'blogs' }}
      />

      {/* Content Section */}
      <main className="container py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">
              Blogs
            </h1>
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${filteredContent.length} ${filteredContent.length === 1 ? 'article' : 'articles'} found`}
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
              ? "No blogs match your search criteria. Try adjusting your filters."
              : "No blogs available at the moment."
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

export default BlogsPage; 