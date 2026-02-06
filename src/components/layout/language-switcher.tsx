'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n/config';

const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations('common');
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
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        aria-label={t('switchLanguage')}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
      </button>

      <div className="invisible absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-white/10 bg-black/90 py-2 shadow-xl backdrop-blur-xl opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
              l === locale
                ? 'font-medium text-white'
                : 'text-white/60'
            }`}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
