import { getCollections } from '@/lib/cosmic';
import CollectionCard from '@/components/CollectionCard';

export const metadata = {
  title: 'Collections | Digital Goods Marketplace',
  description: 'Browse our curated collections of premium digital products',
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Collections</h1>
          <p className="text-lg text-gray-600">
            Browse our curated collections of premium digital products organized by category.
          </p>
        </div>

        {/* Collections Grid */}
        {collections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No collections found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}