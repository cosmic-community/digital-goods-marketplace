import Link from 'next/link';
import { getAuthors, getBlogPosts } from '@/lib/cosmic';
import AuthorCard from '@/components/AuthorCard';

export const metadata = {
  title: 'Authors | CYBER_MARKET Blog',
  description: 'Meet our blog contributors',
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

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-display">
          <Link href="/blog" className="text-gray-500 hover:text-neon-cyan transition-colors">
            BLOG
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-neon-magenta">AUTHORS</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// Our Contributors</span>
          <h1 className="font-display text-4xl font-bold text-white mt-2">
            ALL_<span className="text-neon-cyan">AUTHORS</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Meet the minds behind the content. Discover posts from our talented contributors.
          </p>
        </div>

        {/* Authors Grid */}
        {authors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {authors.map((author) => (
              <AuthorCard 
                key={author.id} 
                author={author} 
                postCount={authorPostCounts[author.id] || 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
              <span className="text-5xl">👤</span>
            </div>
            <h2 className="font-display text-2xl text-white mb-4">NO_DATA_FOUND</h2>
            <p className="text-gray-400">Authors are currently being added to the network.</p>
          </div>
        )}
      </div>
    </div>
  );
}