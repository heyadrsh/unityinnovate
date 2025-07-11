import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://unityinnovate.com'),
  title: {
    default: 'Unity Innovate - Research-Led. Tech-Enabled. Future-Aligned.',
    template: '%s | Unity Innovate'
  },
  description: "Unity Innovate is a cutting-edge global insights and innovation partner that enables companies to make bold, proactive choices in a world that is changing quickly.",
  keywords: [
    'innovation consulting',
    'business consulting',
    'digital transformation',
    'strategic planning',
    'value and access',
    'pharmaceuticals',
    'cosmetics',
    'energy storage',
    'mobility',
    'consumer health'
  ],
  authors: [{ name: 'Unity Innovate Team' }],
  creator: 'Unity Innovate',
  publisher: 'Unity Innovate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://unityinnovate.com',
    siteName: 'Unity Innovate',
    title: 'Unity Innovate - Innovation & Business Consulting',
    description: 'Unity Innovate is a cutting-edge global insights and innovation partner that enables companies to make bold, proactive choices in a world that is changing quickly.',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Unity Innovate Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unity Innovate - Innovation & Business Consulting',
    description: 'Unity Innovate is a cutting-edge global insights and innovation partner that enables companies to make bold, proactive choices in a world that is changing quickly.',
    images: ['/logo.webp'],
    creator: '@unityinnovate',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://unityinnovate.com',
  },
  category: 'business',
  icons: {
    icon: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7EDDDD" />
        <meta name="msapplication-TileColor" content="#7EDDDD" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
            <ClientLayout>
              <Navigation />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ClientLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
