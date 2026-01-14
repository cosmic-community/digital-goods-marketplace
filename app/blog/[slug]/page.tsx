// app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getBlogPosts } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogPostCard from '@/components/BlogPostCard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Changed: Enhanced generateMetadata with comprehensive SEO tags
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | CYBER_MARKET',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${post.metadata.title} | CYBER_MARKET Blog`;
  const description = post.metadata.excerpt?.substring(0, 160) || `Read ${post.metadata.title} on CYBER_MARKET Blog`;
  const imageUrl = post.metadata.featured_image?.imgix_url 
    ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined;
  
  return {
    title,
    description,
    keywords: post.metadata.category 
      ? [post.metadata.category.metadata.name, 'blog', 'digital products', 'tutorials']
      : ['blog', 'digital products', 'tutorials'],
    authors: post.metadata.author ? [{ name: post.metadata.author.metadata.name }] : undefined,
    openGraph: {
      title: post.metadata.title,
      description,
      type: 'article',
      publishedTime: post.metadata.published_date || post.created_at,
      authors: post.metadata.author ? [post.metadata.author.metadata.name] : undefined,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.metadata.title }] : undefined,
      siteName: 'CYBER_MARKET',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const formattedDate = post.metadata.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    : null;

  // Changed: Added comprehensive JSON-LD structured data for blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.excerpt || '',
    image: post.metadata.featured_image?.imgix_url 
      ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      : undefined,
    datePublished: post.metadata.published_date || post.created_at,
    dateModified: post.modified_at || post.metadata.published_date || post.created_at,
    author: post.metadata.author ? {
      '@type': 'Person',
      name: post.metadata.author.metadata.name,
      description: post.metadata.author.metadata.bio,
      url: `/blog/authors/${post.metadata.author.slug}`,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'CYBER_MARKET',
      logo: {
        '@type': 'ImageObject',
        url: '/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/blog/${slug}`,
    },
    articleSection: post.metadata.category?.metadata.name,
    wordCount: post.metadata.reading_time ? post.metadata.reading_time * 200 : undefined,
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
      ...(post.metadata.category ? [{
        '@type': 'ListItem',
        position: 2,
        name: post.metadata.category.metadata.name,
        item: `/blog/categories/${post.metadata.category.slug}`,
      }] : []),
      {
        '@type': 'ListItem',
        position: post.metadata.category ? 3 : 2,
        name: post.metadata.title,
        item: `/blog/${slug}`,
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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb - Changed: Enhanced with proper semantic markup and aria */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm font-display">
            <Link href="/blog" className="text-gray-500 hover:text-neon-cyan transition-colors">
              BLOG
            </Link>
            <span className="text-gray-600" aria-hidden="true">/</span>
            {post.metadata.category && (
              <>
                <Link 
                  href={`/blog/categories/${post.metadata.category.slug}`} 
                  className="text-gray-500 hover:text-neon-magenta transition-colors"
                >
                  {post.metadata.category.metadata.name.toUpperCase()}
                </Link>
                <span className="text-gray-600" aria-hidden="true">/</span>
              </>
            )}
            <span className="text-neon-cyan truncate max-w-[200px]" aria-current="page">{post.metadata.title}</span>
          </nav>

          {/* Article - Changed: Using semantic article tag with proper structure */}
          <article itemScope itemType="https://schema.org/BlogPosting">
            {/* Article Header */}
            <header className="mb-10">
              {post.metadata.category && (
                <Link href={`/blog/categories/${post.metadata.category.slug}`}>
                  <span 
                    className="inline-block text-xs font-display font-medium px-3 py-1 rounded-full tracking-wider uppercase mb-4 hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: `${post.metadata.category.metadata.color || '#ff00ff'}20`,
                      color: post.metadata.category.metadata.color || '#ff00ff',
                    }}
                    itemProp="articleSection"
                  >
                    {post.metadata.category.metadata.name}
                  </span>
                </Link>
              )}
              
              <h1 
                className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide leading-tight"
                itemProp="headline"
              >
                {post.metadata.title}
              </h1>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                {post.metadata.author && (
                  <Link 
                    href={`/blog/authors/${post.metadata.author.slug}`}
                    className="flex items-center gap-3 hover:text-neon-cyan transition-colors"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    {post.metadata.author.metadata.avatar ? (
                      <img
                        src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={post.metadata.author.metadata.name}
                        className="w-10 h-10 rounded-full object-cover border border-neon-cyan/30"
                        itemProp="image"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                        {post.metadata.author.metadata.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-display" itemProp="name">{post.metadata.author.metadata.name}</span>
                  </Link>
                )}
                
                {formattedDate && (
                  <>
                    <span className="text-neon-cyan/50" aria-hidden="true">•</span>
                    <time 
                      dateTime={post.metadata.published_date} 
                      className="font-display text-sm"
                      itemProp="datePublished"
                    >
                      {formattedDate}
                    </time>
                  </>
                )}
                
                {post.metadata.reading_time && (
                  <>
                    <span className="text-neon-cyan/50" aria-hidden="true">•</span>
                    <span className="font-display text-sm">{post.metadata.reading_time} min read</span>
                  </>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.metadata.featured_image && (
              <figure className="cyber-card rounded-xl overflow-hidden mb-10 relative">
                <img
                  src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                  alt={post.metadata.title}
                  className="w-full aspect-[16/9] object-cover"
                  itemProp="image"
                  loading="eager"
                />
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12" aria-hidden="true">
                  <div className="absolute top-0 left-0 w-full h-px bg-neon-cyan"></div>
                  <div className="absolute top-0 left-0 w-px h-full bg-neon-cyan"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12" aria-hidden="true">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-neon-magenta"></div>
                  <div className="absolute bottom-0 right-0 w-px h-full bg-neon-magenta"></div>
                </div>
              </figure>
            )}

            {/* Changed: Article Content - Using custom blog-content class for better styling */}
            <div className="mb-16" itemProp="articleBody">
              {post.metadata.content ? (
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.metadata.content }}
                />
              ) : post.metadata.excerpt ? (
                <p className="text-gray-300 leading-relaxed text-lg">{post.metadata.excerpt}</p>
              ) : (
                <p className="text-gray-500 italic">No content available.</p>
              )}
            </div>
          </article>

          {/* Author Bio */}
          {post.metadata.author && (
            <aside aria-label="About the author" className="cyber-card rounded-xl p-6 mb-16">
              <div className="flex items-start gap-4">
                <Link href={`/blog/authors/${post.metadata.author.slug}`}>
                  {post.metadata.author.metadata.avatar ? (
                    <img
                      src={`${post.metadata.author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-neon-magenta/30 hover:border-neon-magenta/60 transition-colors"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-neon-magenta/10 border-2 border-neon-magenta/30 flex items-center justify-center text-neon-magenta text-xl font-display font-bold hover:border-neon-magenta/60 transition-colors">
                      {post.metadata.author.metadata.name.charAt(0)}
                    </div>
                  )}
                </Link>
                
                <div className="flex-1">
                  <span className="text-neon-magenta font-display text-xs tracking-widest uppercase">// Written By</span>
                  <Link href={`/blog/authors/${post.metadata.author.slug}`}>
                    <h2 className="font-display font-semibold text-white hover:text-neon-magenta transition-colors text-lg mt-1">
                      {post.metadata.author.metadata.name}
                    </h2>
                  </Link>
                  {post.metadata.author.metadata.bio && (
                    <p className="text-gray-400 mt-2 text-sm">
                      {post.metadata.author.metadata.bio}
                    </p>
                  )}
                  
                  <div className="flex gap-4 mt-3">
                    {post.metadata.author.metadata.social_twitter && (
                      <a 
                        href={`https://twitter.com/${post.metadata.author.metadata.social_twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-neon-cyan transition-colors text-sm font-display"
                        aria-label={`Follow ${post.metadata.author.metadata.name} on Twitter`}
                      >
                        @{post.metadata.author.metadata.social_twitter}
                      </a>
                    )}
                    {post.metadata.author.metadata.social_github && (
                      <a 
                        href={`https://github.com/${post.metadata.author.metadata.social_github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-neon-cyan transition-colors text-sm font-display"
                        aria-label={`View ${post.metadata.author.metadata.name}'s GitHub profile`}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-posts-heading">
              <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent mb-12" aria-hidden="true"></div>
              <div className="mb-8">
                <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// You May Also Like</span>
                <h2 id="related-posts-heading" className="font-display text-2xl font-bold text-white mt-2">
                  RELATED_<span className="text-neon-cyan">POSTS</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}