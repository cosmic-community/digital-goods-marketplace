import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-8xl font-bold mb-4">
          <span className="text-neon-cyan neon-text">4</span>
          <span className="text-neon-magenta neon-text">0</span>
          <span className="text-neon-pink neon-text">4</span>
        </div>
        
        <div className="inline-block px-4 py-2 border border-neon-pink/30 rounded-full mb-6">
          <span className="text-neon-pink font-display text-sm tracking-widest uppercase">Signal Lost</span>
        </div>
        
        <h1 className="font-display text-2xl text-white mb-4">
          PAGE_NOT_<span className="text-neon-cyan">FOUND</span>
        </h1>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The requested data node does not exist in our network. 
          It may have been moved, deleted, or never existed in this dimension.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white"
          >
            Return Home →
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 border border-neon-magenta/50 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-magenta hover:bg-neon-magenta/10 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}