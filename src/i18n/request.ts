import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './config';
import { injectContentDeep } from '@/lib/content';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request
  const locale = await requestLocale;
  
  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  // Load messages and inject dynamic content placeholders
  const rawMessages = (await import(`./locales/${locale}.json`)).default;
  const messages = injectContentDeep(rawMessages);

  return {
    locale,
    messages,
  };
});