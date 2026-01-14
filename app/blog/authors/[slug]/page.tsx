// app/blog/authors/[slug]/page.tsx
import { getAuthorBySlug, getAuthors, getBlogPostsByAuthor } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogPostCard from '@/components/BlogPostCard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

// Changed: Enhanced generateMetadata with comprehensive SEO tags
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    return {
      title: 'Author Not Found | CYBER_MARKET',
      description: 'The requested author could not be found.',
    };
  }

  const title = `${author.metadata.name} - Author | CYBER_MARKET Blog`;
  const description = author.metadata.bio || `Read all posts by ${author.metadata.name} on CYBER_MARKET Blog`;
  const imageUrl = author.metadata.avatar?.imgix_url
    ? `${author.metadata.avatar.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`
    : undefined;
  
  return {
    title,
    description,
    keywords: ['author', author.metadata.name, 'blog', 'digital products', 'tutorials'],
    openGraph: {
      title: author.metadata.name,
      description,
      type: 'profile',
      images: imageUrl ? [{ url: imageUrl, width: 400, height: 400, alt: author.metadata.name }] : undefined,
      siteName: 'CYBER_MARKET',
    },
    twitter: {
      card: 'summary',
      title: author.metadata.name,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `/blog/authors/${slug}`,
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getBlogPostsByAuthor(author.id);

  // Changed: Added JSON-LD structured data for author profile
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.metadata.name,
      description: author.metadata.bio,
      url: `/blog/authors/${slug}`,
      image: author.metadata.avatar?.imgix_url 
        ? `${author.metadata.avatar.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`
        : undefined,
      sameAs: [
        author.metadata.social_twitter ? `https://twitter.com/${author.metadata.social_twitter}` : null,
        author.metadata.social_github ? `https://github.com/${author.metadata.social_github}` : null,
      ].filter(Boolean),
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
      {
        '@type': 'ListItem',
        position: 3,
        name: author.metadata.name,
        item: `/blog/authors/${slug}`,
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
            <Link href="/blog/authors" className="text-gray-500 hover:text-neon-cyan transition-colors">
              AUTHORS
            </Link>
            <span className="text-gray-600" aria-hidden="true">/</span>
            <span className="text-neon-magenta" aria-current="page">{author.metadata.name.toUpperCase()}</span>
          </nav>

          {/* Author Header - Changed: Using semantic header and aside tags */}
          <header className="cyber-card rounded-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              {author.metadata.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-neon-magenta/30"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-neon-magenta/10 border-4 border-neon-magenta/30 flex items-center justify-center text-neon-magenta text-4xl font-display font-bold" aria-hidden="true">
                  {author.metadata.name.charAt(0)}
                </div>
              )}
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <span className="text-neon-magenta font-display text-xs tracking-widest uppercase">// Author Profile</span>
                <h1 className="font-display text-3xl font-bold text-white mt-2 mb-4">
                  {author.metadata.name}
                </h1>
                
                {author.metadata.bio && (
                  <p className="text-gray-400 mb-4 max-w-2xl">
                    {author.metadata.bio}
                  </p>
                )}
                
                <p className="text-gray-500 font-display text-sm mb-4">
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
                </p>
                
                {/* Social Links - Changed: Added aria-labels for accessibility */}
                <div className="flex gap-4 justify-center md:justify-start">
                  {author.metadata.social_twitter && (
                    <a 
                      href={`https://twitter.com/${author.metadata.social_twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors font-display text-sm"
                      aria-label={`Follow ${author.metadata.name} on Twitter`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      @{author.metadata.social_twitter}
                    </a>
                  )}
                  {author.metadata.social_github && (
                    <a 
                      href={`https://github.com/${author.metadata.social_github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors font-display text-sm"
                      aria-label={`View ${author.metadata.name}'s GitHub profile`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      {author.metadata.social_github}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Posts by Author - Changed: Using section with proper heading */}
          <section aria-labelledby="author-posts-heading">
            <div className="mb-8">
              <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Posts By This Author</span>
              <h2 id="author-posts-heading" className="font-display text-2xl font-bold text-white mt-2">
                PUBLISHED_<span className="text-neon-magenta">CONTENT</span>
              </h2>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
                  <span className="text-5xl" aria-hidden="true">📝</span>
                </div>
                <h3 className="font-display text-2xl text-white mb-4">NO_POSTS_YET</h3>
                <p className="text-gray-400 mb-6">This author hasn't published any posts yet.</p>
                <Link
                  href="/blog"
                  className="inline-block cyber-btn px-6 py-3 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white transition-colors"
                >
                  Browse All Posts
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}