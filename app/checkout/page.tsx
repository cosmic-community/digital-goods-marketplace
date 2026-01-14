'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  country: string;
  zipCode: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    country: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="py-20 px-4 min-h-[60vh]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
            <span className="text-5xl">⚠️</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            NO_ITEMS_<span className="text-neon-magenta">DETECTED</span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your cart is empty. Add some digital goods before initiating checkout protocol.
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

  if (isComplete) {
    return (
      <div className="py-20 px-4 min-h-[60vh]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-neon-green/10 border-2 border-neon-green flex items-center justify-center animate-pulse">
            <svg className="w-16 h-16 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <span className="inline-block px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-full text-neon-green font-display text-sm tracking-widest uppercase mb-6">
            Transaction Complete
          </span>
          
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            PAYMENT_<span className="text-neon-green neon-text">SUCCESSFUL</span>
          </h1>
          
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your digital assets have been secured. Check your email for download links and transaction confirmation.
          </p>
          
          <div className="cyber-card rounded-xl p-6 mb-8 text-left">
            <h3 className="font-display text-lg text-neon-cyan mb-4 tracking-wide">// Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Order ID:</span>
                <span className="font-display text-white">#CYB-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Status:</span>
                <span className="text-neon-green font-display">CONFIRMED</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery:</span>
                <span className="text-white font-display">INSTANT_DOWNLOAD</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 border border-neon-cyan/50 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white"
            >
              Return Home →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/cart" className="text-neon-cyan font-display text-sm tracking-widest uppercase hover:text-neon-magenta transition-colors">
            ← Back to Cart
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mt-4">
            SECURE_<span className="text-neon-magenta">CHECKOUT</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="cyber-card rounded-xl p-6">
                <h2 className="font-display text-lg text-neon-cyan mb-4 tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-neon-cyan/20 flex items-center justify-center text-xs">1</span>
                  CONTACT_INFO
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                      placeholder="user@cyberspace.net"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                        placeholder="Neo"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                        placeholder="Anderson"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="cyber-card rounded-xl p-6">
                <h2 className="font-display text-lg text-neon-magenta mb-4 tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-neon-magenta/20 flex items-center justify-center text-xs">2</span>
                  PAYMENT_DATA
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="cyber-card rounded-xl p-6">
                <h2 className="font-display text-lg text-neon-pink mb-4 tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-neon-pink/20 flex items-center justify-center text-xs">3</span>
                  BILLING_LOCATION
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                    >
                      <option value="">Select Region</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-display mb-2 tracking-wide">ZIP / Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full cyber-input rounded-lg px-4 py-3 font-display"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full cyber-btn px-8 py-4 rounded-lg font-display font-bold text-lg tracking-wider uppercase transition-all ${
                  isProcessing 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'text-neon-cyan hover:text-white'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Transaction...
                  </span>
                ) : (
                  <span>Complete Purchase → ${totalPrice.toFixed(2)}</span>
                )}
              </button>

              {/* Security Notice */}
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-display tracking-wide">256-BIT_ENCRYPTED_TRANSMISSION</span>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="cyber-card rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-lg text-neon-cyan mb-4 tracking-wide">// ORDER_SUMMARY</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-neon-cyan/10">
                    <div className="w-16 h-16 bg-cyber-darker rounded-lg overflow-hidden flex-shrink-0 border border-neon-cyan/20">
                      {item.image ? (
                        <img
                          src={`${item.image}?w=128&h=128&fit=crop&auto=format,compress`}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-80"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neon-cyan/30">
                          📦
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-display text-white text-sm tracking-wide line-clamp-1">{item.name}</h3>
                      <p className="text-gray-500 text-xs font-display">QTY: {item.quantity}</p>
                      <p className="text-neon-magenta font-display font-bold mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400 text-sm font-display">
                  <span>Subtotal</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm font-display">
                  <span>Processing Fee</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm font-display">
                  <span>Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neon-cyan/20">
                <div className="flex justify-between items-center">
                  <span className="font-display text-gray-400">TOTAL</span>
                  <span className="text-2xl font-display font-bold text-neon-cyan">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-neon-cyan text-lg">📧</span>
                  <div>
                    <p className="text-white font-display text-sm">Instant Delivery</p>
                    <p className="text-gray-500 text-xs">Download links sent via email immediately after purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}