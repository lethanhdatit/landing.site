import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Zap, 
  Globe,
  Brain,
  Cpu,
  Layers,
  MousePointerClick
} from 'lucide-react';
import { getActiveProducts } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import { GlowingCard } from '@/components/ui/glowing-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';

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
  const featureIcons = {
    ai: Brain,
    privacy: Shield,
    fast: Zap,
    multilingual: Globe,
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-20 md:pt-0">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <FloatingOrbs />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
        
        <div className="container-custom relative z-10 flex min-h-screen items-center py-20">
          <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div className="flex flex-col justify-center">
              <ScrollAnimationWrapper animation="slide-left" delay={100}>
                {/* Badge - Crystal style */}
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-white/80" />
                  <span className="text-sm font-medium text-white/90">
                    {t('hero.badge')}
                  </span>
                </div>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slide-left" delay={200}>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl heading-glow">
                  <span className="text-white">{t('hero.title').split(' ').slice(0, -2).join(' ')}</span>
                  <br />
                  <span className="text-gradient-shine">{t('hero.title').split(' ').slice(-2).join(' ')}</span>
                </h1>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slide-left" delay={300}>
                <p className="mt-6 max-w-xl text-lg text-white/60 sm:text-xl">
                  {t('hero.subtitle')}
                </p>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slide-left" delay={400}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={`/${locale}/wisenest`}
                    className="btn-primary group"
                  >
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={`/${locale}/about`}
                    className="btn-secondary"
                  >
                    {t('hero.secondary')}
                  </Link>
                </div>
              </ScrollAnimationWrapper>

              {/* Stats */}
              <ScrollAnimationWrapper animation="slide-up" delay={500}>
                <div className="mt-16 grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <AnimatedCounter end={10000} suffix="+" className="text-3xl font-bold text-white md:text-4xl" />
                    <p className="mt-1 text-sm text-white/40">{t('stats.downloads')}</p>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter end={4.9} decimals={1} className="text-3xl font-bold text-white md:text-4xl" />
                    <p className="mt-1 text-sm text-white/40">{t('stats.rating')}</p>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter end={99} suffix="%" className="text-3xl font-bold text-white md:text-4xl" />
                    <p className="mt-1 text-sm text-white/40">{t('stats.uptime')}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            </div>

            {/* Right: Hero Image - Crystal Glass Style */}
            <ScrollAnimationWrapper animation="slide-right" delay={300} className="flex items-center justify-center">
              <div className="relative">
                {/* Soft glow effect */}
                <div className="absolute -inset-8 rounded-3xl bg-white/5 blur-3xl" />
                
                {/* Main frosted glass card */}
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl frosted-panel lg:max-w-lg">
                  {/* Placeholder for hero image */}
                  <div className="absolute inset-0 flex items-center justify-center water-droplets">
                    <div className="text-center p-8">
                      {/* Animated icon - crystal bubble */}
                      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center glass-bubble">
                        <Cpu className="h-12 w-12 text-white/80 animate-pulse" />
                      </div>
                      <p className="text-sm text-white/50 mb-2">PLACEHOLDER IMAGE</p>
                      <p className="text-xs text-white/30 max-w-xs mx-auto">
                        3D crystal illustration: Floating phone screens with frosted glass UI, 
                        water droplet effects, pure black background with white highlights
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative glow elements */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                  
                  {/* Floating crystal mini cards */}
                  <div className="absolute -right-8 top-1/4 animate-float">
                    <div className="rounded-xl glass p-3 shadow-2xl">
                      <Sparkles className="h-6 w-6 text-white/80" />
                    </div>
                  </div>
                  <div className="absolute -left-8 bottom-1/4 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="rounded-xl glass p-3 shadow-2xl">
                      <Shield className="h-6 w-6 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <MousePointerClick className="h-5 w-5" />
            <span className="text-xs">{t('hero.scroll')}</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 md:py-32">
        {/* Background - Pure black with subtle grid */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Subtle crystal glow */}
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-white/3 blur-3xl" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-primary mb-4">{t('features.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl heading-glow">
                {t('features.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">
                {t('features.subtitle')}
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureKeys.map((key, index) => {
              const Icon = featureIcons[key];
              return (
                <ScrollAnimationWrapper 
                  key={key} 
                  animation="slide-up" 
                  delay={index * 100}
                >
                  <GlowingCard glowColor="white">
                    <div className="icon-container h-14 w-14">
                      <Icon className="h-7 w-7 text-white/80" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">
                      {t(`features.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">
                      {t(`features.items.${key}.description`)}
                    </p>
                  </GlowingCard>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative py-24 md:py-32">
        {/* Background - Pure black */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Crystal orbs - very subtle */}
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-white/3 blur-3xl" />
        <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-white/3 blur-3xl" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-accent mb-4">{t('products.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl heading-glow">
                {t('products.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">
                {t('products.subtitle')}
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ScrollAnimationWrapper 
                key={product.id} 
                animation="slide-up" 
                delay={index * 150}
              >
                <Link
                  href={`/${locale}/${product.id}`}
                  className="group relative block rounded-2xl glass p-8 transition-all duration-500 hover:bg-white/5"
                >
                  {/* Hover glow - crystal white */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]" />
                  
                  <div className="relative">
                    {/* Product icon with crystal effect */}
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 rounded-xl bg-white/10 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      {product.logo ? (
                        <Image
                          src={product.logo}
                          alt={product.name}
                          width={72}
                          height={72}
                          className="relative h-16 w-16 object-contain"
                        />
                      ) : (
                        <span className="relative text-5xl">{product.icon}</span>
                      )}
                    </div>
                    
                    <h3 className="mt-6 font-display text-xl font-semibold text-white transition-colors group-hover:text-gradient">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-white/50 transition-colors group-hover:text-white/70">
                      {productsT(`${product.id}.tagline`)}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-2 text-white/70 transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                      <span className="text-sm font-medium">{t('products.learnMore')}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Frosted Glass Style */}
      <section className="relative py-24 md:py-32">
        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="scale-in">
            <div className="relative overflow-hidden rounded-3xl frosted-panel">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              
              {/* Crystal glow effects */}
              <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
              
              <div className="relative px-8 py-16 text-center sm:px-16 md:py-24">
                <div className="glass-bubble mx-auto h-20 w-20 flex items-center justify-center mb-6">
                  <Layers className="h-10 w-10 text-white/80" />
                </div>
                
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl heading-glow">
                  {t('cta.title')}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
                  {t('cta.subtitle')}
                </p>
                <div className="mt-10">
                  <Link
                    href={`/${locale}/wisenest`}
                    className="btn-primary group"
                  >
                    {t('cta.button')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
}