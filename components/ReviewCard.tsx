import Link from 'next/link';
import { Review } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const rating = parseInt(review.metadata.rating.key);

  return (
    <article className="bg-white rounded-xl p-6 shadow-md">
      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={rating} />
        <span className="text-sm text-gray-500">{review.metadata.rating.value}</span>
      </div>

      {/* Comment */}
      {review.metadata.comment && (
        <p className="text-gray-700 mb-4 line-clamp-3">
          "{review.metadata.comment}"
        </p>
      )}

      {/* Customer Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{review.metadata.customer_name}</p>
          {review.metadata.verified_purchase && (
            <span className="inline-flex items-center text-xs text-green-600 mt-1">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified Purchase
            </span>
          )}
        </div>
      </div>

      {/* Product Link */}
      {showProduct && review.metadata.product && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/products/${review.metadata.product.slug}`}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {review.metadata.product.metadata.name} →
          </Link>
        </div>
      )}
    </article>
  );
}