'use client';

import { useState } from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Changed: Added Blog link to navigation
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/products', label: 'PRODUCTS' },
    { href: '/collections', label: 'COLLECTIONS' },
    { href: '/blog', label: 'BLOG' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <header className="bg-cyber-dark/90 backdrop-blur-md border-b border-neon-cyan/20 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">⚡</span>
            <span className="font-display font-bold text-xl">
              <span className="text-neon-cyan group-hover:neon-text transition-all">CYBER</span>
              <span className="text-white">_</span>
              <span className="text-neon-magenta group-hover:neon-text transition-all">MKT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-400 hover:text-neon-cyan font-display text-sm tracking-wider transition-colors group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/10 rounded transition-colors"></span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-px bg-neon-cyan transition-all"></span>
              </Link>
            ))}
          </nav>

          {/* Cart Icon and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <CartIcon />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-neon-cyan hover:text-neon-magenta transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-neon-cyan/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-gray-400 hover:text-neon-cyan font-display text-sm tracking-wider transition-colors border-b border-neon-cyan/10 last:border-0"
              >
                &gt; {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 text-gray-400 hover:text-neon-magenta font-display text-sm tracking-wider transition-colors"
            >
              &gt; CART
            </Link>
          </nav>
        )}
      </div>
      
      {/* Bottom glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
    </header>
  );
}