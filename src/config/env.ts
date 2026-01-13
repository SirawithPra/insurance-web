// =====================
// Environment Configuration
// =====================

export const ENV = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  
  // Application
  APP_NAME: 'SmartWealth',
  APP_URL: import.meta.env.VITE_APP_URL || 'https://smartwealth.example.com',
  
  // Feature Flags
  ENABLE_COMMENTS: import.meta.env.VITE_ENABLE_COMMENTS === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // Environment
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  
  // SEO
  DEFAULT_OG_IMAGE: import.meta.env.VITE_DEFAULT_OG_IMAGE || '/og-image.jpg',
} as const;

// Type-safe environment variables
export type EnvConfig = typeof ENV;
