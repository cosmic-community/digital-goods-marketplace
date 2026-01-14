'use client';

import { useState } from 'react';
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
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    
    // Show feedback briefly
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
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
      disabled={isAdding}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        isAdding ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isAdding ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Added!
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Cart
          </>
        )}
      </span>
    </button>
  );
}