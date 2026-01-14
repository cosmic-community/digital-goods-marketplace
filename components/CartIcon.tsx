'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative p-2 text-gray-400 hover:text-neon-cyan transition-colors group"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <svg 
        className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-neon-magenta text-white text-xs font-display font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-neon-magenta animate-pulse">
          {totalItems}
        </span>
      )}
    </Link>
  );
}