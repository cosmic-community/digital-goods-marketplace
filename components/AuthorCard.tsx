import Link from 'next/link';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
  postCount?: number;
}

export default function AuthorCard({ author, postCount }: AuthorCardProps) {
  return (
    <Link href={`/blog/authors/${author.slug}`}>
      <div className="cyber-card rounded-xl p-6 card-hover group relative overflow-hidden">
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-6 bg-gradient-to-b from-neon-magenta to-transparent"></div>
          <div className="absolute top-0 right-0 h-px w-6 bg-gradient-to-l from-neon-magenta to-transparent"></div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {author.metadata.avatar ? (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-neon-magenta/30 group-hover:border-neon-magenta/60 transition-colors"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-neon-magenta/10 border-2 border-neon-magenta/30 flex items-center justify-center text-neon-magenta text-2xl font-display font-bold group-hover:border-neon-magenta/60 transition-colors">
              {author.metadata.name.charAt(0)}
            </div>
          )}
          
          {/* Info */}
          <div className="flex-1">
            <h3 className="font-display font-semibold text-white group-hover:text-neon-magenta transition-colors tracking-wide text-lg mb-1">
              {author.metadata.name}
            </h3>
            
            {postCount !== undefined && (
              <span className="text-sm text-gray-500 font-display">
                {postCount} {postCount === 1 ? 'post' : 'posts'}
              </span>
            )}
            
            {author.metadata.bio && (
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {author.metadata.bio}
              </p>
            )}
            
            {/* Social Links */}
            <div className="flex gap-3 mt-3">
              {author.metadata.social_twitter && (
                <span className="text-gray-500 hover:text-neon-cyan transition-colors text-sm">
                  @{author.metadata.social_twitter}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </Link>
  );
}