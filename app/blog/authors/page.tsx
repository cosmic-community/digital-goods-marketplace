import Link from 'next/link';
import { getAuthors, getBlogPosts } from '@/lib/cosmic';
import AuthorCard from '@/components/AuthorCard';
import { Metadata } from 'next';

// Changed: Enhanced metadata with Open Graph and Twitter cards
export const metadata: Metadata = {
  title: 'Blog Authors | CYBER_MARKET - Meet Our Contributors',
  description: 'Meet the talented contributors behind CYBER_MARKET blog. Discover content from expert writers covering digital products, tutorials, and creative resources.',
  keywords: ['blog authors', 'contributors', 'writers', 'digital products', 'tutorials'],
  openGraph: {
    title: 'Blog Authors | CYBER_MARKET - Meet Our Contributors',
    description: 'Meet the talented contributors behind CYBER_MARKET blog. Discover content from expert writers.',
    type: 'website',
    siteName: 'CYBER_MARKET',
  },
  twitter: {
    card: 'summary',
    title: 'Blog Authors | CYBER_MARKET',
    description: 'Meet the talented contributors behind CYBER_MARKET blog.',
  },
  alternates: {
    canonical: '/blog/authors',
  },
};

export default async function AuthorsPage() {
  const [authors, posts] = await Promise.all([
    getAuthors(),
    getBlogPosts(),
  ]);

  // Count posts per author
  const authorPostCounts: Record<string, number> = {};
  posts.forEach((post) => {
    if (post.metadata.author) {
      const authorId = post.metadata.author.id;
      authorPostCounts[authorId] = (authorPostCounts[authorId] || 0) + 1;
    }
  });

  // Changed: Added JSON-LD structured data for authors listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog Authors',
    description: 'Meet the contributors behind CYBER_MARKET blog',
    url: '/blog/authors',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: authors.map((author, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: author.metadata.name,
          description: author.metadata.bio,
          url: `/blog/authors/${author.slug}`,
          image: author.metadata.avatar?.imgix_url,
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
        name: 'Authors',
        item: '/blog/authors',
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
            <span className="text-neon-magenta" aria-current="page">AUTHORS</span>
          </nav>

          {/* Header - Changed: Using semantic header tag */}
          <header className="mb-10">
            <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// Our Contributors</span>
            <h1 className="font-display text-4xl font-bold text-white mt-2">
              ALL_<span className="text-neon-cyan">AUTHORS</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Meet the minds behind the content. Discover posts from our talented contributors.
            </p>
          </header>

          {/* Authors Grid - Changed: Using section with proper semantic structure */}
          {authors.length > 0 ? (
            <section aria-label="Authors list">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {authors.map((author) => (
                  <AuthorCard 
                    key={author.id} 
                    author={author} 
                    postCount={authorPostCounts[author.id] || 0}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
                <span className="text-5xl" aria-hidden="true">👤</span>
              </div>
              <h2 className="font-display text-2xl text-white mb-4">NO_DATA_FOUND</h2>
              <p className="text-gray-400">Authors are currently being added to the network.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}