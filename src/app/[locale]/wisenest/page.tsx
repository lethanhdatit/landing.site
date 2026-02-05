/**
 * WiseNest Product Landing Page
 * 
 * Custom-designed page for WiseNest product with its own theme and styling.
 * Uses WiseNest-specific CSS classes (wn-*) from src/styles/products/wisenest.css
 */

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Clock, Leaf, Users, Shield, Zap, Star, ShoppingCart, ChefHat, Bell } from 'lucide-react';
import { getProduct } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const product = getProduct('wisenest')!;
  const t = await getTranslations({ locale, namespace: 'products' });
  
  return {
    title: `${product.name} - ${t('wisenest.tagline')}`,
    description: t('wisenest.description'),
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

export default async function WiseNestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const product = getProduct('wisenest')!;
  const t = await getTranslations('products');
  const commonT = await getTranslations('common');

  // WiseNest-specific features matching the actual app
  const features = [
    { icon: Clock, key: 'expiry', color: 'text-amber-500' },
    { icon: ShoppingCart, key: 'shopping', color: 'text-blue-500' },
    { icon: ChefHat, key: 'recipes', color: 'text-red-500' },
    { icon: Leaf, key: 'reduce', color: 'text-green-500' },
    { icon: Users, key: 'share', color: 'text-purple-500' },
    { icon: Bell, key: 'notifications', color: 'text-orange-500' },
  ];

  const highlights = [
    { icon: Shield, key: 'privacy' },
    { icon: Zap, key: 'smart' },
    { icon: Star, key: 'premium' },
  ];

  return (
    <div className="theme-wisenest flex flex-col">
      {/* Hero Section */}
      <section className="wn-section-hero wn-bg-gradient-soft">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Content */}
            <div>
              <div className="flex items-center gap-4">
                {product.logo && (
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={72}
                    height={72}
                    className="h-18 w-18 object-contain"
                  />
                )}
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
                  {product.name}
                </h1>
              </div>
              
              <p className="mt-4 text-xl font-medium wn-text-primary sm:text-2xl">
                {t('wisenest.tagline')}
              </p>
              
              <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t('wisenest.description')}
              </p>
              
              {/* Download Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                {product.appStoreUrl && (
                  <a 
                    href={product.appStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="wn-btn-primary gap-2"
                  >
                    <Download className="h-5 w-5" /> 
                    {commonT('appStore')}
                  </a>
                )}
                {product.playStoreUrl && (
                  <a 
                    href={product.playStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="wn-btn-secondary gap-2"
                  >
                    <Download className="h-5 w-5" /> 
                    {commonT('playStore')}
                  </a>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map(({ icon: Icon, key }) => (
                  <span key={key} className="wn-badge gap-2">
                    <Icon className="h-4 w-4" />
                    {t(`wisenest.features.items.${key}.title`)}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl wn-bg-gradient p-8 shadow-2xl shadow-emerald-500/20">
                <div className="flex h-full items-center justify-center">
                  {product.logo && (
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={320}
                      height={320}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl"
                    />
                  )}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-emerald-200/50 blur-2xl dark:bg-emerald-800/30" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-teal-200/50 blur-2xl dark:bg-teal-800/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="wn-section-features">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {t('wisenest.features.title')}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              {t('wisenest.features.subtitle')}
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, key, color }) => (
              <div key={key} className="wn-card group">
                <div className="wn-icon-container">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                  {t(`wisenest.features.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {t(`wisenest.features.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Links Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {commonT('legalInfo')}
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              {commonT('legalInfoDescription')}
            </p>
          </div>
          
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {product.legalPages.map((page) => (
              <Link 
                key={page} 
                href={`/${locale}/wisenest/${page}`} 
                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-3.5 transition-all hover:border-emerald-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-emerald-800"
              >
                <span className="font-medium text-neutral-900 dark:text-white text-sm">
                  {commonT(`legal.${page}`)}
                </span>
                <ArrowRight className="h-4 w-4 text-neutral-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl wn-bg-gradient px-8 py-16 text-center sm:px-16">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10" />
            
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {t('wisenest.cta.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
                {t('wisenest.cta.subtitle')}
              </p>
              
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {product.appStoreUrl && (
                  <a 
                    href={product.appStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-emerald-700 transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <Download className="h-5 w-5" /> 
                    {commonT('downloadOnAppStore')}
                  </a>
                )}
                {product.playStoreUrl && (
                  <a 
                    href={product.playStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
                  >
                    <Download className="h-5 w-5" /> 
                    {commonT('getOnPlayStore')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
