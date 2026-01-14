import { getPageBySlug } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'About | CYBER_MARKET',
  description: 'Learn more about CYBER_MARKET and our mission',
};

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  // If CMS page exists, render dynamic content
  if (page) {
    return (
      <div className="py-12 px-4 min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            {page.metadata.featured_image && (
              <div className="mb-8 rounded-xl overflow-hidden cyber-card">
                <img
                  src={`${page.metadata.featured_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
                  alt={page.metadata.headline}
                  className="w-full h-64 md:h-80 object-cover opacity-80"
                />
              </div>
            )}
            <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// About Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
              {page.metadata.headline}
            </h1>
            {page.metadata.subheadline && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {page.metadata.subheadline}
              </p>
            )}
          </div>

          {/* Content Section */}
          {page.metadata.content && (
            <div className="cyber-card rounded-xl p-8 mb-8">
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-neon-cyan prose-headings:font-display prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white">
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(page.metadata.content) }} />
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center cyber-card rounded-xl p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Explore our collection of premium digital products and find the perfect resources for your next project.
            </p>
            <Link
              href="/products"
              className="inline-block cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white transition-colors"
            >
              Browse Products →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to static content if no CMS page
  return (
    <div className="py-12 px-4 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-neon-magenta font-display text-sm tracking-widest uppercase">// About Us</span>
          <h1 className="font-display text-5xl font-bold text-white mt-4 mb-6">
            CYBER_<span className="text-neon-cyan neon-text">MANIFESTO</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are digital architects, crafting premium tools and templates for the creators of tomorrow.
          </p>
        </div>

        {/* Mission Section */}
        <div className="cyber-card rounded-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-neon-cyan to-transparent"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-neon-cyan to-transparent"></div>
          </div>
          
          <h2 className="font-display text-2xl text-neon-cyan mb-4 tracking-wide">// OUR_MISSION</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            In the neon-lit corridors of the digital frontier, we believe every creator deserves access to premium tools. 
            Our mission is to democratize high-quality digital assets, making professional-grade templates, tools, 
            and resources available to all who dare to build the future.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Each product in our catalog is meticulously crafted, battle-tested in the real world, 
            and optimized for the workflows of modern creators. We don't just sell files — we provide 
            the building blocks for digital excellence.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="cyber-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="font-display text-lg text-neon-cyan mb-2 tracking-wide">QUALITY</h3>
            <p className="text-gray-400 text-sm">
              Every asset is crafted to the highest standards. No compromises, no shortcuts.
            </p>
          </div>
          
          <div className="cyber-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="font-display text-lg text-neon-magenta mb-2 tracking-wide">SECURITY</h3>
            <p className="text-gray-400 text-sm">
              Your transactions are encrypted. Your data is sacred. Trust is our protocol.
            </p>
          </div>
          
          <div className="cyber-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="font-display text-lg text-neon-pink mb-2 tracking-wide">INNOVATION</h3>
            <p className="text-gray-400 text-sm">
              We push boundaries. Our products evolve with the cutting edge of technology.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="cyber-card rounded-xl p-8 mb-12">
          <h2 className="font-display text-xl text-neon-magenta mb-6 tracking-wide text-center">// SYSTEM_STATS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-neon-cyan">10K+</div>
              <div className="text-gray-500 text-sm font-display tracking-wide">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-neon-magenta">500+</div>
              <div className="text-gray-500 text-sm font-display tracking-wide">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-neon-pink">99%</div>
              <div className="text-gray-500 text-sm font-display tracking-wide">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-neon-green">24/7</div>
              <div className="text-gray-500 text-sm font-display tracking-wide">Support</div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="inline-block px-4 py-2 border border-neon-cyan/30 rounded-full mb-4">
            <span className="text-neon-cyan font-display text-sm tracking-widest">TRANSMISSION_OPEN</span>
          </div>
          <h2 className="font-display text-2xl text-white mb-4">Questions? Let&apos;s Connect.</h2>
          <p className="text-gray-400 mb-6">
            Our neural network is always online. Reach out through any channel.
          </p>
          <Link
            href="/contact"
            className="inline-block cyber-btn px-8 py-4 rounded-lg font-display font-semibold tracking-wider uppercase text-neon-cyan hover:text-white transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Simple markdown parser for basic formatting
function parseMarkdown(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Wrap consecutive li elements in ul
    .replace(/(<li>.*<\/li>\n?)+/gim, '<ul>$&</ul>')
    // Paragraphs (lines that don't start with HTML tags)
    .replace(/^(?!<[hul])(.*$)/gim, (match) => {
      if (match.trim() === '') return '';
      if (match.startsWith('<')) return match;
      return `<p>${match}</p>`;
    })
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    // Add line breaks
    .replace(/\n/g, '');
}