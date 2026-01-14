import Link from 'next/link';
import { getBlogPosts, getBlogCategories, getAuthors } from '@/lib/cosmic';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'Blog | CYBER_MARKET',
  description: 'Latest news, tutorials, and insights from the digital underground',
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Data Stream</span>
          <h1 className="font-display text-4xl font-bold text-white mt-2">
            CYBER_<span className="text-neon-magenta">BLOG</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Latest transmissions from the network. Tutorials, insights, and news from the digital frontier.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded-lg font-display text-sm tracking-wider hover:bg-neon-cyan/20 transition-colors"
          >
            All Posts
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/categories/${category.slug}`}
              className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg font-display text-sm tracking-wider hover:border-neon-magenta/50 hover:text-neon-magenta transition-colors"
            >
              {category.metadata.name}
            </Link>
          ))}
        </div>

        {posts.length > 0 ? (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <div className="cyber-card rounded-xl overflow-hidden group relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image */}
                      <div className="aspect-[16/9] lg:aspect-auto overflow-hidden bg-cyber-darker relative">
                        {featuredPost.metadata.featured_image ? (
                          <img
                            src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                            alt={featuredPost.metadata.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                          />
                        ) : (
                          <div className="w-full h-full min-h-[300px] flex items-center justify-center text-neon-cyan/30">
                            <span className="text-8xl">📝</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyber-dark/90 lg:block hidden"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <div className="inline-block mb-4">
                          <span className="text-neon-pink font-display text-xs tracking-widest uppercase">// Featured</span>
                        </div>
                        
                        {featuredPost.metadata.category && (
                          <span 
                            className="inline-block text-xs font-display font-medium px-3 py-1 rounded-full tracking-wider uppercase mb-4 w-fit"
                            style={{
                              backgroundColor: `${featuredPost.metadata.category.metadata.color || '#ff00ff'}20`,
                              color: featuredPost.metadata.category.metadata.color || '#ff00ff',
                            }}
                          >
                            {featuredPost.metadata.category.metadata.name}
                          </span>
                        )}
                        
                        <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors">
                          {featuredPost.metadata.title}
                        </h2>
                        
                        {featuredPost.metadata.excerpt && (
                          <p className="text-gray-400 mb-6 line-clamp-3">
                            {featuredPost.metadata.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4">
                          {featuredPost.metadata.author && (
                            <div className="flex items-center gap-3">
                              {featuredPost.metadata.author.metadata.avatar ? (
                                <img
                                  src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                                  alt={featuredPost.metadata.author.metadata.name}
                                  className="w-10 h-10 rounded-full object-cover border border-neon-cyan/30"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                                  {featuredPost.metadata.author.metadata.name.charAt(0)}
                                </div>
                              )}
                              <span className="text-gray-400 font-display">
                                {featuredPost.metadata.author.metadata.name}
                              </span>
                            </div>
                          )}
                          
                          {featuredPost.metadata.reading_time && (
                            <span className="text-gray-500 text-sm font-display">
                              {featuredPost.metadata.reading_time} min read
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8">
                      <div className="absolute top-0 left-0 w-full h-px bg-neon-cyan"></div>
                      <div className="absolute top-0 left-0 w-px h-full bg-neon-cyan"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-8 h-8">
                      <div className="absolute bottom-0 right-0 w-full h-px bg-neon-magenta"></div>
                      <div className="absolute bottom-0 right-0 w-px h-full bg-neon-magenta"></div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Recent Posts Grid */}
            {recentPosts.length > 0 && (
              <div>
                <div className="mb-6">
                  <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// Recent Posts</span>
                  <h2 className="font-display text-2xl font-bold text-white mt-2">
                    LATEST_<span className="text-neon-cyan">TRANSMISSIONS</span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
              <span className="text-5xl">📝</span>
            </div>
            <h2 className="font-display text-2xl text-white mb-4">NO_DATA_FOUND</h2>
            <p className="text-gray-400">Blog posts are currently being uploaded to the network.</p>
          </div>
        )}

        {/* Browse by Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/blog/categories">
            <div className="cyber-card rounded-xl p-8 card-hover group">
              <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Browse By</span>
              <h3 className="font-display text-xl font-bold text-white mt-2 group-hover:text-neon-cyan transition-colors">
                CATEGORIES →
              </h3>
              <p className="text-gray-400 mt-2">Explore posts organized by topic</p>
            </div>
          </Link>
          
          <Link href="/blog/authors">
            <div className="cyber-card rounded-xl p-8 card-hover group">
              <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// Browse By</span>
              <h3 className="font-display text-xl font-bold text-white mt-2 group-hover:text-neon-magenta transition-colors">
                AUTHORS →
              </h3>
              <p className="text-gray-400 mt-2">Discover content from our contributors</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}