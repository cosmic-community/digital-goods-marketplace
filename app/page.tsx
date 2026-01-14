import Link from 'next/link';
import { getProducts, getCollections, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';
import ReviewCard from '@/components/ReviewCard';

export default async function HomePage() {
  const [products, collections, reviews] = await Promise.all([
    getProducts(),
    getCollections(),
    getReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Digital Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover high-quality templates, tools, and resources crafted by experts for your next project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/collections"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              View Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Collections</h2>
            <Link
              href="/collections"
              className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link
              href="/products"
              className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their projects with our digital products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Explore our full catalog of premium digital products and find exactly what you need.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  );
}