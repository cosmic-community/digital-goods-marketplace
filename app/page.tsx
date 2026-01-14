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
      <section className="gradient-hero text-white py-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 border border-neon-cyan/50 bg-neon-cyan/10 rounded-full">
            <span className="text-neon-cyan text-sm font-display tracking-widest uppercase">// System Online</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-neon-cyan neon-text">CYBER</span>
            <span className="text-white">_</span>
            <span className="text-neon-magenta neon-text">MARKET</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto font-light">
            Premium digital assets from the neon underground. 
            <span className="text-neon-cyan"> Templates</span>, 
            <span className="text-neon-magenta"> tools</span>, and 
            <span className="text-neon-pink"> resources</span> for creators of tomorrow.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white transition-colors"
            >
              &lt; Browse Products /&gt;
            </Link>
            <Link
              href="/collections"
              className="border border-neon-magenta/50 text-neon-magenta px-8 py-4 rounded-lg font-display font-semibold hover:bg-neon-magenta/10 hover:shadow-neon-magenta transition-all tracking-wider uppercase"
            >
              View Collections
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
      </section>

      {/* Collections Section */}
      <section className="py-20 px-4 bg-cyber-dark/50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// Categories</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2">
                DATA_<span className="text-neon-cyan">COLLECTIONS</span>
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-neon-cyan font-display hover:text-neon-magenta transition-colors group flex items-center gap-2"
            >
              View All 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
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
      <section className="py-20 px-4 bg-cyber-darker relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Featured</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2">
                HOT_<span className="text-neon-magenta">PRODUCTS</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="text-neon-magenta font-display hover:text-neon-cyan transition-colors group flex items-center gap-2"
            >
              View All 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
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
      <section className="py-20 px-4 bg-cyber-dark/50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-neon-pink font-display text-sm tracking-widest uppercase">// Testimonials</span>
            <h2 className="font-display text-3xl font-bold text-white mt-2 mb-4">
              USER_<span className="text-neon-cyan">FEEDBACK</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Verified transmissions from the network. Join thousands who've upgraded their digital arsenal.
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
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple via-cyber-dark to-cyber-blue"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 border border-neon-cyan/30 rounded-full">
            <span className="text-neon-cyan font-display text-sm tracking-widest">SYSTEM_UPGRADE_AVAILABLE</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to <span className="text-neon-magenta neon-text">Jack In</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Access our full catalog of premium digital assets. Your next project awaits in the data stream.
          </p>
          <Link
            href="/products"
            className="inline-block cyber-btn px-10 py-4 rounded-lg font-display font-bold text-lg tracking-wider uppercase text-neon-cyan hover:text-white transition-colors"
          >
            Initialize Download →
          </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-magenta to-transparent"></div>
      </section>
    </div>
  );
}