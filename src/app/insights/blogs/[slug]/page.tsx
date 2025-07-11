'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { getBlog } from '@/lib/data-loaders';
import { renderMarkdown } from '@/lib/utils';
import { StrapiBlog, StrapiResponse } from '@/lib/types';

// Fallback blog data for hardcoded insights
const fallbackBlogs: Record<string, any> = {
  'digital-transformation-guide': {
    id: 'fallback-1',
    documentId: 'digital-transformation-guide',
    title: 'Digital Transformation: A Complete Guide for Business Leaders',
    slug: 'digital-transformation-guide',
    excerpt: 'A comprehensive guide for business leaders navigating digital transformation in the modern business landscape.',
    content: `# Digital Transformation: A Complete Guide for Business Leaders

Digital transformation has become a critical imperative for businesses across all industries. In today's rapidly evolving technological landscape, organizations must adapt or risk becoming obsolete.

## What is Digital Transformation?

Digital transformation is the integration of digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers. It's also a cultural change that requires organizations to continually challenge the status quo, experiment, and get comfortable with failure.

## Key Components of Digital Transformation

### 1. Technology Infrastructure
Modern cloud-based infrastructure forms the backbone of any digital transformation initiative. This includes:
- Cloud computing platforms
- Data analytics tools
- Artificial intelligence and machine learning
- Internet of Things (IoT) devices

### 2. Data-Driven Decision Making
Organizations must develop capabilities to collect, analyze, and act on data insights in real-time.

### 3. Customer Experience
Digital transformation should ultimately improve customer experience through personalized services and seamless interactions.

### 4. Operational Efficiency
Automation and digitization of processes to improve efficiency and reduce costs.

## Best Practices for Implementation

1. **Start with Strategy**: Define clear objectives and success metrics
2. **Invest in Culture**: Ensure your team is ready for change
3. **Choose the Right Technology**: Select tools that align with your goals
4. **Measure and Iterate**: Continuously monitor progress and adjust

Digital transformation is not a destination but a continuous journey of evolution and adaptation.`,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&crop=center',
      alternativeText: 'Digital transformation concept'
    },
    author: 'Unity Innovate',
    publicationDate: new Date().toISOString(),
    keywords: 'digital transformation, business strategy, technology, innovation',
    isPublished: true
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<StrapiBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchBlog = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // First try to get the blog from Strapi
        const response = await getBlog(slug as string);
        if (response?.data?.length > 0) {
          setBlog(response.data[0]);
        } else {
          // If not found in Strapi, check fallback data
          const fallbackBlog = fallbackBlogs[slug];
          if (fallbackBlog) {
            setBlog(fallbackBlog);
          } else {
      setError('Blog post not found');
          }
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        // Try fallback data if Strapi fails
        const fallbackBlog = fallbackBlogs[slug];
        if (fallbackBlog) {
          setBlog(fallbackBlog);
        } else {
          setError('Failed to load blog post');
        }
    } finally {
      setLoading(false);
    }
  };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/insights/blogs"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Render Markdown content
  const formattedContent = blog?.content ? renderMarkdown(blog.content) : '';
  const featuredImageUrl = blog?.featuredImage?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${blog.featuredImage.url}`
    : null;

  // Extract keywords as tags
  const tags = blog?.keywords ? blog.keywords.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-dark to-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/insights/blogs"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
            
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4 mr-1" />
                Blog
                </span>
              </div>
              
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {blog?.title}
              </h1>
              
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {blog?.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Unity Innovate</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{blog?.publicationDate && new Date(blog.publicationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
      {/* Featured Image */}
          {featuredImageUrl && (
            <div className="mb-12">
        <Image
                src={featuredImageUrl}
                alt={blog?.featuredImage?.alternativeText || blog?.title || ''}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          priority
        />
      </div>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-gray max-w-none mb-12">
            <div 
              className="content"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
                  </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                    {tag}
                  </span>
                    ))}
                  </div>
                </div>
          )}

          {/* Share */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this article</h3>
                <p className="text-gray-600">Help others discover this content</p>
              </div>
                    <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog?.title || '',
                      text: blog?.excerpt || '',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
                    </button>
                  </div>
          </div>
        </article>
      </main>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Continue Reading</h2>
            <Link
              href="/insights/blogs"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Explore More Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 