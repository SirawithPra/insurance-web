import { Article } from '../types/insurance';
import { shouldShowArticleOnPage, isCommonTag } from '../constants/articleTags';

// =====================
// Article Filter Utilities
// =====================

/**
 * Get related articles for a specific page based on tags
 * @param articles - All available articles
 * @param page - Page type (life, savings, health, accident)
 * @param limit - Maximum number of articles to return
 * @returns Filtered and limited articles
 */
export const getRelatedArticles = (
  articles: Article[],
  page: 'life' | 'savings' | 'health' | 'accident',
  limit: number = 3
): Article[] => {
  // Filter articles that should show on this page
  const filtered = articles.filter((article) => 
    shouldShowArticleOnPage(article.tags || [], page)
  );

  // Sort by relevance:
  // 1. Articles with specific tags first
  // 2. Articles with common tags second
  const sorted = filtered.sort((a, b) => {
    const aHasSpecific = (a.tags || []).some(tag => !isCommonTag(tag));
    const bHasSpecific = (b.tags || []).some(tag => !isCommonTag(tag));
    
    if (aHasSpecific && !bHasSpecific) return -1;
    if (!aHasSpecific && bHasSpecific) return 1;
    return 0;
  });

  // Return limited number
  return sorted.slice(0, limit);
};

/**
 * Get articles by specific tags
 * @param articles - All available articles
 * @param tags - Tags to filter by
 * @param limit - Maximum number of articles to return
 * @returns Filtered articles
 */
export const getArticlesByTags = (
  articles: Article[],
  tags: string[],
  limit?: number
): Article[] => {
  const filtered = articles.filter((article) =>
    (article.tags || []).some((tag) => tags.includes(tag))
  );

  return limit ? filtered.slice(0, limit) : filtered;
};

/**
 * Get articles by category
 * @param articles - All available articles
 * @param category - Category to filter by
 * @param limit - Maximum number of articles to return
 * @returns Filtered articles
 */
export const getArticlesByCategory = (
  articles: Article[],
  category: string,
  limit?: number
): Article[] => {
  const filtered = articles.filter((article) => article.category === category);
  return limit ? filtered.slice(0, limit) : filtered;
};

/**
 * Convert Article to RelatedArticle format
 */
export const convertToRelatedArticle = (article: Article) => {
  return {
    id: String(article.id),
    title: article.title,
    excerpt: article.summary || '',
    category: article.category,
    readTime: 5, // Default read time
    imageUrl: article.image,
    tags: article.tags || []
  };
};

/**
 * Get related articles in RelatedArticle format
 */
export const getRelatedArticlesFormatted = (
  articles: Article[],
  page: 'life' | 'savings' | 'health' | 'accident',
  limit: number = 3
) => {
  const related = getRelatedArticles(articles, page, limit);
  return related.map(convertToRelatedArticle);
};
