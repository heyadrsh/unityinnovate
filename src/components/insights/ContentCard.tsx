'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, BookmarkCheck, Calendar, User } from 'lucide-react';

interface ContentCardProps {
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
  onBookmark?: (id: string) => void;
}

const ContentCard = ({
  id,
  title,
  excerpt,
  category,
  industry,
  image,
  author,
  publishDate,
  href,
  isBookmarked = false,
  onBookmark
}: ContentCardProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmark?.(id);
  };

  const getCategoryConfig = () => {
    switch (category) {
      case 'articles':
        return {
          label: 'Article',
          className: 'bg-dark text-white'
        };
      case 'blogs':
        return {
          label: 'Blog',
          className: 'bg-accent text-white'
        };
      case 'case-studies':
        return {
          label: 'Case Study',
          className: 'bg-orange-500 text-white'
        };
      default:
        return {
          label: 'Content',
          className: 'bg-gray-500 text-white'
        };
    }
  };

  const categoryConfig = getCategoryConfig();

  return (
    <Link href={href} className="group block">
      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent hover:-translate-y-1 transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className="absolute top-3 left-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200"
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-orange-500" />
            ) : (
              <Bookmark className="h-4 w-4 text-gray-600 hover:text-accent" />
            )}
          </button>

          {/* Category Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full ${categoryConfig.className}`}>
              {categoryConfig.label}
            </span>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Industry Tag */}
          {industry && (
            <div className="mb-3">
              <span className="text-accent text-sm font-medium">
                {industry}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {author && (
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{author}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{publishDate}</span>
              </div>
            </div>
            
            <div className="text-accent text-xs font-medium">
              Read more →
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ContentCard; 