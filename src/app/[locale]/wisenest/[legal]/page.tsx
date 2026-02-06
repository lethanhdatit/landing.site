/**
 * WiseNest Legal Pages
 * 
 * Crystal Black base + Emerald accent, consistent with the platform theme
 * while keeping WiseNest's signature emerald identity.
 */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText, Key, CreditCard, AlertTriangle } from 'lucide-react';
import { getProduct, type LegalPageSlug } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation';

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
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Emerald haze at top */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="wn-orb-emerald-lg -left-40 top-1/4 h-96 w-96 opacity-20" />
          <div className="wn-orb-emerald-md -right-20 top-1/3 h-72 w-72 opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <Link 
              href={`/${locale}/wisenest`} 
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t('backToHome')} / {product.name}
            </Link>
            
            <div className="flex items-start gap-4">
              <div className="wn-icon-container shrink-0">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl wn-heading-glow">
                  {t(`legal.${legal}`)}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/40">
                  <span className="wn-text-accent">{product.name}</span>
                  <span className="hidden sm:inline text-white/20">•</span>
                  <span>{t('lastUpdated')}: {lastUpdated}</span>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 bg-black" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-10">
              {sections.map((section, index) => (
                <ScrollAnimationWrapper key={index} animation="slide-up" delay={Math.min(index * 50, 300)}>
                  <div className="wn-card p-6 md:p-8">
                    <h2 className="font-display text-xl font-semibold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="text-white/60 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                    {section.items && section.items.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex gap-3 text-white/60">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/50" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="relative py-8">
        <div className="absolute inset-0 bg-black" />
        <div className="wn-divider" />

        <div className="container-custom relative z-10 pt-8">
          <div className="flex items-center justify-between">
            <Link 
              href={`/${locale}/wisenest`} 
              className="group inline-flex items-center gap-2 text-sm font-medium wn-text-accent transition-colors hover:text-emerald-300"
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
                    className="text-sm text-white/40 hover:text-white transition-colors"
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
