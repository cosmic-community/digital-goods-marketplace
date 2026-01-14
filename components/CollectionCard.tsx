import Link from 'next/link';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <article className="relative rounded-xl overflow-hidden shadow-md card-hover group h-64">
        {/* Background Image */}
        {collection.metadata.cover_image ? (
          <img
            src={`${collection.metadata.cover_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={collection.metadata.name}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="font-bold text-xl mb-1">{collection.metadata.name}</h3>
          {collection.metadata.description && (
            <p className="text-white/80 text-sm line-clamp-2">
              {collection.metadata.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}