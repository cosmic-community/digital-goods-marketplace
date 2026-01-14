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

// Rating type for select-dropdown
export interface RatingOption {
  key: string;
  value: string;
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product?: Product;
    customer_name: string;
    rating: RatingOption;
    comment?: string;
    verified_purchase: boolean;
  };
}

// Cart item type
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
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