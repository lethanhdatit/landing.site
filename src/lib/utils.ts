import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Supported locales map - centralized for consistency
 * Maps app language codes to BCP 47 locale tags
 */
const LOCALE_MAP: Record<string, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  // Add more as needed
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-CN',
  th: 'th-TH',
  id: 'id-ID',
  ms: 'ms-MY',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
};

/**
 * Get BCP 47 locale from language code
 * @param language Short language code (e.g., 'vi', 'en')
 * @returns Full BCP 47 locale (e.g., 'vi-VN', 'en-US')
 */
export function getLocale(language: string): string {
  return LOCALE_MAP[language] || LOCALE_MAP['en'] || 'en-US';
}

/**
 * Format date for display - uses dynamic locale mapping
 */
export function formatDate(date: Date | string, locale: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const resolvedLocale = getLocale(locale);
  
  return d.toLocaleDateString(resolvedLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get absolute URL for metadata
 */
export function getAbsoluteUrl(path: string = ''): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://insight.ai.vn';
  return `${baseUrl}${path}`;
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
