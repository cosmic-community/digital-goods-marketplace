import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="font-bold text-xl">Digital Goods</span>
            </Link>
            <p className="text-gray-400">
              Premium digital products for creators and developers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Changed: Added contact link */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-400 mb-4">
              Have questions? Reach out to us anytime.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-center text-sm">
            © {currentYear} Digital Goods Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}