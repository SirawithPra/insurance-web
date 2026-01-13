// =====================
// API Request Types
// =====================

export interface CreateCommentRequest {
  articleId: number;
  author: string;
  content: string;
  rating?: number;
}

export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  summary?: string;
  category?: string;
  image?: string;
  tags?: string[];
}

export interface CalculationRequest {
  age: number;
  sumAssured: number;
  taxRate: number;
  investYield: number;
}

// =====================
// API Response Types
// =====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// =====================
// Error Types
// =====================

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export class NetworkError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}
