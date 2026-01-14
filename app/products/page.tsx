import { getProducts, getCollections } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default async function ProductsPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Digital Assets</span>
          <h1 className="font-display text-4xl font-bold text-white mt-2">
            ALL_<span className="text-neon-magenta">PRODUCTS</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Browse our complete catalog of premium digital goods. Templates, tools, and resources for the modern creator.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded-lg font-display text-sm tracking-wider hover:bg-neon-cyan/20 transition-colors"
          >
            All Products
          </Link>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg font-display text-sm tracking-wider hover:border-neon-magenta/50 hover:text-neon-magenta transition-colors"
            >
              {collection.metadata.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
              <span className="text-5xl">📦</span>
            </div>
            <h2 className="font-display text-2xl text-white mb-4">NO_DATA_FOUND</h2>
            <p className="text-gray-400">Products are currently being uploaded to the network.</p>
          </div>
        )}
      </div>
    </div>
  );
}