'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 px-4 min-h-[60vh]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
            <span className="text-5xl">🛒</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            CART_<span className="text-neon-cyan">EMPTY</span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your digital cart is currently offline. Initialize a shopping sequence to fill it up.
          </p>
          <Link
            href="/products"
            className="inline-block cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white"
          >
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="text-neon-cyan font-display text-sm tracking-widest uppercase">// Your Selection</span>
          <h1 className="font-display text-3xl font-bold text-white mt-2">
            SHOPPING_<span className="text-neon-magenta">CART</span>
          </h1>
        </div>

        <div className="cyber-card rounded-xl overflow-hidden mb-8">
          <div className="divide-y divide-neon-cyan/10">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap-6 group hover:bg-neon-cyan/5 transition-colors">
                {/* Product Image */}
                <div className="w-20 h-20 bg-cyber-darker rounded-lg overflow-hidden flex-shrink-0 border border-neon-cyan/20">
                  {item.image ? (
                    <img
                      src={`${item.image}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-neon-cyan/30">
                      📦
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-display font-semibold text-white hover:text-neon-cyan transition-colors tracking-wide"
                  >
                    {item.name}
                  </Link>
                  <p className="text-neon-cyan font-display font-bold mt-1">
                    <span className="text-gray-500 text-sm">$</span>{item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-cyber-darker border border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all font-display"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-display font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-cyber-darker border border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all font-display"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right w-24">
                  <p className="font-display font-bold text-neon-magenta">
                    <span className="text-gray-500 text-sm">$</span>
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-neon-pink transition-colors p-2"
                  aria-label="Remove item"
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
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="cyber-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-neon-cyan/10">
            <span className="text-gray-400 font-display tracking-wide">SUBTOTAL</span>
            <span className="text-3xl font-display font-bold text-neon-cyan">
              <span className="text-gray-500 text-lg">$</span>
              {totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={clearCart}
              className="flex-1 px-6 py-3 border border-gray-600 rounded-lg font-display font-medium text-gray-400 hover:text-neon-pink hover:border-neon-pink/50 transition-colors tracking-wider uppercase"
            >
              Clear Cart
            </button>
            <Link
              href="/checkout"
              className="flex-1 cyber-btn px-6 py-3 rounded-lg font-display font-semibold text-neon-cyan hover:text-white transition-colors tracking-wider uppercase text-center"
            >
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}