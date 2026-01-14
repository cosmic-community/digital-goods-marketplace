import Link from 'next/link';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <article className="relative rounded-xl overflow-hidden card-hover group h-64 border border-neon-cyan/20">
        {/* Background Image */}
        {collection.metadata.cover_image ? (
          <img
            src={`${collection.metadata.cover_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={collection.metadata.name}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-80"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyber-purple to-cyber-blue" />
        )}

        {/* Cyber Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/60 to-transparent" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)'
        }}></div>

        {/* Corner Accents */}
        <div className="absolute top-3 left-3 w-8 h-8">
          <div className="absolute top-0 left-0 w-full h-px bg-neon-cyan"></div>
          <div className="absolute top-0 left-0 w-px h-full bg-neon-cyan"></div>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8">
          <div className="absolute top-0 right-0 w-full h-px bg-neon-magenta"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-neon-magenta"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            <span className="text-neon-cyan text-xs font-display tracking-widest uppercase">Active</span>
          </div>
          <h3 className="font-display font-bold text-xl mb-1 text-white group-hover:text-neon-cyan transition-colors tracking-wide">
            {collection.metadata.name}
          </h3>
          {collection.metadata.description && (
            <p className="text-gray-400 text-sm line-clamp-2">
              {collection.metadata.description}
            </p>
          )}
        </div>
        
        {/* Hover border effect */}
        <div className="absolute inset-0 border border-neon-cyan/0 group-hover:border-neon-cyan/50 rounded-xl transition-colors"></div>
      </article>
    </Link>
  );
}