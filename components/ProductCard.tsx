import Link from 'next/link';
import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="cyber-card rounded-xl overflow-hidden card-hover group relative">
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-neon-cyan to-transparent"></div>
        <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-neon-cyan to-transparent"></div>
      </div>
      
      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="aspect-[4/3] overflow-hidden bg-cyber-darker relative">
          {product.metadata.featured_image ? (
            <img
              src={`${product.metadata.featured_image.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              width={300}
              height={225}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neon-cyan/30">
              <span className="text-5xl">📦</span>
            </div>
          )}
          
          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyber-dark to-transparent"></div>
        </div>

        {/* Product Info */}
        <div className="p-4 relative">
          {product.metadata.collection && (
            <span className="inline-block text-xs font-display font-medium text-neon-magenta bg-neon-magenta/10 px-2 py-1 rounded mb-2 tracking-wider uppercase">
              {product.metadata.collection.metadata.name}
            </span>
          )}
          <h3 className="font-display font-semibold text-white mb-2 line-clamp-1 group-hover:text-neon-cyan transition-colors tracking-wide">
            {product.metadata.name}
          </h3>
          <p className="text-2xl font-display font-bold text-neon-cyan">
            <span className="text-gray-500 text-sm mr-1">$</span>
            {product.metadata.price}
          </p>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <AddToCartButton product={product} variant="secondary" size="small" className="w-full" />
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </article>
  );
}