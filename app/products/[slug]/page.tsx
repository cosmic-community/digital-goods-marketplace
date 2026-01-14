// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getReviewsByProduct, getProducts } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: `${product.metadata.name} | Digital Goods Marketplace`,
    description: product.metadata.description?.substring(0, 160) || `Buy ${product.metadata.name}`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);
  
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + parseInt(review.metadata.rating.key), 0) / reviews.length
    : 0;

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-primary-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.metadata.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            {product.metadata.featured_image ? (
              <img
                src={`${product.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata.name}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.metadata.collection && (
              <Link
                href={`/collections/${product.metadata.collection.slug}`}
                className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4 hover:bg-primary-100 transition-colors"
              >
                {product.metadata.collection.metadata.name}
              </Link>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.metadata.name}
            </h1>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-gray-600">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ${product.metadata.price}
              </span>
            </div>

            {/* Description */}
            {product.metadata.description && (
              <div className="prose prose-gray max-w-none mb-8">
                <div className="text-gray-600 whitespace-pre-wrap">
                  {product.metadata.description.replace(/[#*]/g, '').trim()}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <button className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors text-lg">
              Purchase Now
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews ({reviews.length})
          </h2>
          
          {reviews.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}