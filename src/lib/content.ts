/**
 * Content Management - Dynamic Content Injection
 * 
 * This module provides utilities to inject dynamic company data
 * into static content from locale files.
 * 
 * Placeholders use format: {{key}} or {{category.key}}
 */

import { company, emails, address, legal, socials, appStores } from './company';

// ============================================
// PLACEHOLDER VALUES MAP
// ============================================

/**
 * All available placeholder values
 * Use these keys in locale files as {{key}}
 */
export const placeholders = {
  // Company
  'company.name': company.name,
  'company.shortName': company.shortName,
  'company.tagline': company.tagline,
  'company.domain': company.domain,
  'company.website': company.website,
  'company.foundedYear': String(company.foundedYear),

  // Emails
  'email.general': emails.general,
  'email.support': emails.support,
  'email.privacy': emails.privacy,
  'email.legal': emails.legal,
  'email.billing': emails.billing,
  'email.press': emails.press,
  'email.careers': emails.careers,

  // Address - English
  'address.city': address.city,
  'address.country': address.country,
  'address.full': address.full,
  'address.jurisdiction': address.jurisdiction,

  // Address - Vietnamese
  'address.cityVi': address.cityVi,
  'address.countryVi': address.countryVi,
  'address.fullVi': address.fullVi,
  'address.jurisdictionVi': address.jurisdictionVi,

  // Legal - English
  'legal.governingLaw': legal.governingLaw,
  'legal.dataProtectionLaw': legal.dataProtectionLaw,

  // Legal - Vietnamese
  'legal.governingLawVi': legal.governingLawVi,
  'legal.dataProtectionLawVi': legal.dataProtectionLawVi,

  // Legal - Numbers
  'legal.privacyResponseDays': String(legal.privacyResponseDays),
  'legal.supportResponseHours': legal.supportResponseHours,
  'legal.generalResponseDays': String(legal.generalResponseDays),
  'legal.dataRetentionDays': String(legal.dataRetentionDays),
  'legal.backupRetentionDays': String(legal.backupRetentionDays),
  'legal.minimumAge': String(legal.minimumAge),
  'legal.liabilityCapUSD': String(legal.liabilityCapUSD),

  // Socials
  'social.facebook': socials.facebook,
  'social.twitter': socials.twitter,
  'social.instagram': socials.instagram,
  'social.linkedin': socials.linkedin,
  'social.github': socials.github,
  'social.youtube': socials.youtube,

  // App Stores
  'appStore.wisenest.ios': appStores.wisenest.ios,
  'appStore.wisenest.android': appStores.wisenest.android,
} as const;

export type PlaceholderKey = keyof typeof placeholders;

// ============================================
// CONTENT INJECTION
// ============================================

/**
 * Replace all placeholders in a string with actual values
 * 
 * @example
 * injectContent("Contact us at {{email.support}}")
 * // Returns: "Contact us at support@insight.ai.vn"
 */
export function injectContent(content: string): string {
  return content.replace(/\{\{([^}]+)\}\}/g, (match, key: string) => {
    const trimmedKey = key.trim() as PlaceholderKey;
    return placeholders[trimmedKey] ?? match;
  });
}

/**
 * Recursively inject placeholders into an object
 */
export function injectContentDeep<T>(obj: T): T {
  if (typeof obj === 'string') {
    return injectContent(obj) as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => injectContentDeep(item)) as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = injectContentDeep(value);
    }
    return result as T;
  }
  return obj;
}

// ============================================
// LOCALE-SPECIFIC HELPERS
// ============================================

/**
 * Get address based on locale
 */
export function getAddress(locale: 'en' | 'vi' = 'en') {
  return {
    city: locale === 'vi' ? address.cityVi : address.city,
    country: locale === 'vi' ? address.countryVi : address.country,
    full: locale === 'vi' ? address.fullVi : address.full,
    jurisdiction: locale === 'vi' ? address.jurisdictionVi : address.jurisdiction,
  };
}

/**
 * Get legal text based on locale
 */
export function getLegalText(locale: 'en' | 'vi' = 'en') {
  return {
    governingLaw: locale === 'vi' ? legal.governingLawVi : legal.governingLaw,
    dataProtectionLaw: locale === 'vi' ? legal.dataProtectionLawVi : legal.dataProtectionLaw,
  };
}

/**
 * Format contact info for display
 */
export function getContactInfo(locale: 'en' | 'vi' = 'en') {
  const addr = getAddress(locale);
  return {
    email: emails.support,
    emailHref: `mailto:${emails.support}`,
    location: addr.full,
    privacyEmail: emails.privacy,
    legalEmail: emails.legal,
    billingEmail: emails.billing,
  };
}

// ============================================
// RE-EXPORTS for convenience
// ============================================

export { company, emails, address, legal, socials, appStores } from './company';
