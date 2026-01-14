import { Review, getRatingValue } from '@/types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Changed: Extract rating as number using helper function
  const ratingValue = getRatingValue(review.metadata.rating);
  
  // Changed: Use customer_name as fallback for reviewer_name, comment as fallback for content
  const reviewerName = review.metadata.reviewer_name || review.metadata.customer_name;
  const reviewContent = review.metadata.content || review.metadata.comment || '';
  
  return (
    <article className="cyber-card rounded-xl p-6 relative overflow-hidden group">
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-neon-magenta to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-neon-magenta to-transparent"></div>
      </div>
      
      {/* Quote mark */}
      <div className="absolute top-4 right-4 text-4xl text-neon-cyan/20 font-display">"</div>
      
      {/* Rating - Changed: Use extracted numeric rating */}
      <div className="mb-4 relative z-10">
        <StarRating rating={ratingValue} />
      </div>
      
      {/* Review Content - Changed: Use reviewContent variable */}
      <p className="text-gray-300 mb-6 line-clamp-4 leading-relaxed relative z-10">
        {reviewContent}
      </p>
      
      {/* Reviewer Info - Changed: Use optional chaining and fallbacks */}
      <div className="flex items-center gap-3 relative z-10">
        {review.metadata.reviewer_image ? (
          <div className="relative">
            <img
              src={`${review.metadata.reviewer_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={reviewerName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg object-cover border border-neon-cyan/30"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-neon-green border-2 border-cyber-dark"></div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center text-neon-cyan font-display font-bold border border-neon-cyan/30">
            {/* Changed: Use reviewerName variable with safe charAt */}
            {reviewerName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-display font-semibold text-white text-sm tracking-wide">
            {/* Changed: Use reviewerName variable */}
            {reviewerName}
          </p>
          <p className="text-xs text-neon-cyan/70 font-display tracking-wider">VERIFIED_USER</p>
        </div>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"></div>
    </article>
  );
}