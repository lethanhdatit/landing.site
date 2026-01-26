import { setRequestLocale as setLocale } from 'next-intl/server';

export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export const localeFlags: Record<Locale, string> = {
  en: '',
  vi: '',
};

// Used for SEO
export const localeAlternates: Record<Locale, string> = {
  en: 'en-US',
  vi: 'vi-VN',
};

// Wrapper function for setRequestLocale
export function setRequestLocale(locale: Locale) {
  setLocale(locale);
}

// Generate static params for locale routes
export function generateStaticParamsForLocale() {
  return locales.map((locale) => ({ locale }));
}
