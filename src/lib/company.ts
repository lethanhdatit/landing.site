/**
 * Company Information - Centralized Configuration
 * 
 * All company contact details, addresses, and legal information
 * are defined here for consistency across the entire site.
 * 
 * Usage:
 *   import { company, emails, socials } from '@/lib/company';
 */

// ============================================
// COMPANY DETAILS
// ============================================

export const company = {
  /** Legal company name */
  name: 'Insight AI VN',
  
  /** Short name for branding */
  shortName: 'Insight AI',
  
  /** Company slogan */
  tagline: 'Smart Apps for Modern Living',
  
  /** Main website domain */
  domain: 'insight.ai.vn',
  
  /** Full website URL */
  website: 'https://insight.ai.vn',
  
  /** Year company was founded */
  foundedYear: 2026,
} as const;

// ============================================
// EMAIL ADDRESSES
// ============================================

export const emails = {
  /** General inquiries */
  general: 'contact@insight.ai.vn',
  
  /** Customer support */
  support: 'support@insight.ai.vn',
  
  /** Privacy & data protection */
  privacy: 'privacy@insight.ai.vn',
  
  /** Legal matters */
  legal: 'privacy@insight.ai.vn',
  
  /** Billing & payments */
  billing: 'support@insight.ai.vn',
  
  /** Press & media */
  press: 'contact@insight.ai.vn',
  
  /** Careers & recruitment */
  careers: 'contact@insight.ai.vn',
} as const;

// ============================================
// ADDRESS & LOCATION
// ============================================

export const address = {
  /** City */
  city: 'Ho Chi Minh City',
  cityVi: 'TP. Hồ Chí Minh',
  
  /** Country */
  country: 'Vietnam',
  countryVi: 'Việt Nam',
  
  /** Full address for legal documents (English) */
  full: 'Ho Chi Minh City, Vietnam',
  fullVi: 'TP. Hồ Chí Minh, Việt Nam',
  
  /** Jurisdiction for legal disputes */
  jurisdiction: 'Ho Chi Minh City, Vietnam',
  jurisdictionVi: 'TP. Hồ Chí Minh, Việt Nam',
} as const;

// ============================================
// SOCIAL MEDIA
// ============================================

export const socials = {
  facebook: 'https://facebook.com/insightaivn',
  twitter: 'https://twitter.com/insightaivn',
  instagram: 'https://instagram.com/insightaivn',
  linkedin: 'https://linkedin.com/company/insightaivn',
  github: 'https://github.com/insightaivn',
  youtube: 'https://youtube.com/@insightaivn',
} as const;

// ============================================
// APP STORE LINKS
// ============================================

export const appStores = {
  wisenest: {
    ios: 'https://apps.apple.com/app/wisenest/id000000000',
    android: 'https://play.google.com/store/apps/details?id=vn.ai.insight.wisenest',
  },
} as const;

// ============================================
// LEGAL INFORMATION
// ============================================

export const legal = {
  /** Governing law country */
  governingLaw: 'Socialist Republic of Vietnam',
  governingLawVi: 'Cộng hòa Xã hội Chủ nghĩa Việt Nam',
  
  /** Data protection regulation */
  dataProtectionLaw: 'Personal Data Protection Decree (13/2023/ND-CP)',
  dataProtectionLawVi: 'Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân',
  
  /** Response time for privacy requests (days) */
  privacyResponseDays: 30,
  
  /** Response time for support (hours) */
  supportResponseHours: '24-48',
  
  /** Response time for general inquiries (business days) */
  generalResponseDays: 5,
  
  /** Data retention after account deletion (days) */
  dataRetentionDays: 30,
  
  /** Backup retention (days) */
  backupRetentionDays: 90,
  
  /** Minimum age to use the app */
  minimumAge: 13,
  
  /** Liability cap (USD) */
  liabilityCapUSD: 100,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get mailto link for an email
 */
export function getMailtoLink(email: keyof typeof emails): string {
  return `mailto:${emails[email]}`;
}

/**
 * Get copyright text with current year
 */
export function getCopyrightText(year?: number): string {
  const currentYear = year || new Date().getFullYear();
  return `© ${currentYear} ${company.name}. All rights reserved.`;
}

/**
 * Get copyright text in Vietnamese
 */
export function getCopyrightTextVi(year?: number): string {
  const currentYear = year || new Date().getFullYear();
  return `© ${currentYear} ${company.name}. Đã đăng ký bản quyền.`;
}

// ============================================
// TYPE EXPORTS
// ============================================

export type EmailType = keyof typeof emails;
export type SocialType = keyof typeof socials;
