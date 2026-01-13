// =====================
// SEO Utilities
// =====================

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  schema?: Record<string, any>;
}

export function generatePageTitle(title: string, includeAppName = true): string {
  if (includeAppName) {
    return `${title} | SmartWealth`;
  }
  return title;
}

export function generateMetaDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3).trim() + '...';
}

export function generateCanonicalUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://smartwealth.com';
  return `${baseUrl}${path}`;
}

export function generateOgImage(imagePath?: string): string {
  if (imagePath) return imagePath;
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://smartwealth.com';
  return `${baseUrl}/og-default.jpg`;
}

// Helper to create structured data (JSON-LD)
export function createStructuredData(data: Record<string, any>): string {
  return JSON.stringify(data);
}

// Breadcrumb helper
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
