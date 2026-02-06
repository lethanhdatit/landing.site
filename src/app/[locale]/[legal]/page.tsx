/**
 * Platform-level Legal Pages (Privacy Policy & Terms of Service)
 * 
 * These are for the overall Insight AI VN Platform, separate from
 * product-specific legal pages (e.g., /wisenest/privacy-policy).
 * 
 * Routes:
 *   /vi/privacy-policy
 *   /vi/terms-of-service
 *   /en/privacy-policy
 *   /en/terms-of-service
 */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation';
import { FloatingOrbs } from '@/components/ui/floating-orbs';

type PlatformLegalSlug = 'privacy-policy' | 'terms-of-service';

const validSlugs: PlatformLegalSlug[] = ['privacy-policy', 'terms-of-service'];

const legalIcons: Record<PlatformLegalSlug, typeof Shield> = {
  'privacy-policy': Shield,
  'terms-of-service': FileText,
};

export function generateStaticParams() {
  const params: { locale: string; legal: string }[] = [];
  for (const locale of locales) {
    for (const legal of validSlugs) {
      params.push({ locale, legal });
    }
  }
  return params;
}

interface Props {
  params: Promise<{ locale: Locale; legal: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale, legal } = await params;
  if (!validSlugs.includes(legal as PlatformLegalSlug)) return {};
  
  const t = await getTranslations({ locale, namespace: 'platformLegal' });

  return {
    title: t(`${legal}.meta.title`),
    description: t(`${legal}.meta.description`),
  };
}

export default async function PlatformLegalPage({ params }: Props) {
  const { locale, legal } = await params;
  setRequestLocale(locale);

  if (!validSlugs.includes(legal as PlatformLegalSlug)) {
    notFound();
  }

  const slug = legal as PlatformLegalSlug;
  const t = await getTranslations('platformLegal');
  const commonT = await getTranslations('common');
  const Icon = legalIcons[slug];
  const lastUpdated = t(`${slug}.date`);

  const sectionsObj = t.raw(`${slug}.sections`) as Record<string, { title: string; content: string; items?: string[] }>;
  const sections = sectionsObj ? Object.values(sectionsObj) : [];

  // Determine the other legal page for cross-linking
  const otherSlug: PlatformLegalSlug = slug === 'privacy-policy' ? 'terms-of-service' : 'privacy-policy';

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <FloatingOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <Link
              href={`/${locale}`}
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {commonT('backToHome')}
            </Link>

            <div className="flex items-start gap-4">
              <div className="icon-container h-14 w-14 shrink-0">
                <Icon className="h-7 w-7 text-white/80" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl heading-glow">
                  {commonT(`legal.${slug}`)}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/40">
                  <span>{commonT('lastUpdated')}: {lastUpdated}</span>
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
                  <div className="glass-card p-6 md:p-8">
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
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
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
      <section className="relative py-8 border-t border-white/10">
        <div className="absolute inset-0 bg-black" />
        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {commonT('backToHome')}
            </Link>

            <Link
              href={`/${locale}/${otherSlug}`}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              {commonT(`legal.${otherSlug}`)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
