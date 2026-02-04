'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n/config';

const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Parse the pathname into segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Check if the first segment is a locale
    const firstSegment = segments[0];
    const isLocalePrefix = locales.includes(firstSegment as Locale);
    
    let newPath: string;
    if (isLocalePrefix) {
      // Replace the locale prefix
      segments[0] = newLocale;
      newPath = '/' + segments.join('/');
    } else {
      // No locale prefix, add the new locale
      newPath = '/' + newLocale + '/' + segments.join('/');
    }

    // Use replace instead of push to avoid back button returning to old locale
    router.replace(newPath);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
      </button>

      <div className="invisible absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-neutral-200 bg-white py-2 shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-800">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
              l === locale
                ? 'font-medium text-brand-600 dark:text-brand-500'
                : 'text-neutral-700 dark:text-neutral-300'
            }`}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
