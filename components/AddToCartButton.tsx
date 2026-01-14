'use client';

import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function AddToCartButton({
  product,
  variant = 'primary',
  size = 'medium',
  className = '',
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.metadata.name,
      price: product.metadata.price,
      image: product.metadata.featured_image?.imgix_url,
    });
  };

  const baseClasses = 'font-display font-semibold tracking-wider uppercase transition-all relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'cyber-btn text-neon-cyan hover:text-white',
    secondary: 'bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-neon-cyan',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-xs rounded-lg',
    medium: 'px-6 py-3 text-sm rounded-lg',
    large: 'px-8 py-4 text-base rounded-lg',
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add to Cart
      </span>
    </button>
  );
}