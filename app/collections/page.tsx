import { getCollections } from '@/lib/cosmic';
import CollectionCard from '@/components/CollectionCard';

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// Categories</span>
          <h1 className="font-display text-4xl font-bold text-white mt-2">
            DATA_<span className="text-neon-cyan">COLLECTIONS</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Browse our curated collections of premium digital assets. Each collection is carefully organized for your specific needs.
          </p>
        </div>

        {/* Collections Grid */}
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
              <span className="text-5xl">📁</span>
            </div>
            <h2 className="font-display text-2xl text-white mb-4">NO_COLLECTIONS_FOUND</h2>
            <p className="text-gray-400">Collections are currently being initialized.</p>
          </div>
        )}
      </div>
    </div>
  );
}