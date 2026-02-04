import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText, Key, CreditCard, AlertTriangle } from 'lucide-react';
import { getProduct, getActiveProducts, type LegalPageSlug } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';

const legalPages: LegalPageSlug[] = ['privacy-policy', 'terms-of-service', 'permissions', 'subscription-terms', 'disclaimer'];

export function generateStaticParams() {
  const products = getActiveProducts();
  const params: { locale: string; product: string; legal: string }[] = [];
  for (const locale of locales) {
    for (const product of products) {
      for (const legal of product.legalPages) {
        params.push({ locale, product: product.id, legal });
      }
    }
  }
  return params;
}

interface Props {
  params: Promise<{ locale: Locale; product: string; legal: string }>;
}

const legalIcons: Record<LegalPageSlug, typeof Shield> = {
  'privacy-policy': Shield,
  'terms-of-service': FileText,
  'permissions': Key,
  'subscription-terms': CreditCard,
  'disclaimer': AlertTriangle,
};

export async function generateMetadata({ params }: Props) {
  const { locale, product: productId, legal } = await params;
  const product = getProduct(productId);
  if (!product || !legalPages.includes(legal as LegalPageSlug)) return {};
  const t = await getTranslations({ locale, namespace: 'common' });
  const legalT = await getTranslations({ locale, namespace: 'legal' });
  
  const metadata: Record<string, unknown> = {
    title: `${t(`legal.${legal}`)} - ${product.name}`,
    description: legalT(`${legal}.meta.description`),
  };
  
  // Use product-specific favicon if available
  if (product.favicon) {
    metadata.icons = {
      icon: [
        { url: `${product.favicon}/favicon.ico`, sizes: 'any' },
        { url: `${product.favicon}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
        { url: `${product.favicon}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
        { url: `${product.favicon}/favicon-192x192.png`, sizes: '192x192', type: 'image/png' },
      ],
      apple: [
        { url: `${product.favicon}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
      ],
    };
  }
  
  return metadata;
}

export default async function LegalPage({ params }: Props) {
  const { locale, product: productId, legal } = await params;
  setRequestLocale(locale);
  const product = getProduct(productId);
  const isValidLegal = legalPages.includes(legal as LegalPageSlug);
  if (!product || !isValidLegal || !product.legalPages.includes(legal as LegalPageSlug)) notFound();

  const t = await getTranslations('common');
  const legalT = await getTranslations('legal');
  const Icon = legalIcons[legal as LegalPageSlug] || FileText;
  const lastUpdated = legalT(`${legal}.date`);

  const sectionsObj = legalT.raw(`${legal}.sections`) as Record<string, { title: string; content: string; items?: string[] }>;
  const sections = sectionsObj ? Object.values(sectionsObj) : [];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-brand-50 to-white py-16 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 md:py-24">
        <div className="container-custom">
          <Link href={`/${locale}/${product.id}`} className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-500">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('backToHome')} / {product.name}
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/50 dark:text-brand-500">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                {t(`legal.${legal}`)}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <span>{product.name}</span>
                <span className="hidden sm:inline"></span>
                <span>{t('lastUpdated')}: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-10">
              {sections.map((section, index) => (
                <article key={index} className="group">
                  <h2 className="mb-4 font-display text-xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                  {section.items && (
                    <ul className="mt-4 space-y-2 pl-5">
                      {section.items.map((item, i) => (
                        <li key={i} className="relative text-base leading-relaxed text-neutral-600 before:absolute before:-left-4 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-500 dark:text-neutral-400">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
            <div className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('legalQuestions') || 'Have questions about our policies?'}</p>
              <Link href={`/${locale}/contact`} className="mt-2 inline-flex items-center gap-2 font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400">
                {t('contactUs') || 'Contact Us'}
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}