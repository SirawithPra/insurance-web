import { api } from './api';
import type { Article } from '../types/insurance';
import { ARTICLES } from '../constants/insurance';

// =====================
// Article Service
// =====================

export interface ArticleListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
}

export const articleService = {
  // Get all articles with pagination and filters
  getArticles: async (params: ArticleListParams = {}): Promise<PaginatedArticles> => {
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await api.get<PaginatedArticles>('/articles', { params });
      
      // Mock implementation for now
      const { page = 1, limit = 10, category, search } = params;
      
      let filtered = [...ARTICLES];
      
      // Filter by category
      if (category) {
        filtered = filtered.filter(article => 
          article.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(searchLower) ||
          article.summary.toLowerCase().includes(searchLower)
        );
      }
      
      // Pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedArticles = filtered.slice(start, end);
      
      return {
        articles: paginatedArticles,
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit)
      };
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Get single article by ID
  getArticleById: async (id: number): Promise<Article | null> => {
    try {
      // TODO: Replace with real API call
      // const response = await api.get<Article>(`/articles/${id}`);
      // return response.data || null;
      
      // Mock implementation
      const article = ARTICLES.find(a => a.id === id);
      return article || null;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

  // Get related articles
  getRelatedArticles: async (articleId: number, limit = 3): Promise<Article[]> => {
    try {
      // TODO: Replace with real API call
      // const response = await api.get<Article[]>(`/articles/${articleId}/related`);
      
      // Mock implementation - get articles from same category
      const currentArticle = ARTICLES.find(a => a.id === articleId);
      if (!currentArticle) return [];
      
      return ARTICLES
        .filter(a => a.id !== articleId && a.category === currentArticle.category)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }
  },

  // Get popular articles
  getPopularArticles: async (limit = 5): Promise<Article[]> => {
    try {
      // TODO: Replace with real API call
      // const response = await api.get<Article[]>('/articles/popular', { params: { limit } });
      
      // Mock implementation - return first N articles
      return ARTICLES.slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular articles:', error);
      return [];
    }
  }
};
