import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Star, Shield, Zap, Clock, Users, Leaf } from 'lucide-react';
import { getProduct, getActiveProducts } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';

// Products that have their own custom pages (exclude from this generic route)
const PRODUCTS_WITH_CUSTOM_PAGES = ['wisenest'];

export function generateStaticParams() {
  const products = getActiveProducts().filter(p => !PRODUCTS_WITH_CUSTOM_PAGES.includes(p.id));
  const params: { locale: string; product: string }[] = [];
  
  // Generate params for products without custom pages
  for (const locale of locales) {
    for (const product of products) {
      params.push({ locale, product: product.id });
    }
  }
  
  // If no products remain, add a placeholder that will 404
  // This is required for static export when all products have custom pages
  if (params.length === 0) {
    for (const locale of locales) {
      params.push({ locale, product: '_placeholder' });
    }
  }
  
  return params;
}

interface Props {
  params: Promise<{ locale: Locale; product: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale, product: productId } = await params;
  const product = getProduct(productId);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: 'products' });
  
  const metadata: Record<string, unknown> = {
    title: `${product.name} - ${t(`${product.id}.tagline`)}`,
    description: t(`${product.id}.description`),
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

export default async function ProductPage({ params }: Props) {
  const { locale, product: productId } = await params;
  setRequestLocale(locale);
  
  // Products with custom pages should use their own routes
  if (PRODUCTS_WITH_CUSTOM_PAGES.includes(productId)) {
    notFound();
  }
  
  const product = getProduct(productId);
  if (!product) notFound();

  const t = await getTranslations('products');
  const commonT = await getTranslations('common');

  const features = [
    { icon: Clock, key: 'expiry' },
    { icon: Leaf, key: 'reduce' },
    { icon: Users, key: 'share' },
    { icon: Shield, key: 'privacy' },
    { icon: Zap, key: 'smart' },
    { icon: Star, key: 'premium' },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white py-20 dark:from-neutral-900 dark:to-neutral-950 md:py-32">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-4">
                {product.logo ? (
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <span className="text-5xl">{product.icon}</span>
                )}
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
                  {product.name}
                </h1>
              </div>
              <p className="mt-4 text-xl text-brand-600 dark:text-brand-500">
                {t(`${product.id}.tagline`)}
              </p>
              <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
                {t(`${product.id}.description`)}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                {product.appStoreUrl && (
                  <a href={product.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                    <Download className="h-4 w-4" /> App Store
                  </a>
                )}
                {product.playStoreUrl && (
                  <a href={product.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
                    <Download className="h-4 w-4" /> Google Play
                  </a>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 p-8 dark:from-brand-900/50 dark:to-brand-800/50">
                <div className="flex h-full items-center justify-center">
                  {product.logo ? (
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={320}
                      height={320}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-9xl">{product.icon}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {t(`${product.id}.features.title`)}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              {t(`${product.id}.features.subtitle`)}
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, key }) => (
              <div key={key} className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-brand-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-900/50 dark:text-brand-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                  {t(`${product.id}.features.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {t(`${product.id}.features.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {commonT('legalInfo')}
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              {commonT('legalInfoDescription')}
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {product.legalPages.map((page) => (
              <Link key={page} href={`/${locale}/${product.id}/${page}`} className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-6 py-4 transition-all hover:border-brand-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-brand-800">
                <span className="font-medium text-neutral-900 dark:text-white">{commonT(`legal.${page}`)}</span>
                <ArrowRight className="h-4 w-4 text-neutral-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 px-8 py-16 text-center sm:px-16">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{t(`${product.id}.cta.title`)}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">{t(`${product.id}.cta.subtitle`)}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {product.appStoreUrl && (
                <a href={product.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-brand-600 transition-transform hover:scale-105">
                  <Download className="h-5 w-5" /> Download on App Store
                </a>
              )}
              {product.playStoreUrl && (
                <a href={product.playStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-transform hover:scale-105">
                  <Download className="h-5 w-5" /> Get it on Google Play
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}