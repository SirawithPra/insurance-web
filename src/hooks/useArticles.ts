import { useState, useEffect } from 'react';
import { articleService, type ArticleListParams } from '../services/articleService';
import type { Article } from '../types/insurance';

// =====================
// Articles List Hook
// =====================

export function useArticles(params: ArticleListParams = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await articleService.getArticles(params);
        setArticles(result.articles);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [params.page, params.limit, params.category, params.search]);

  return { articles, loading, error, total, totalPages };
}

// =====================
// Single Article Hook
// =====================

export function useArticle(id: number) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await articleService.getArticleById(id);
        setArticle(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
}

// =====================
// Related Articles Hook
// =====================

export function useRelatedArticles(articleId: number, limit = 3) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const result = await articleService.getRelatedArticles(articleId, limit);
        setArticles(result);
      } catch (err) {
        console.error('Failed to fetch related articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [articleId, limit]);

  return { articles, loading };
}

// =====================
// Popular Articles Hook
// =====================

export function usePopularArticles(limit = 5) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const result = await articleService.getPopularArticles(limit);
        setArticles(result);
      } catch (err) {
        console.error('Failed to fetch popular articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [limit]);

  return { articles, loading };
}
