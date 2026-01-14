import Link from 'next/link';
import { getBlogCategories, getBlogPosts } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata = {
  title: 'Categories | CYBER_MARKET Blog',
  description: 'Browse blog posts by category',
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

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-display">
          <Link href="/blog" className="text-gray-500 hover:text-neon-cyan transition-colors">
            BLOG
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-neon-cyan">CATEGORIES</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Browse By Topic</span>
          <h1 className="font-display text-4xl font-bold text-white mt-2">
            ALL_<span className="text-neon-magenta">CATEGORIES</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Explore our content organized by topic. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                postCount={categoryPostCounts[category.id] || 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
              <span className="text-5xl">📁</span>
            </div>
            <h2 className="font-display text-2xl text-white mb-4">NO_DATA_FOUND</h2>
            <p className="text-gray-400">Categories are currently being configured.</p>
          </div>
        )}
      </div>
    </div>
  );
}