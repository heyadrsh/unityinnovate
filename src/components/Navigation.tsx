'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNavigation } from '@/lib/data-loaders';
import { StrapiNavigation } from '@/lib/types';

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [navigationData, setNavigationData] = useState<StrapiNavigation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Better scroll detection with cross-browser compatibility
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollTop > 50); // Increased threshold for better activation
    };
    
    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setLoading(true);
        const response = await getNavigation();
        if (response?.data?.[0]) {
          setNavigationData(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching navigation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent accidental menu closing
    setHoverTimeout(timeout);
  };

  const toggleMobileDropdown = (label: string) => {
    setActiveMobileDropdown(activeMobileDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  // Fallback navigation items if Strapi data is not available
  const fallbackLeftNavItems: NavItem[] = [
    {
      label: 'Industries',
      href: '/industries',
      dropdown: [
        { label: 'Pharmaceuticals', href: '/industries/pharmaceuticals' },
        { label: 'Cosmetics & Personal Care', href: '/industries/cosmetics-personal-care' },
        { label: 'Consumer Health', href: '/industries/consumer-health' },
        { label: 'Energy & Storage', href: '/industries/energy-storage' },
        { label: 'Mobility & Automotives', href: '/industries/mobility-automotives' },
      ]
    },
    {
      label: 'Services',
      href: '/services',
      dropdown: [
        { label: 'Innovation Consulting', href: '/services/innovation-consulting' },
        { label: 'Business Consulting', href: '/services/business-consulting' },
        { label: 'Value & Access', href: '/services/value-access' },
      ]
    },
    {
      label: 'Insights',
      href: '/insights',
      dropdown: [
        { label: 'Blogs', href: '/insights/blogs' },
        { label: 'Case Studies', href: '/insights/case-studies' },
        { label: 'Articles', href: '/insights/articles' },
      ]
    }
  ];

  const fallbackRightNavItems: NavItem[] = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' }
  ];

  // Parse navigation data from Strapi
  const leftNavItems: NavItem[] = navigationData?.headerNavigation?.leftItems || fallbackLeftNavItems;
  const rightNavItems: NavItem[] = navigationData?.headerNavigation?.rightItems || fallbackRightNavItems;

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out",
      isScrolled 
        ? "bg-black border-b border-white/20 shadow-lg" 
        : "bg-black"
    )}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo and Left Navigation grouped together */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.webp"
                alt="Unity Innovate"
                width={180}
                height={50}
                className="h-10 w-auto sm:h-12 max-w-[120px] sm:max-w-[180px]"
                priority
              />
            </Link>
            {/* Left Navigation - Industries, Services, Insights */}
            {!loading && (
            <div className="hidden lg:flex items-center space-x-12 ml-16">
              {leftNavItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-white text-sm font-medium group-hover:text-accent transition-all duration-300 py-3"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    {item.dropdown && (
                      <ChevronDown className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-300",
                        activeDropdown === item.label ? "transform -translate-y-1 rotate-180" : ""
                      )} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div 
                      className="absolute top-full left-0 mt-0.5 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-1 
                        transform opacity-0 scale-95 transition-all duration-200 origin-top-left
                        group-hover:opacity-100 group-hover:scale-100"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary relative group/item
                            transition-all duration-200"
                        >
                          <span className="relative z-10">{subItem.label}</span>
                          <span className="absolute inset-0 w-0 bg-gray-50 transition-all duration-200 group-hover/item:w-full"></span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}
          </div>

          {/* Right Navigation - About Us, Careers, Contact Us */}
          <div className="hidden lg:flex items-center space-x-12">
            {!loading && rightNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative group text-white text-sm font-medium transition-colors duration-300 py-3"
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
            
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#1D3A3A] via-[#2D5A5A] to-[#4A9B9B] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-white/10 shadow-xl z-50">
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="container py-4 px-6">
              {/* Left Navigation Items with Collapsible Dropdowns */}
              <div className="space-y-1">
                {leftNavItems.map((item) => (
                  <div key={item.label} className="border-b border-white/10 pb-1">
                    {/* Main Navigation Item */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 text-white text-sm font-medium py-2 hover:text-accent transition-colors duration-200"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                      {item.dropdown && (
                        <button
                          onClick={() => toggleMobileDropdown(item.label)}
                          className="p-1 text-white hover:text-accent transition-colors duration-200"
                        >
                          <ChevronRight 
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
                              activeMobileDropdown === item.label ? "rotate-90" : ""
                            )} 
                          />
                        </button>
                      )}
                    </div>
                    
                    {/* Collapsible Dropdown */}
                    {item.dropdown && (
                      <div className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        activeMobileDropdown === item.label 
                          ? "max-h-64 opacity-100" 
                          : "max-h-0 opacity-0"
                      )}>
                        <div className="pl-3 pb-1 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block text-gray-300 text-xs py-1.5 px-2 rounded-md hover:text-accent hover:bg-white/5 transition-all duration-200"
                              onClick={closeMobileMenu}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Right Navigation Items */}
              <div className="mt-4 space-y-1">
                {rightNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-white text-sm font-medium py-2 border-b border-white/10 hover:text-accent transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Contact Button */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <Link
                  href="/contact"
                  className="btn-primary text-center block w-full text-sm py-2 hover:scale-105 transition-transform duration-300"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 