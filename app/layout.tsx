import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';
import { CartProvider } from '@/contexts/CartContext';

// Changed: Enhanced global metadata with comprehensive SEO settings
export const metadata: Metadata = {
  title: {
    default: 'CYBER_MARKET // Digital Goods',
    template: '%s | CYBER_MARKET',
  },
  description: 'Premium digital products from the neon underground. Templates, tools, and resources for the future.',
  keywords: ['digital products', 'templates', 'design resources', 'creative assets', 'digital marketplace'],
  authors: [{ name: 'CYBER_MARKET' }],
  creator: 'CYBER_MARKET',
  publisher: 'CYBER_MARKET',
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cyber-market.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CYBER_MARKET',
    title: 'CYBER_MARKET // Digital Goods',
    description: 'Premium digital products from the neon underground. Templates, tools, and resources for the future.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CYBER_MARKET // Digital Goods',
    description: 'Premium digital products from the neon underground.',
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
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;
  
  // Changed: Added JSON-LD for organization schema
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CYBER_MARKET',
    description: 'Premium digital products from the neon underground',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cyber-market.vercel.app',
    logo: '/favicon.svg',
  };

  // Changed: Added JSON-LD for website schema
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CYBER_MARKET',
    description: 'Premium digital products from the neon underground. Templates, tools, and resources for the future.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cyber-market.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cyber-market.vercel.app'}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
        {/* Changed: Added global JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col cyber-grid">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </CartProvider>
      </body>
    </html>
  );
}