// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at?: string;
  modified_at?: string;
}

// File metafield type
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Collection type
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description?: string;
    cover_image?: CosmicFile;
  };
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description?: string;
    price: number;
    featured_image?: CosmicFile;
    file_download?: CosmicFile;
    collection?: Collection;
  };
}

// Rating type for select-dropdown - Changed: Can be either object or string depending on API response
export type RatingOption = {
  key: string;
  value: string;
} | string;

// Changed: Helper function to extract numeric rating from RatingOption
export function getRatingValue(rating: RatingOption): number {
  if (typeof rating === 'string') {
    return parseInt(rating, 10) || 0;
  }
  return parseInt(rating.key, 10) || 0;
}

// Review type - Changed: Updated metadata to match actual Cosmic content model fields
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product?: Product;
    customer_name: string;
    rating: RatingOption;
    comment?: string;
    verified_purchase: boolean;
    // Changed: Added optional fields that the component uses
    reviewer_name?: string;
    reviewer_image?: CosmicFile;
    content?: string;
  };
}

// Page type - Added Page interface for CMS-powered pages (from agent branch)
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    headline: string;
    subheadline?: string;
    content?: string;
    featured_image?: CosmicFile;
  };
}

// Cart item type (from base branch)
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

// Changed: Added ContactSubmission type for contact form submissions (from agent branch)
export interface ContactSubmission extends CosmicObject {
  type: 'contact-submissions';
  metadata: {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
  };
}

// Changed: Added Author type for blog authors
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    avatar?: CosmicFile;
    social_twitter?: string;
    social_github?: string;
  };
}

// Changed: Added BlogCategory type for blog categories
export interface BlogCategory extends CosmicObject {
  type: 'blog-categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Changed: Added BlogPost type for blog posts
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    title: string;
    excerpt?: string;
    content?: string;
    featured_image?: CosmicFile;
    author?: Author;
    category?: BlogCategory;
    published_date?: string;
    reading_time?: number;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
}

// Type guard for checking if error has status
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}