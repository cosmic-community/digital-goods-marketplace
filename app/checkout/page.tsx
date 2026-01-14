'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Redirect to cart if empty
  if (items.length === 0 && !orderComplete) {
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
            Your cart is empty. Add some products before proceeding to checkout.
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

  // Order complete state
  if (orderComplete) {
    return (
      <div className="py-20 px-4 min-h-[60vh]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
            <span className="text-5xl">✓</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            ORDER_<span className="text-neon-green">COMPLETE</span>
          </h1>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Transaction verified. Your digital assets have been unlocked.
          </p>
          <p className="text-neon-cyan font-display mb-8">
            A confirmation has been transmitted to your email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white"
            >
              Continue Shopping →
            </Link>
            <Link
              href="/"
              className="inline-block px-8 py-4 border border-gray-600 rounded-lg font-display font-medium text-gray-400 hover:text-white hover:border-neon-cyan/50 transition-colors tracking-wider uppercase"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Use MM/YY format';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    // Limit CVV length
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setOrderComplete(true);
    setIsProcessing(false);
  };

  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors font-display text-sm mb-4"
          >
            ← Back to Cart
          </Link>
          <span className="block text-neon-cyan font-display text-sm tracking-widest uppercase">
            // Secure Payment
          </span>
          <h1 className="font-display text-3xl font-bold text-white mt-2">
            CHECKOUT_<span className="text-neon-magenta">TERMINAL</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="cyber-card rounded-xl p-6">
                <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-neon-cyan">01.</span> Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-display text-gray-400 mb-2"
                    >
                      EMAIL_ADDRESS
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-cyber-darker border ${
                        errors.email ? 'border-neon-pink' : 'border-neon-cyan/30'
                      } rounded-lg px-4 py-3 text-white font-display focus:outline-none focus:border-neon-cyan transition-colors`}
                      placeholder="user@cyber.net"
                    />
                    {errors.email && (
                      <p className="text-neon-pink text-sm mt-1 font-display">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="cyber-card rounded-xl p-6">
                <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-neon-cyan">02.</span> Billing Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-display text-gray-400 mb-2"
                    >
                      FIRST_NAME
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full bg-cyber-darker border ${
                        errors.firstName ? 'border-neon-pink' : 'border-neon-cyan/30'
                      } rounded-lg px-4 py-3 text-white font-display focus:outline-none focus:border-neon-cyan transition-colors`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-neon-pink text-sm mt-1 font-display">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-display text-gray-400 mb-2"
                    >
                      LAST_NAME
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full bg-cyber-darker border ${
                        errors.lastName ? 'border-neon-pink' : 'border-neon-cyan/30'
                      } rounded-lg px-4 py-3 text-white font-display focus:outline-none focus:border-neon-cyan transition-colors`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-neon-pink text-sm mt-1 font-display">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="cyber-card rounded-xl p-6">
                <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-neon-cyan">03.</span> Payment Method
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-display text-gray-400 mb-2"
                    >
                      CARD_NUMBER
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full bg-cyber-darker border ${
                        errors.cardNumber ? 'border-neon-pink' : 'border-neon-cyan/30'
                      } rounded-lg px-4 py-3 text-white font-display focus:outline-none focus:border-neon-cyan transition-colors tracking-wider`}
                      placeholder="4242 4242 4242 4242"
                    />
                    {errors.cardNumber && (
                      <p className="text-neon-pink text-sm mt-1 font-display">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-display text-gray-400 mb-2"
                      >
                        EXPIRY_DATE
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full bg-cyber-darker border ${
                          errors.expiryDate ? 'border-neon-pink' : 'border-neon-cyan/30'
                        } rounded-lg px-4 py-3 text-white font-display focus:outline-none focus:border-neon-cyan transition-colors`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && (
                        <p className="text-neon-pink text-sm mt-1 font-display">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-display text-gray-400 mb-2"
                      >
                        CVV_CODE
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={`w-full bg-cyber-darker border ${
                          errors.cvv ? 'border-neon-pink' : 'border-neon-cyan/30'
                        } rounded-lg px-4 py-3 text-white font-display focus:outline-none focus:border-neon-cyan transition-colors`}
                        placeholder="123"
                      />
                      {errors.cvv && (
                        <p className="text-neon-pink text-sm mt-1 font-display">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security notice */}
                <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">
                  <svg
                    className="w-4 h-4 text-neon-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="font-display tracking-wide">
                    256-BIT_ENCRYPTION_ACTIVE
                  </span>
                </div>
              </div>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white ${
                    isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                      Processing...
                    </span>
                  ) : (
                    `Complete Order • $${totalPrice.toFixed(2)}`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="cyber-card rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-lg font-bold text-white mb-4">
                ORDER_<span className="text-neon-cyan">SUMMARY</span>
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-cyber-darker rounded-lg overflow-hidden flex-shrink-0 border border-neon-cyan/20">
                      {item.image ? (
                        <img
                          src={`${item.image}?w=112&h=112&fit=crop&auto=format,compress`}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-80"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg text-neon-cyan/30">
                          📦
                        </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-display text-sm text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-gray-500 text-xs font-display">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-neon-cyan text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent mb-6"></div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400 font-display text-sm">
                  <span>SUBTOTAL</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-display text-sm">
                  <span>TAX</span>
                  <span>$0.00</span>
                </div>
                <div className="h-px bg-neon-cyan/20"></div>
                <div className="flex justify-between font-display font-bold">
                  <span className="text-white">TOTAL</span>
                  <span className="text-2xl text-neon-cyan">
                    <span className="text-gray-500 text-lg">$</span>
                    {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <button
                type="submit"
                form="checkout-form"
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`hidden lg:block w-full cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                    Processing...
                  </span>
                ) : (
                  'Complete Order →'
                )}
              </button>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-neon-cyan/10">
                <div className="flex items-center justify-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1 text-xs font-display">
                    <svg className="w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    SECURE
                  </div>
                  <div className="flex items-center gap-1 text-xs font-display">
                    <svg className="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    INSTANT
                  </div>
                  <div className="flex items-center gap-1 text-xs font-display">
                    <svg className="w-4 h-4 text-neon-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    REFUNDABLE
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