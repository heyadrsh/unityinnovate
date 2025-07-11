'use client';

import { useState, useEffect } from 'react';
import { BookOpen, PenTool, Briefcase } from 'lucide-react';
import InsightsHero from '@/components/insights/InsightsHero';
import CategorySection from '@/components/insights/CategorySection';
import Newsletter from '@/components/insights/Newsletter';
import { getBlogs, getCaseStudies, getArticles } from '@/lib/data-loaders';

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  category: 'blogs' | 'case-studies' | 'articles';
  industry?: string;
  image: string;
  author?: string;
  publishDate: string;
  href: string;
  isBookmarked?: boolean;
}

const InsightsPage = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());
  const [blogs, setBlogs] = useState<ContentItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<ContentItem[]>([]);
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // Fetch all content from Strapi
      const [blogsResponse, caseStudiesResponse, articlesResponse] = await Promise.all([
        getBlogs(),
        getCaseStudies(),
        getArticles()
      ]);

      // Transform blogs data
      if (blogsResponse?.data) {
        const blogItems: ContentItem[] = blogsResponse.data.slice(0, 3).map((blog: any) => ({
          id: blog.documentId,
          title: blog.title,
          excerpt: blog.excerpt,
      category: 'blogs' as const,
          industry: 'Technology',
          image: blog.featuredImage?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${blog.featuredImage.url}`
            : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center',
          author: 'Unity Innovate Team',
          publishDate: new Date(blog.publicationDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          href: `/insights/blogs/${blog.slug}`,
        }));
        setBlogs(blogItems);
      }

      // Transform case studies data
      if (caseStudiesResponse?.data) {
        const caseStudyItems: ContentItem[] = caseStudiesResponse.data.slice(0, 3).map((caseStudy: any) => ({
          id: caseStudy.documentId,
          title: caseStudy.title,
          excerpt: caseStudy.excerpt,
      category: 'case-studies' as const,
          industry: caseStudy.industry,
          image: caseStudy.featuredImage?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${caseStudy.featuredImage.url}`
            : 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
      author: 'Unity Innovate Team',
          publishDate: new Date(caseStudy.publicationDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          href: `/insights/case-studies/${caseStudy.slug}`,
        }));
        setCaseStudies(caseStudyItems);
      }

      // Transform articles data
      if (articlesResponse?.data) {
        const articleItems: ContentItem[] = articlesResponse.data.slice(0, 3).map((article: any) => ({
          id: article.documentId,
          title: article.title,
          excerpt: article.excerpt,
          category: 'articles' as const,
          industry: article.researchType || 'Research',
          image: article.featuredImage?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.featuredImage.url}`
            : 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
          author: 'Unity Innovate Research Team',
          publishDate: new Date(article.publicationDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          href: `/insights/articles/${article.slug}`,
        }));
        setArticles(articleItems);
      }

    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

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

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // TODO: Implement search functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <InsightsHero
        title="Industry Insights & Expertise Hub"
        subtitle="Discover cutting-edge research, expert analysis, and proven strategies that drive innovation across industries."
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="container section-padding">
        {/* Blogs Section */}
        <CategorySection
          title="Latest Blogs"
          description="Expert perspectives on industry trends, emerging technologies, and strategic insights from our thought leaders."
          content={blogs.map(item => ({
            ...item,
            isBookmarked: bookmarkedItems.has(item.id)
          }))}
          viewAllHref="/insights/blogs"
          icon={<PenTool className="h-5 w-5 text-accent" />}
          onBookmark={handleBookmark}
        />

        {/* Case Studies Section */}
        <CategorySection
          title="Case Studies"
          description="Real-world success stories showcasing our proven methodologies and measurable results across diverse industries."
          content={caseStudies.map(item => ({
            ...item,
            isBookmarked: bookmarkedItems.has(item.id)
          }))}
          viewAllHref="/insights/case-studies"
          icon={<Briefcase className="h-5 w-5 text-accent" />}
          onBookmark={handleBookmark}
        />

        {/* Articles Section */}
        <CategorySection
          title="Research Articles"
          description="In-depth analysis and research on market dynamics, technological innovations, and strategic frameworks."
          content={articles.map(item => ({
            ...item,
            isBookmarked: bookmarkedItems.has(item.id)
          }))}
          viewAllHref="/insights/articles"
          icon={<BookOpen className="h-5 w-5 text-accent" />}
          onBookmark={handleBookmark}
        />
      </main>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default InsightsPage; 