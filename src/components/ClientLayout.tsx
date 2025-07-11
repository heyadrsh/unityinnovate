'use client';

import { useEffect, useState } from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensure consistent body className on client
    document.body.className = 'min-h-screen flex flex-col bg-white hydrated';
    
    // Mark as hydrated to prevent hydration mismatch
    setIsHydrated(true);
  }, []);

  // Show a minimal loading state during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Unity Innovate</h2>
            <p className="text-gray-600 text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 