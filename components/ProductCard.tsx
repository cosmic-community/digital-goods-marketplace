import Link from 'next/link';
import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md card-hover">
      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          {product.metadata.featured_image ? (
            <img
              src={`${product.metadata.featured_image.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              width={300}
              height={225}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">📦</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {product.metadata.collection && (
            <span className="inline-block text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full mb-2">
              {product.metadata.collection.metadata.name}
            </span>
          )}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.metadata.name}
          </h3>
          <p className="text-xl font-bold text-primary-600">
            ${product.metadata.price}
          </p>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <AddToCartButton product={product} variant="secondary" size="small" className="w-full" />
      </div>
    </article>
  );
}