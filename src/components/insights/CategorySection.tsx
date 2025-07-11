'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ContentCard from './ContentCard';

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

interface CategorySectionProps {
  title: string;
  description: string;
  content: ContentItem[];
  viewAllHref: string;
  icon?: React.ReactNode;
  maxItems?: number;
  onBookmark?: (id: string) => void;
}

const CategorySection = ({
  title,
  description,
  content,
  viewAllHref,
  icon,
  maxItems = 3,
  onBookmark
}: CategorySectionProps) => {
  const displayContent = content.slice(0, maxItems);

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            {icon && (
              <div className="mr-3 p-2 bg-accent/10 rounded-lg">
                {icon}
              </div>
            )}
            <h2 className="text-3xl font-bold text-dark tracking-tight">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            {description}
          </p>
        </div>

        <Link
          href={viewAllHref}
          className="hidden sm:flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-200 group"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Content Grid */}
      {displayContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayContent.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              excerpt={item.excerpt}
              category={item.category}
              industry={item.industry}
              image={item.image}
              author={item.author}
              publishDate={item.publishDate}
              href={item.href}
              isBookmarked={item.isBookmarked}
              onBookmark={onBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No content yet</h3>
            <p className="text-gray-600">New {title.toLowerCase()} will appear here soon.</p>
          </div>
        </div>
      )}

      {/* Mobile View All Button */}
      <div className="sm:hidden">
        <Link
          href={viewAllHref}
          className="flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-200 group w-full"
        >
          <span>View All {title}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
};

export default CategorySection; 