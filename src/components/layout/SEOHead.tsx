import { Helmet } from 'react-helmet-async';
import type { SEOData } from '../../utils/seo';
import { generatePageTitle, generateMetaDescription, generateCanonicalUrl, generateOgImage } from '../../utils/seo';

interface SEOHeadProps extends SEOData {
  path?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  noindex = false,
  schema,
  path = '/'
}: SEOHeadProps) {
  const fullTitle = generatePageTitle(title);
  const metaDescription = generateMetaDescription(description);
  const canonical = canonicalUrl || generateCanonicalUrl(path);
  const ogImageUrl = generateOgImage(ogImage);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="SmartWealth" />
      <meta property="og:locale" content="th_TH" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
