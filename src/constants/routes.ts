// =====================
// Route Definitions
// =====================

export const ROUTES = {
  HOME: '/',
  OVERVIEW: '/overview',
  LIFE: '/life',
  SAVINGS: '/savings',
  HEALTH: '/health',
  ACCIDENT: '/accident',
  ARTICLES: '/articles',
  ARTICLE_DETAIL: '/articles/:id',
  NEEDS_ANALYSIS: '/needs-analysis',
  CONTACT: '/contact'
} as const;

export type RouteKey = keyof typeof ROUTES;

// Helper function to generate article detail route
export const getArticleRoute = (id: number | string) => `/articles/${id}`;