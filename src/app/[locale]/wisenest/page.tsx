/**
 * WiseNest Product Landing Page
 * 
 * Crystal Black base + Emerald signature accent.
 * Uses WiseNest-specific CSS classes (wn-*) from src/styles/products/wisenest.css
 */

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Clock, Leaf, Users, Shield, Zap, Star, ShoppingCart, ChefHat, Bell, Sparkles } from 'lucide-react';
import { getProduct } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation';

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
    { icon: Clock, key: 'expiry' },
    { icon: ShoppingCart, key: 'shopping' },
    { icon: ChefHat, key: 'recipes' },
    { icon: Leaf, key: 'reduce' },
    { icon: Users, key: 'share' },
    { icon: Bell, key: 'notifications' },
  ];

  const highlights = [
    { icon: Shield, key: 'privacy' },
    { icon: Zap, key: 'smart' },
    { icon: Star, key: 'premium' },
  ];

  return (
    <div className="theme-wisenest flex flex-col">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="wn-section-hero">
        {/* Emerald-tinted background effects */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 wn-bg-haze" />
        <div className="absolute inset-0 wn-bg-mesh" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Emerald floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="wn-orb-emerald-lg -left-40 top-1/4 h-96 w-96 opacity-30" />
          <div className="wn-orb-emerald-md -right-20 top-1/3 h-72 w-72 opacity-20" />
          <div className="wn-orb-emerald-sm left-1/4 bottom-1/4 h-48 w-48 opacity-25" />
          <div className="wn-particle right-1/3 top-1/4 h-2 w-2" />
          <div className="wn-particle left-1/3 top-2/3 h-1.5 w-1.5" style={{ animationDelay: '1s' }} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />

        <div className="container-custom relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div>
              <ScrollAnimationWrapper animation="slide-left" delay={200}>
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
                  <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl wn-heading-glow">
                    {product.name}
                  </h1>
                </div>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slide-left" delay={300}>
                <p className="mt-4 text-xl font-medium wn-text-accent sm:text-2xl">
                  {t('wisenest.tagline')}
                </p>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slide-left" delay={400}>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  {t('wisenest.description')}
                </p>
              </ScrollAnimationWrapper>

              {/* Download Buttons */}
              <ScrollAnimationWrapper animation="slide-left" delay={500}>
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
              </ScrollAnimationWrapper>

              {/* Trust Badges */}
              <ScrollAnimationWrapper animation="slide-left" delay={600}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {highlights.map(({ icon: Icon, key }) => (
                    <span key={key} className="wn-badge gap-2">
                      <Icon className="h-4 w-4" />
                      {t(`wisenest.features.items.${key}.title`)}
                    </span>
                  ))}
                </div>
              </ScrollAnimationWrapper>
            </div>

            {/* Right: Visual */}
            <ScrollAnimationWrapper animation="scale-in" delay={300}>
              <div className="relative">
                {/* Glass panel with emerald glow */}
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-emerald-500/50 bg-emerald-500/25 p-8 backdrop-blur-xl">
                  {/* Inner emerald glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 via-transparent to-emerald-500/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
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
                {/* Decorative emerald glows */}
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-emerald-500/100 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-500/75 blur-2xl" />
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES SECTION */}
      {/* ============================================ */}
      <section className="wn-section-features wn-section-bg">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 wn-bg-mesh-alt opacity-80" />
        {/* Emerald ambient orbs */}
        <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full wn-glow-spot opacity-50" />
        <div className="absolute -right-40 bottom-1/4 h-[350px] w-[350px] rounded-full wn-glow-spot opacity-40" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl wn-heading-glow">
                {t('wisenest.features.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">
                {t('wisenest.features.subtitle')}
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, key }, index) => (
              <ScrollAnimationWrapper key={key} animation="slide-up" delay={index * 100}>
                <div className="wn-card group h-full">
                  <div className="wn-icon-container">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {t(`wisenest.features.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
                    {t(`wisenest.features.items.${key}.description`)}
                  </p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* LEGAL LINKS SECTION */}
      {/* ============================================ */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-black" />
        <div className="wn-divider" />

        <div className="container-custom relative z-10 pt-16">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white wn-heading-glow">
                {commonT('legalInfo')}
              </h2>
              <p className="mt-4 text-white/50">
                {commonT('legalInfoDescription')}
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {product.legalPages.map((page, index) => (
              <ScrollAnimationWrapper key={page} animation="slide-up" delay={index * 80}>
                <Link
                  href={`/${locale}/wisenest/${page}`}
                  className="group flex items-center justify-between rounded-xl border border-emerald-500/10 bg-emerald-500/3 px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/25 hover:bg-emerald-500/8"
                >
                  <span className="font-medium text-white/80 text-sm group-hover:text-white transition-colors">
                    {commonT(`legal.${page}`)}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/30 transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5" />
                </Link>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-black" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="scale-in">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 px-8 py-16 text-center sm:px-16">
              {/* Emerald gradient background */}
              <div className="absolute inset-0 wn-bg-gradient opacity-90" />
              <div className="absolute inset-0 wn-bg-mesh opacity-40" />
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              {/* Top glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />

              <div className="relative">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {t('wisenest.cta.title')}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100/80">
                  {t('wisenest.cta.subtitle')}
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  {product.appStoreUrl && (
                    <a
                      href={product.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-emerald-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
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
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-white/10 hover:border-white/50"
                    >
                      <Download className="h-5 w-5" />
                      {commonT('getOnPlayStore')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
}
