// app/blog/categories/[slug]/page.tsx
import { getBlogCategoryBySlug, getBlogCategories, getBlogPostsByCategory } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogPostCard from '@/components/BlogPostCard';

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getBlogCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found | CYBER_MARKET',
    };
  }
  
  return {
    title: `${category.metadata.name} | CYBER_MARKET Blog`,
    description: category.metadata.description || `Browse posts in ${category.metadata.name}`,
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

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-display">
          <Link href="/blog" className="text-gray-500 hover:text-neon-cyan transition-colors">
            BLOG
          </Link>
          <span className="text-gray-600">/</span>
          <Link href="/blog/categories" className="text-gray-500 hover:text-neon-cyan transition-colors">
            CATEGORIES
          </Link>
          <span className="text-gray-600">/</span>
          <span style={{ color }}>{category.metadata.name.toUpperCase()}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div 
            className="inline-block w-16 h-16 rounded-lg mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${color}20`, borderColor: `${color}50`, borderWidth: '1px' }}
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
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
              <span className="text-5xl">📝</span>
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
  );
}