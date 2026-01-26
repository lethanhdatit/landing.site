import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getActiveProducts } from '@/lib/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insight.ai.vn';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getActiveProducts();
  const legalPages = ['privacy-policy', 'terms-of-service', 'permissions', 'subscription-terms', 'disclaimer'];
  
  const routes: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  const staticPages = ['', '/about', '/contact'];
  
  for (const locale of locales) {
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  // Add product pages for each locale
  for (const locale of locales) {
    for (const product of products) {
      // Product main page
      routes.push({
        url: `${baseUrl}/${locale}/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });

      // Product legal pages
      for (const legalPage of legalPages) {
        if (product.legalPages.includes(legalPage as any)) {
          routes.push({
            url: `${baseUrl}/${locale}/${product.id}/${legalPage}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
          });
        }
      }
    }
  }

  return routes;
}
