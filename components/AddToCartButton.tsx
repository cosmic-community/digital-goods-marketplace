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

  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
  };

  const sizeStyles = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
        isAdding ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      {isAdding ? (
        <>
          <svg className="w-5 h-5 animate-spin\" fill="none" viewBox="0 0 24 24">
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
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}