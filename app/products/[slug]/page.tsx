// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-display">
          <Link href="/products" className="text-gray-500 hover:text-neon-cyan transition-colors">
            PRODUCTS
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-neon-cyan">{product.metadata.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="cyber-card rounded-xl overflow-hidden relative group">
            {product.metadata.featured_image ? (
              <img
                src={`${product.metadata.featured_image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                alt={product.metadata.name}
                className="w-full aspect-[4/3] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-cyber-darker flex items-center justify-center text-neon-cyan/30">
                <span className="text-8xl">📦</span>
              </div>
            )}
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-px bg-neon-cyan"></div>
              <div className="absolute top-0 left-0 w-px h-full bg-neon-cyan"></div>
            </div>
            <div className="absolute bottom-4 right-4 w-12 h-12">
              <div className="absolute bottom-0 right-0 w-full h-px bg-neon-magenta"></div>
              <div className="absolute bottom-0 right-0 w-px h-full bg-neon-magenta"></div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.metadata.collection && (
              <Link
                href={`/collections/${product.metadata.collection.slug}`}
                className="inline-block text-xs font-display font-medium text-neon-magenta bg-neon-magenta/10 px-3 py-1 rounded-full mb-4 tracking-wider uppercase hover:bg-neon-magenta/20 transition-colors"
              >
                {product.metadata.collection.metadata.name}
              </Link>
            )}

            <h1 className="font-display text-4xl font-bold text-white mb-4 tracking-wide">
              {product.metadata.name}
            </h1>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-gray-500 font-display">PRICE:</span>
              <span className="text-4xl font-display font-bold text-neon-cyan">
                <span className="text-gray-500 text-2xl">$</span>
                {product.metadata.price}
              </span>
            </div>

            {product.metadata.description && (
              <div className="mb-8">
                <h3 className="font-display text-sm text-neon-cyan mb-2 tracking-widest uppercase">// Description</h3>
                <p className="text-gray-400 leading-relaxed">
                  {product.metadata.description}
                </p>
              </div>
            )}

            {/* Features */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <span className="w-8 h-8 rounded bg-neon-green/10 flex items-center justify-center text-neon-green text-sm">✓</span>
                <span className="font-display">Instant Digital Download</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <span className="w-8 h-8 rounded bg-neon-green/10 flex items-center justify-center text-neon-green text-sm">✓</span>
                <span className="font-display">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <span className="w-8 h-8 rounded bg-neon-green/10 flex items-center justify-center text-neon-green text-sm">✓</span>
                <span className="font-display">Free Updates</span>
              </div>
            </div>

            <AddToCartButton product={product} variant="primary" size="large" className="w-full" />

            {/* Security badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-display tracking-wide">SECURE_TRANSACTION_GUARANTEED</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent mb-12"></div>
            <div className="mb-8">
              <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// You May Also Like</span>
              <h2 className="font-display text-2xl font-bold text-white mt-2">
                RELATED_<span className="text-neon-cyan">PRODUCTS</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}