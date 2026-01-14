import { getProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Products | Digital Goods Marketplace',
  description: 'Browse our complete collection of premium digital products',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium digital products for your next project.
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}