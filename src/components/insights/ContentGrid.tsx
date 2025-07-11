'use client';

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

interface ContentGridProps {
  content: ContentItem[];
  loading?: boolean;
  onBookmark?: (id: string) => void;
  emptyMessage?: string;
}

const LoadingSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
      <div className="flex justify-between pt-4 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="col-span-full text-center py-16">
    <div className="max-w-md mx-auto">
      <div className="w-24 h-24 mx-auto mb-6 bg-light rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.539-1.153l-.548-.547z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const ContentGrid = ({ 
  content, 
  loading = false, 
  onBookmark,
  emptyMessage = "No content available at the moment. Please check back later."
}: ContentGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (content.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.map((item) => (
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
  );
};

export default ContentGrid; 