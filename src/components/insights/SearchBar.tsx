'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: { category?: string; industry?: string }) => void;
  placeholder?: string;
  showFilters?: boolean;
  initialFilters?: { category?: string; industry?: string };
}

const SearchBar = ({
  onSearch,
  onFilterChange,
  placeholder = "Search insights, articles, case studies...",
  showFilters = true,
  initialFilters = {}
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'articles', label: 'Articles' },
    { value: 'blogs', label: 'Blogs' },
    { value: 'case-studies', label: 'Case Studies' },
  ];

  const industries = [
    { value: '', label: 'All Industries' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'cosmetics-personal-care', label: 'Cosmetics & Personal Care' },
    { value: 'consumer-health', label: 'Consumer Health' },
    { value: 'energy-storage', label: 'Energy & Storage' },
    { value: 'mobility-automotives', label: 'Mobility & Automotives' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', industry: '' };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const hasActiveFilters = filters.category || filters.industry;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container py-8">
        {/* Main Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-2 flex items-center"
            >
              <span className="bg-accent hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                Search
              </span>
            </button>
          </div>
        </form>

        {/* Filters Section */}
        {showFilters && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-accent transition-colors duration-200"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
                {hasActiveFilters && (
                  <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                    {(filters.category ? 1 : 0) + (filters.industry ? 1 : 0)}
                  </span>
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-accent transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                    {categories.find(c => c.value === filters.category)?.label}
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className="ml-2 hover:text-accent/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.industry && (
                  <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                    {industries.find(i => i.value === filters.industry)?.label}
                    <button
                      onClick={() => handleFilterChange('industry', '')}
                      className="ml-2 hover:text-accent/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Filter Dropdowns */}
        {showFilters && isFilterOpen && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={filters.industry || ''}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 