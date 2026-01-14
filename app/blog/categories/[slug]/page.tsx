// app/blog/categories/[slug]/page.tsx
import { getBlogCategoryBySlug, getBlogCategories, getBlogPostsByCategory } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogPostCard from '@/components/BlogPostCard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Changed: Enhanced generateMetadata with comprehensive SEO tags
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getBlogCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found | CYBER_MARKET',
      description: 'The requested category could not be found.',
    };
  }

  const title = `${category.metadata.name} - Blog Category | CYBER_MARKET`;
  const description = category.metadata.description || `Browse all posts in the ${category.metadata.name} category on CYBER_MARKET Blog`;
  
  return {
    title,
    description,
    keywords: [category.metadata.name, 'blog', 'category', 'digital products', 'tutorials'],
    openGraph: {
      title: category.metadata.name,
      description,
      type: 'website',
      siteName: 'CYBER_MARKET',
    },
    twitter: {
      card: 'summary',
      title: category.metadata.name,
      description,
    },
    alternates: {
      canonical: `/blog/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getBlogCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getBlogPostsByCategory(category.id);
  const color = category.metadata.color || '#00ffff';

  // Changed: Added JSON-LD structured data for category page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.metadata.name,
    description: category.metadata.description || `Posts in ${category.metadata.name} category`,
    url: `/blog/categories/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.metadata.title,
          description: post.metadata.excerpt,
          url: `/blog/${post.slug}`,
          datePublished: post.metadata.published_date || post.created_at,
          author: post.metadata.author ? {
            '@type': 'Person',
            name: post.metadata.author.metadata.name,
          } : undefined,
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
      {
        '@type': 'ListItem',
        position: 3,
        name: category.metadata.name,
        item: `/blog/categories/${slug}`,
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
            <Link href="/blog/categories" className="text-gray-500 hover:text-neon-cyan transition-colors">
              CATEGORIES
            </Link>
            <span className="text-gray-600" aria-hidden="true">/</span>
            <span style={{ color }} aria-current="page">{category.metadata.name.toUpperCase()}</span>
          </nav>

          {/* Header - Changed: Using semantic header tag */}
          <header className="mb-10">
            <div 
              className="inline-block w-16 h-16 rounded-lg mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${color}20`, borderColor: `${color}50`, borderWidth: '1px' }}
              aria-hidden="true"
            >
              <span className="text-3xl">📁</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-white">
              <span style={{ color }}>{category.metadata.name}</span>
            </h1>
            {category.metadata.description && (
              <p className="text-gray-400 mt-2 max-w-2xl">
                {category.metadata.description}
              </p>
            )}
            <p className="text-gray-500 mt-4 font-display text-sm">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
            </p>
          </header>

          {/* Posts Grid - Changed: Using section with proper semantic structure */}
          {posts.length > 0 ? (
            <section aria-labelledby="category-posts-heading">
              <h2 id="category-posts-heading" className="sr-only">Posts in {category.metadata.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
                <span className="text-5xl" aria-hidden="true">📝</span>
              </div>
              <h2 className="font-display text-2xl text-white mb-4">NO_POSTS_FOUND</h2>
              <p className="text-gray-400 mb-6">No posts in this category yet.</p>
              <Link
                href="/blog"
                className="inline-block cyber-btn px-6 py-3 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white transition-colors"
              >
                Browse All Posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}