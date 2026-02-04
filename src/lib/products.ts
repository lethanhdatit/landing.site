/**
 * Product Configuration
 * Central registry for all Insight AI products
 */

export type LegalPageSlug =
  | 'privacy-policy'
  | 'terms-of-service'
  | 'permissions'
  | 'subscription-terms'
  | 'disclaimer';

export type ProductId = 'wisenest';

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  description?: string;
  icon: string;
  logo?: string; // Optional logo image path
  favicon?: string; // Optional favicon directory path (e.g., '/favicons/wisenest')
  color: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  legalPages: LegalPageSlug[];
  isActive: boolean;
}

// Product configurations
const products: Record<ProductId, Product> = {
  wisenest: {
    id: 'wisenest',
    name: 'WiseNest',
    tagline: 'Smart Food & Home Management',
    icon: '🏠',
    logo: '/images/logo-wise-nest.png',
    favicon: '/favicons/wisenest',
    color: '#22c55e',
    appStoreUrl: 'https://apps.apple.com/app/wisenest/id6758124371',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.wisenest.app',
    legalPages: [
      'privacy-policy',
      'terms-of-service',
      'permissions',
      'subscription-terms',
      'disclaimer',
    ],
    isActive: true,
  },
};

/**
 * Get product by ID
 */
export function getProduct(id: string): Product | undefined {
  return products[id as ProductId];
}

/**
 * Get all active products
 */
export function getActiveProducts(): Product[] {
  return Object.values(products).filter((p) => p.isActive);
}

/**
 * Get all product IDs for static generation
 */
export function getAllProductIds(): ProductId[] {
  return Object.keys(products) as ProductId[];
}

/**
 * Check if a product exists
 */
export function productExists(id: string): boolean {
  return id in products;
}

/**
 * Validate legal page slug
 */
export function isValidLegalPage(slug: string): slug is LegalPageSlug {
  const validSlugs: LegalPageSlug[] = [
    'privacy-policy',
    'terms-of-service',
    'permissions',
    'subscription-terms',
    'disclaimer',
  ];
  return validSlugs.includes(slug as LegalPageSlug);
}
