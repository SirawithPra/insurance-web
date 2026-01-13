// =====================
// UI State Types
// =====================

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// =====================
// FAQ Types
// =====================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'life' | 'savings' | 'health' | 'accident' | 'general';
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FAQCategory {
  id: string;
  name: string;
  description?: string;
  faqs: FAQ[];
}

// =====================
// Testimonial Types
// =====================

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number; // 1-5
  comment: string;
  insuranceType: 'life' | 'savings' | 'health' | 'accident' | 'general';
  location?: string;
  purchaseDate?: Date;
  verified?: boolean;
  createdAt?: Date;
}

export interface TestimonialStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}