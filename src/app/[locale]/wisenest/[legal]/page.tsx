/**
 * WiseNest Legal Pages
 * 
 * Uses the same legal page component as the generic [product] route,
 * but specifically for WiseNest with its theme applied.
 */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText, Key, CreditCard, AlertTriangle } from 'lucide-react';
import { getProduct, type LegalPageSlug } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';

const legalPages: LegalPageSlug[] = ['privacy-policy', 'terms-of-service', 'permissions', 'subscription-terms', 'disclaimer'];

export function generateStaticParams() {
  const product = getProduct('wisenest')!;
  const params: { locale: string; legal: string }[] = [];
  for (const locale of locales) {
    for (const legal of product.legalPages) {
      params.push({ locale, legal });
    }
  }
  return params;
}

interface Props {
  params: Promise<{ locale: Locale; legal: string }>;
}

const legalIcons: Record<LegalPageSlug, typeof Shield> = {
  'privacy-policy': Shield,
  'terms-of-service': FileText,
  'permissions': Key,
  'subscription-terms': CreditCard,
  'disclaimer': AlertTriangle,
};

export async function generateMetadata({ params }: Props) {
  const { locale, legal } = await params;
  const product = getProduct('wisenest')!;
  if (!legalPages.includes(legal as LegalPageSlug)) return {};
  const t = await getTranslations({ locale, namespace: 'common' });
  const legalT = await getTranslations({ locale, namespace: 'legal' });
  
  return {
    title: `${t(`legal.${legal}`)} - ${product.name}`,
    description: legalT(`${legal}.meta.description`),
    icons: product.favicon ? {
      icon: [
        { url: `${product.favicon}/favicon.ico`, sizes: 'any' },
        { url: `${product.favicon}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
        { url: `${product.favicon}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
        { url: `${product.favicon}/favicon-192x192.png`, sizes: '192x192', type: 'image/png' },
      ],
      apple: [
        { url: `${product.favicon}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
      ],
    } : undefined,
  };
}

export default async function WiseNestLegalPage({ params }: Props) {
  const { locale, legal } = await params;
  setRequestLocale(locale);
  
  const product = getProduct('wisenest')!;
  const isValidLegal = legalPages.includes(legal as LegalPageSlug);
  if (!isValidLegal || !product.legalPages.includes(legal as LegalPageSlug)) notFound();

  const t = await getTranslations('common');
  const legalT = await getTranslations('legal');
  const Icon = legalIcons[legal as LegalPageSlug] || FileText;
  const lastUpdated = legalT(`${legal}.date`);

  const sectionsObj = legalT.raw(`${legal}.sections`) as Record<string, { title: string; content: string; items?: string[] }>;
  const sections = sectionsObj ? Object.values(sectionsObj) : [];

  return (
    <div className="theme-wisenest flex flex-col">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-neutral-200 wn-bg-gradient-soft py-16 dark:border-neutral-800 md:py-24">
        <div className="container-custom">
          <Link 
            href={`/${locale}/wisenest`} 
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-500"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('backToHome')} / {product.name}
          </Link>
          
          <div className="flex items-start gap-4">
            <div className="wn-icon-container shrink-0">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                {t(`legal.${legal}`)}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <span>{product.name}</span>
                <span className="hidden sm:inline">•</span>
                <span>{t('lastUpdated')}: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="prose-legal">
              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2>{section.title}</h2>
                  <p className="whitespace-pre-line">{section.content}</p>
                  {section.items && section.items.length > 0 && (
                    <ul>
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Product */}
      <section className="border-t border-neutral-200 py-8 dark:border-neutral-800">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link 
              href={`/${locale}/wisenest`} 
              className="group inline-flex items-center gap-2 text-sm font-medium wn-text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t('backTo')} {product.name}
            </Link>
            
            <div className="flex gap-4">
              {product.legalPages
                .filter(page => page !== legal)
                .slice(0, 3)
                .map(page => (
                  <Link
                    key={page}
                    href={`/${locale}/wisenest/${page}`}
                    className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {t(`legal.${page}`)}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
