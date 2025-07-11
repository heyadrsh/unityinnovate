'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { getArticles } from '@/lib/data-loaders';

// Fallback articles data
const fallbackArticles = [
  {
    id: 'fallback-2',
    documentId: 'market-research-trends-2024',
    title: 'Market Research Trends 2024: Emerging Methodologies',
    slug: 'market-research-trends-2024',
    excerpt: 'Key insights into emerging market research methodologies and consumer behavior patterns that are shaping the industry.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
      alternativeText: 'Market research trends'
    },
    author: 'Unity Innovate Research Team',
    publicationDate: new Date().toISOString(),
    isPublished: true
  }
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
    setLoading(true);
      try {
        const response = await getArticles();
        if (response?.data && response.data.length > 0) {
          setArticles(response.data);
        } else {
          // Use fallback data if no articles found
          setArticles(fallbackArticles);
      }
      } catch (err) {
        console.error('Error fetching articles:', err);
        // Use fallback data on error
        setArticles(fallbackArticles);
      } finally {
      setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-dark to-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Articles
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              In-depth analysis and expert perspectives on industry trends and market insights
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id || article.documentId} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.featuredImage?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center'}
                      alt={article.featuredImage?.alternativeText || article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full bg-dark text-white">
                        ARTICLE
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-dark mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(article.publicationDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/insights/articles/${article.slug || article.documentId}`}
                        className="text-accent text-xs font-medium hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h2>
              <p className="text-gray-600">We're working on adding more content. Check back soon!</p>
            </div>
        )}
        </div>
      </main>
    </div>
  );
} 