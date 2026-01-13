import { ROUTES } from '../constants/routes';
import { ARTICLES } from '../constants/insurance';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(baseUrl: string = 'https://smartwealth.example.com'): string {
  const urls: SitemapUrl[] = [
    {
      loc: `${baseUrl}${ROUTES.OVERVIEW}`,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}${ROUTES.LIFE}`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}${ROUTES.SAVINGS}`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}${ROUTES.HEALTH}`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}${ROUTES.ACCIDENT}`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}${ROUTES.ARTICLES}`,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}${ROUTES.CONTACT}`,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];

  // Add article URLs
  ARTICLES.forEach(article => {
    urls.push({
      loc: `${baseUrl}/articles/${article.id}`,
      changefreq: 'weekly',
      priority: 0.6
    });
  });

  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export function downloadSitemap() {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
