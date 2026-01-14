import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-darker border-t border-neon-cyan/20 py-12 relative">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <span className="text-2xl">⚡</span>
              <span className="font-display font-bold text-xl">
                <span className="text-neon-cyan">CYBER</span>
                <span className="text-white">_</span>
                <span className="text-neon-magenta">MKT</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm">
              Premium digital assets from the neon underground. Crafted for the creators of tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-neon-cyan tracking-wider">
              // NAVIGATION
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-500 hover:text-neon-cyan transition-colors text-sm flex items-center gap-2">
                  <span className="text-neon-cyan/50">&gt;</span> All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-500 hover:text-neon-cyan transition-colors text-sm flex items-center gap-2">
                  <span className="text-neon-cyan/50">&gt;</span> Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-neon-cyan transition-colors text-sm flex items-center gap-2">
                  <span className="text-neon-cyan/50">&gt;</span> About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-neon-cyan transition-colors text-sm flex items-center gap-2">
                  <span className="text-neon-cyan/50">&gt;</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-neon-magenta tracking-wider">
              // CONNECT
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Have questions? Send a transmission through the network.
            </p>
            <Link
              href="/contact"
              className="inline-block cyber-btn px-4 py-2 rounded-lg font-display font-medium text-sm text-neon-cyan hover:text-white transition-colors mb-4"
            >
              Contact Us
            </Link>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-lg border border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/10 cursor-pointer transition-colors">
                𝕏
              </span>
              <span className="w-8 h-8 rounded-lg border border-neon-magenta/30 flex items-center justify-center text-neon-magenta hover:bg-neon-magenta/10 cursor-pointer transition-colors">
                ◈
              </span>
              <span className="w-8 h-8 rounded-lg border border-neon-pink/30 flex items-center justify-center text-neon-pink hover:bg-neon-pink/10 cursor-pointer transition-colors">
                ▶
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neon-cyan/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-center text-xs font-display tracking-wider">
              © {currentYear} CYBER_MARKET // ALL_RIGHTS_RESERVED
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              <span className="font-display tracking-wider">SYSTEM_STATUS: ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}