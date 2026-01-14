import { getPageBySlug } from '@/lib/cosmic';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'About | Digital Goods Marketplace',
  description: 'Learn more about Digital Goods Marketplace and our mission',
};

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  if (!page) {
    notFound();
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {page.metadata.featured_image && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={`${page.metadata.featured_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
                alt={page.metadata.headline}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.metadata.headline}
          </h1>
          {page.metadata.subheadline && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {page.metadata.subheadline}
            </p>
          )}
        </div>

        {/* Content Section */}
        {page.metadata.content && (
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(page.metadata.content) }} />
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Explore our collection of premium digital products and find the perfect resources for your next project.
          </p>
          <a
            href="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </a>
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