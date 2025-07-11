'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, BookOpen, Download } from 'lucide-react';
import Image from 'next/image';
import { getArticle } from '@/lib/data-loaders';
import { renderMarkdown } from '@/lib/utils';
import { StrapiArticle, StrapiResponse } from '@/lib/types';

// Fallback article data
const fallbackArticles: Record<string, any> = {
  'market-research-trends-2024': {
    id: 'fallback-2',
    documentId: 'market-research-trends-2024',
    title: 'Market Research Trends 2024: Emerging Methodologies',
    slug: 'market-research-trends-2024',
    excerpt: 'Key insights into emerging market research methodologies and consumer behavior patterns that are shaping the industry.',
    content: `# Market Research Trends 2024: Emerging Methodologies

The landscape of market research is rapidly evolving in 2024, driven by technological advancements and changing consumer behaviors. Organizations are adopting new methodologies to gain deeper insights into their target markets.

## Key Trends Shaping Market Research

### 1. AI-Powered Analytics
Artificial intelligence is revolutionizing how we collect and analyze market data:
- **Automated Survey Design**: AI algorithms optimize questionnaire structure
- **Real-time Sentiment Analysis**: Understanding consumer emotions as they happen
- **Predictive Modeling**: Forecasting market trends with greater accuracy

### 2. Mobile-First Research
With mobile devices dominating digital interactions, research methodologies are adapting:
- **In-the-moment feedback collection**
- **Location-based insights**
- **Voice and video responses**

### 3. Ethical Data Collection
Growing privacy concerns are reshaping data collection practices:
- **Transparent consent processes**
- **Privacy-first methodologies**
- **GDPR and CCPA compliance integration**

### 4. Behavioral Analytics
Moving beyond traditional surveys to understand actual behavior:
- **Digital footprint analysis**
- **User journey mapping**
- **Cross-platform behavior tracking**

## Emerging Consumer Behavior Patterns

### Digital-First Mindset
Consumers increasingly expect seamless digital experiences across all touchpoints.

### Sustainability Focus
Environmental consciousness is becoming a primary decision factor for purchasing decisions.

### Personalization Expectations
Consumers demand tailored experiences and products that match their individual preferences.

## Implementation Strategies

1. **Invest in Technology Infrastructure**: Modern research requires robust data platforms
2. **Train Teams on New Methodologies**: Ensure your team is equipped with the latest skills
3. **Prioritize Data Quality**: Focus on collecting meaningful, actionable insights
4. **Embrace Continuous Research**: Move from periodic studies to ongoing insight generation

The future of market research lies in combining traditional methodologies with innovative technologies to create a more comprehensive understanding of consumer behavior.`,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&crop=center',
      alternativeText: 'Market research trends and methodologies'
    },
    author: 'Unity Innovate Research Team',
    publicationDate: new Date().toISOString(),
    keywords: 'market research, consumer behavior, AI analytics, methodologies',
    isPublished: true
  }
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<StrapiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // First try to get the article from Strapi
        const response = await getArticle(slug);
        if (response?.data?.length > 0) {
          setArticle(response.data[0]);
        } else {
          // If not found in Strapi, check fallback data
          const fallbackArticle = fallbackArticles[slug];
          if (fallbackArticle) {
            setArticle(fallbackArticle);
          } else {
            setError('Article not found');
          }
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        // Try fallback data if Strapi fails
        const fallbackArticle = fallbackArticles[slug];
        if (fallbackArticle) {
          setArticle(fallbackArticle);
        } else {
          setError('Failed to load article');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/insights/articles"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  // Render Markdown content
  const formattedContent = renderMarkdown(article.content);
  const featuredImageUrl = article.featuredImage?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.featuredImage.url}`
    : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-dark to-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/insights/articles"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
            
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4 mr-1" />
                Research Article
              </span>
            </div>
              
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
              
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Unity Innovate</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.publicationDate).toLocaleDateString('en-US', {
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
                alt={article.featuredImage?.alternativeText || article.title}
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

          {/* Attachments */}
          {article.attachments && article.attachments.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Downloads
              </h3>
              <div className="space-y-3">
                {article.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${attachment.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">{attachment.name || 'Download Attachment'}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this article</h3>
                <p className="text-gray-600">Help others discover this research</p>
              </div>
              <button
                onClick={handleShare}
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
              href="/insights/articles"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Explore More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 