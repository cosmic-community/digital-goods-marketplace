// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getCollections, getProductsByCollection } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  
  if (!collection) {
    return {
      title: 'Collection Not Found | CYBER_MARKET',
    };
  }
  
  return {
    title: `${collection.metadata.name} | CYBER_MARKET`,
    description: collection.metadata.description || `Browse ${collection.metadata.name} collection`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = await getProductsByCollection(collection.id);

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-display">
          <Link href="/collections" className="text-gray-500 hover:text-neon-cyan transition-colors">
            COLLECTIONS
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-neon-magenta">{collection.metadata.name}</span>
        </nav>

        {/* Collection Header */}
        <div className="cyber-card rounded-xl overflow-hidden mb-10 relative">
          <div className="h-64 relative">
            {collection.metadata.cover_image ? (
              <img
                src={`${collection.metadata.cover_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
                alt={collection.metadata.name}
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cyber-purple to-cyber-blue" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
                <span className="text-neon-cyan text-xs font-display tracking-widest uppercase">Collection Active</span>
              </div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">
                {collection.metadata.name}
              </h1>
              {collection.metadata.description && (
                <p className="text-gray-400 max-w-2xl">
                  {collection.metadata.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-px bg-neon-cyan"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-neon-cyan"></div>
          </div>
          <div className="absolute top-4 right-4 w-12 h-12">
            <div className="absolute top-0 right-0 w-full h-px bg-neon-magenta"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-neon-magenta"></div>
          </div>
        </div>

        {/* Products in Collection */}
        <div className="mb-8">
          <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">
            // {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
          </span>
        </div>

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
            <h2 className="font-display text-2xl text-white mb-4">NO_PRODUCTS_FOUND</h2>
            <p className="text-gray-400 mb-6">This collection is currently empty.</p>
            <Link
              href="/products"
              className="inline-block cyber-btn px-6 py-3 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white"
            >
              Browse All Products →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}