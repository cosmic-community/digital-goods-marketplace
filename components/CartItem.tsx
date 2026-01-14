'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
      {/* Product Image */}
      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
        {item.image ? (
          <img
            src={`${item.image}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={item.name}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-lg"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex-grow min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1"
        >
          {item.name}
        </Link>
        <p className="text-sm text-gray-500 mt-1">Digital Download</p>
        <p className="text-lg font-bold text-primary-600 mt-1">${item.price}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove from cart"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}