'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Facebook, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getGlobalSettings } from '@/lib/data-loaders';

interface GlobalSettings {
  siteName: string;
  siteDescription: string;
  email: string;
  phone: string;
  address: string;
  facebookURL?: string;
  twitterURL?: string;
  instagramURL?: string;
  logo?: {
    url: string;
    alternativeText?: string;
  };
}

const Footer = () => {
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const industries = [
    { label: 'Pharmaceuticals', href: '/industries/pharmaceuticals' },
    { label: 'Cosmetics & Personal Care', href: '/industries/cosmetics-personal-care' },
    { label: 'Consumer Health', href: '/industries/consumer-health' },
    { label: 'Energy & Storage', href: '/industries/energy-storage' },
    { label: 'Mobility & Automotives', href: '/industries/mobility-automotives' },
  ];

  const consultingServices = [
    { label: 'Innovation Consulting', href: '/services/innovation-consulting' },
    { label: 'Business Consulting', href: '/services/business-consulting' },
    { label: 'Value & Access', href: '/services/value-access' },
  ];

  const insights = [
    { label: 'Articles', href: '/insights/articles' },
    { label: 'Blogs', href: '/insights/blogs' },
    { label: 'Case Studies', href: '/insights/case-studies' },
  ];

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        setLoading(true);
        const response = await getGlobalSettings();
        if (response?.data) {
          setGlobalSettings(response.data);
        }
      } catch (error) {
        console.error('Error fetching global settings:', error);
        // Fallback to default settings
        setGlobalSettings({
          siteName: 'Unity Innovate',
          siteDescription: 'Research-Led. Tech-Enabled. Future-Aligned.',
          email: 'contact@unityinnovate.com',
          phone: '+91 7835877980',
          address: 'HQ: 2088, Patel Nagar West,\nNew Delhi, India - 110008'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalSettings();
  }, []);

  // Use fallback values if global settings are not loaded
  const settings = globalSettings || {
    siteName: 'Unity Innovate',
    siteDescription: 'Research-Led. Tech-Enabled. Future-Aligned.',
    email: 'contact@unityinnovate.com',
    phone: '+91 7835877980',
    address: 'HQ: 2088, Patel Nagar West,\nNew Delhi, India - 110008'
  };

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer Content */}
      <div className="container py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Industries */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Industries</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {industries.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-accent transition-colors duration-200 text-xs sm:text-sm leading-relaxed block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consulting Services */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Services</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {consultingServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-accent transition-colors duration-200 text-xs sm:text-sm leading-relaxed block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Insights */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Insights</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {insights.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-accent transition-colors duration-200 text-xs sm:text-sm leading-relaxed block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Additional Links */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800">
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-accent transition-colors duration-200 text-xs sm:text-sm leading-relaxed block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-400 hover:text-accent transition-colors duration-200 text-xs sm:text-sm leading-relaxed block"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Contact Us</h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400">
              <p>
                <a 
                  href={`mailto:${settings.email}`}
                  className="hover:text-accent transition-colors duration-200 break-all"
                >
                  {settings.email}
                </a>
              </p>
              <p>
                <a 
                  href={`tel:${settings.phone}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {settings.phone}
                </a>
              </p>
              <div className="text-xs leading-relaxed">
                {settings.address.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              {settings.facebookURL && (
                <a href={settings.facebookURL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors duration-200">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              )}
              {settings.twitterURL && (
                <a href={settings.twitterURL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors duration-200">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              )}
              {settings.instagramURL && (
                <a href={settings.instagramURL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors duration-200">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col space-y-3 text-xs sm:text-sm text-gray-400">
            <p className="text-center">
              © 2025 {settings.siteName} - All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 sm:space-x-6">
              <Link 
                href="/privacy-policy" 
                className="hover:text-accent transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-use" 
                className="hover:text-accent transition-colors duration-200"
              >
                Terms of use
              </Link>
              <Link 
                href="/cookie-policy" 
                className="hover:text-accent transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 