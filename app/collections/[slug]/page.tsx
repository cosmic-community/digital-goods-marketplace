// app/collections/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCollectionBySlug, getProductsByCollection, getCollections } from '@/lib/cosmic';
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
      title: 'Collection Not Found',
    };
  }
  
  return {
    title: `${collection.metadata.name} | Digital Goods Marketplace`,
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
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/collections" className="hover:text-primary-600">Collections</Link></li>
            <li>/</li>
            <li className="text-gray-900">{collection.metadata.name}</li>
          </ol>
        </nav>

        {/* Collection Header */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          {collection.metadata.cover_image ? (
            <img
              src={`${collection.metadata.cover_image.imgix_url}?w=1600&h=400&fit=crop&auto=format,compress`}
              alt={collection.metadata.name}
              width={800}
              height={200}
              className="w-full h-48 md:h-64 object-cover"
            />
          ) : (
            <div className="w-full h-48 md:h-64 bg-gradient-to-r from-primary-500 to-accent-500" />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{collection.metadata.name}</h1>
              {collection.metadata.description && (
                <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                  {collection.metadata.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Products in this Collection ({products.length})
          </h2>
          
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <p className="text-gray-500 text-lg">No products in this collection yet.</p>
              <Link
                href="/products"
                className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700"
              >
                Browse All Products →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}