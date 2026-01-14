import Link from 'next/link';
import { getBlogCategories, getBlogPosts } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';
import { Metadata } from 'next';

// Changed: Enhanced metadata with Open Graph and Twitter cards
export const metadata: Metadata = {
  title: 'Blog Categories | CYBER_MARKET - Browse by Topic',
  description: 'Browse CYBER_MARKET blog posts by category. Find tutorials, guides, and insights organized by topic including digital products, templates, and creative resources.',
  keywords: ['blog categories', 'topics', 'digital products', 'tutorials', 'templates', 'design resources'],
  openGraph: {
    title: 'Blog Categories | CYBER_MARKET - Browse by Topic',
    description: 'Browse CYBER_MARKET blog posts by category. Find tutorials, guides, and insights organized by topic.',
    type: 'website',
    siteName: 'CYBER_MARKET',
  },
  twitter: {
    card: 'summary',
    title: 'Blog Categories | CYBER_MARKET',
    description: 'Browse blog posts by category. Find tutorials, guides, and insights organized by topic.',
  },
  alternates: {
    canonical: '/blog/categories',
  },
};

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([
    getBlogCategories(),
    getBlogPosts(),
  ]);

  // Count posts per category
  const categoryPostCounts: Record<string, number> = {};
  posts.forEach((post) => {
    if (post.metadata.category) {
      const categoryId = post.metadata.category.id;
      categoryPostCounts[categoryId] = (categoryPostCounts[categoryId] || 0) + 1;
    }
  });

  // Changed: Added JSON-LD structured data for categories listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog Categories',
    description: 'Browse blog posts by category',
    url: '/blog/categories',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.metadata.name,
          description: category.metadata.description,
          url: `/blog/categories/${category.slug}`,
        },
      })),
    },
  };

  // Changed: Added BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: '/blog',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categories',
        item: '/blog/categories',
      },
    ],
  };

  return (
    <>
      {/* Changed: Added JSON-LD scripts for structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="py-12 px-4 min-h-[60vh]">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb - Changed: Added aria-label for accessibility */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm font-display">
            <Link href="/blog" className="text-gray-500 hover:text-neon-cyan transition-colors">
              BLOG
            </Link>
            <span className="text-gray-600" aria-hidden="true">/</span>
            <span className="text-neon-cyan" aria-current="page">CATEGORIES</span>
          </nav>

          {/* Header - Changed: Using semantic header tag */}
          <header className="mb-10">
            <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Browse By Topic</span>
            <h1 className="font-display text-4xl font-bold text-white mt-2">
              ALL_<span className="text-neon-magenta">CATEGORIES</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Explore our content organized by topic. Find exactly what you're looking for.
            </p>
          </header>

          {/* Categories Grid - Changed: Using section with proper semantic structure */}
          {categories.length > 0 ? (
            <section aria-label="Categories list">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <CategoryCard 
                    key={category.id} 
                    category={category} 
                    postCount={categoryPostCounts[category.id] || 0}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
                <span className="text-5xl" aria-hidden="true">📁</span>
              </div>
              <h2 className="font-display text-2xl text-white mb-4">NO_DATA_FOUND</h2>
              <p className="text-gray-400">Categories are currently being configured.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}