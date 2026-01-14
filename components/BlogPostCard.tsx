import Link from 'next/link';
import { BlogPost } from '@/types';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = post.metadata.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
      })
    : null;

  return (
    // Changed: Using semantic article tag with proper itemScope for microdata
    <article 
      className="cyber-card rounded-xl overflow-hidden card-hover group relative"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-neon-cyan to-transparent"></div>
        <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-neon-cyan to-transparent"></div>
      </div>
      
      <Link href={`/blog/${post.slug}`} itemProp="url">
        {/* Featured Image */}
        <div className="aspect-[16/9] overflow-hidden bg-cyber-darker relative">
          {post.metadata.featured_image ? (
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.metadata.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              loading="lazy"
              itemProp="image"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neon-cyan/30">
              <span className="text-5xl" aria-hidden="true">📝</span>
            </div>
          )}
          
          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden="true"></div>
          
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyber-dark to-transparent" aria-hidden="true"></div>
          
          {/* Category Badge */}
          {post.metadata.category && (
            <div className="absolute top-4 left-4">
              <span 
                className="inline-block text-xs font-display font-medium px-3 py-1 rounded-full tracking-wider uppercase"
                style={{
                  backgroundColor: `${post.metadata.category.metadata.color || '#ff00ff'}20`,
                  color: post.metadata.category.metadata.color || '#ff00ff',
                  borderColor: `${post.metadata.category.metadata.color || '#ff00ff'}50`,
                  borderWidth: '1px'
                }}
                itemProp="articleSection"
              >
                {post.metadata.category.metadata.name}
              </span>
            </div>
          )}
        </div>

        {/* Post Info */}
        <div className="p-5 relative">
          {/* Meta info - Changed: Added time element with datetime for SEO */}
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 font-display tracking-wider">
            {formattedDate && (
              <time dateTime={post.metadata.published_date} itemProp="datePublished">
                {formattedDate}
              </time>
            )}
            {post.metadata.reading_time && (
              <>
                <span className="text-neon-cyan/50" aria-hidden="true">•</span>
                <span>{post.metadata.reading_time} min read</span>
              </>
            )}
          </div>
          
          <h3 
            className="font-display font-semibold text-white mb-3 line-clamp-2 group-hover:text-neon-cyan transition-colors tracking-wide text-lg"
            itemProp="headline"
          >
            {post.metadata.title}
          </h3>
          
          {post.metadata.excerpt && (
            <p className="text-gray-400 text-sm line-clamp-2 mb-4" itemProp="description">
              {post.metadata.excerpt}
            </p>
          )}
          
          {/* Author - Changed: Added itemScope for author microdata */}
          {post.metadata.author && (
            <div 
              className="flex items-center gap-3 pt-4 border-t border-neon-cyan/10"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              {post.metadata.author.metadata.avatar ? (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  className="w-8 h-8 rounded-full object-cover border border-neon-cyan/30"
                  itemProp="image"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan text-sm" aria-hidden="true">
                  {post.metadata.author.metadata.name.charAt(0)}
                </div>
              )}
              <span className="text-sm text-gray-400 font-display" itemProp="name">
                {post.metadata.author.metadata.name}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
    </article>
  );
}