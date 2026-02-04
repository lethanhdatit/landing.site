import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Shield, Zap, Globe } from 'lucide-react';
import { getActiveProducts } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('home');
  const productsT = await getTranslations('products');
  const products = getActiveProducts();

  const featureKeys = ['ai', 'privacy', 'fast', 'multilingual'] as const;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white py-20 dark:from-neutral-900 dark:to-neutral-950 md:py-32">
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/${locale}/wisenest`}
                className="btn-primary inline-flex items-center gap-2"
              >
                {t('hero.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/about`}
                className="btn-secondary"
              >
                {t('hero.secondary')}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {t('features.title')}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featureKeys.map((key) => {
              const Icon = key === 'ai' ? Sparkles : key === 'privacy' ? Shield : key === 'fast' ? Zap : Globe;
              return (
                <div
                  key={key}
                  className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-brand-800"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-900/50 dark:text-brand-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                    {t(`features.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {t(`features.items.${key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900 md:py-32">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/${product.id}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-brand-200 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-brand-800"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl">
                  {product.logo ? (
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{product.icon}</span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-neutral-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  {productsT(`${product.id}.tagline`)}
                </p>
                <div className="mt-6 flex items-center gap-2 text-brand-600 dark:text-brand-500">
                  <span className="text-sm font-medium">{t('products.learnMore')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 px-8 py-16 text-center sm:px-16 md:py-24">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10">
              <Link
                href={`/${locale}/wisenest`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-brand-600 transition-transform hover:scale-105"
              >
                {t('cta.button')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-800/30 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}