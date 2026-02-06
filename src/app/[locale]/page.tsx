import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Shield,
  MousePointerClick,
  Home,
  Heart,
  Wallet,
  MessageSquare,
  Gamepad2,
  Blocks,
  CheckCircle2,
  Clock,
  CircleDot,
  Calendar,
  Tag,
  Flag,
  Brain,
  Lock,
  Award,
  Download,
  ChevronRight,
} from 'lucide-react';
import { getProduct } from '@/lib/products';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import { GlowingCard } from '@/components/ui/glowing-card';
import { AnimatedCounter } from '@/components/ui/animated-counter';

// Product category data
const categories = [
  { id: 'home-lifestyle', icon: Home, status: 'active' as const, glowColor: 'blue' as const },
  { id: 'mom-baby', icon: Heart, status: 'coming-soon' as const, glowColor: 'warm' as const },
  { id: 'finance', icon: Wallet, status: 'planned' as const, glowColor: 'violet' as const },
  { id: 'social', icon: MessageSquare, status: 'planned' as const, glowColor: 'cool' as const },
  { id: 'games-casual', icon: Gamepad2, status: 'planned' as const, glowColor: 'blue' as const },
  { id: 'games-kids', icon: Blocks, status: 'planned' as const, glowColor: 'warm' as const },
];

// Roadmap milestones
const milestones = [
  { id: 'q1_2026', status: 'completed' as const },
  { id: 'q2_2026', status: 'in-progress' as const },
  { id: 'q4_2026', status: 'planned' as const },
  { id: '2027', status: 'planned' as const },
];

// News entries
const newsEntries = ['wisenest_launch', 'wisenest_premium', 'mom_baby_preview'] as const;

// Benefits
const benefitKeys = ['vietnamese', 'ai', 'privacy', 'quality'] as const;
const benefitIcons = { vietnamese: Flag, ai: Brain, privacy: Lock, quality: Award };

// Featured product highlights
const highlightKeys = ['expiry', 'shopping', 'recipes', 'family'] as const;

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
  const commonT = await getTranslations('common');
  const productsT = await getTranslations('products');
  const wisenest = getProduct('wisenest')!;

  return (
    <div className="flex flex-col">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen overflow-hidden pt-20 md:pt-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <FloatingOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

        <div className="container-custom relative z-10 flex min-h-screen items-center py-20">
          <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div className="flex flex-col justify-center">
              <ScrollAnimationWrapper animation="slide-left" delay={200}>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl heading-glow">
                  <span className="text-white">{t('hero.title').split(' ').slice(0, -2).join(' ')}</span>
                  <br />
                  <span className="text-gradient-shine">{t('hero.title').split(' ').slice(-2).join(' ')}</span>
                </h1>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slide-left" delay={300}>
                <p className="mt-6 max-w-xl text-lg text-white/60 sm:text-xl">{t('hero.subtitle')}</p>
              </ScrollAnimationWrapper>

              <ScrollAnimationWrapper animation="slide-left" delay={400}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href={`/${locale}/wisenest`} className="btn-primary group">
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="#roadmap" className="btn-secondary">{t('hero.secondary')}</a>
                </div>
              </ScrollAnimationWrapper>

              {/* Stats */}
              <ScrollAnimationWrapper animation="slide-up" delay={500}>
                <div className="mt-16 grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <AnimatedCounter end={1} suffix="" className="text-3xl font-bold text-white md:text-4xl" />
                    <p className="mt-1 text-sm text-white/40">{t('stats.products')}</p>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter end={6} className="text-3xl font-bold text-white md:text-4xl" />
                    <p className="mt-1 text-sm text-white/40">{t('stats.categories')}</p>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter end={10000} suffix="+" className="text-3xl font-bold text-white md:text-4xl" />
                    <p className="mt-1 text-sm text-white/40">{t('stats.downloads')}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            </div>

            {/* Right: Hero Visual */}
            <ScrollAnimationWrapper animation="slide-right" delay={300} className="flex items-center justify-center">
              <div className="relative">
                {/* Colored ambient glow behind visual */}
                <div className="absolute -inset-12 rounded-3xl bg-gradient-mesh-center opacity-80" />
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl frosted-panel lg:max-w-lg">
                  <div className="absolute inset-0 flex items-center justify-center water-droplets">
                    <div className="text-center p-8">
                      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center glass-bubble">
                        <Image src="/images/logo-trans.png" alt="Insight AI" width={80} height={80} className="h-16 w-auto brightness-110" />
                      </div>
                      <p className="text-sm text-white/50 mb-2">PLACEHOLDER IMAGE</p>
                      <p className="text-xs text-white/30 max-w-xs mx-auto">
                        3D crystal illustration: Floating app screens with frosted glass UI, product category icons orbiting around the logo
                      </p>
                    </div>
                  </div>
                  {/* Colored glow spots inside */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-glow-blue opacity-60" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-glow-violet opacity-50" />

                  {/* Floating mini cards */}
                  <div className="absolute -right-8 top-1/4 animate-float">
                    <div className="rounded-xl glass p-3 shadow-2xl">
                      <Sparkles className="h-6 w-6 text-blue-300/80" />
                    </div>
                  </div>
                  <div className="absolute -left-8 bottom-1/4 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="rounded-xl glass p-3 shadow-2xl">
                      <Shield className="h-6 w-6 text-violet-300/80" />
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

      {/* ============================================ */}
      {/* FEATURED PRODUCT - WiseNest Spotlight */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-mesh-alt opacity-60" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="badge-primary mb-4">{t('featured.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl heading-glow">
                {t('featured.title')}
              </h2>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="slide-up" delay={200}>
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-4 rounded-3xl bg-glow-blue opacity-40" />
              <div className="relative rounded-3xl frosted-panel overflow-hidden">
                <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12 items-center">
                  {/* Left: Product info */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      {wisenest.logo && (
                        <Image src={wisenest.logo} alt={wisenest.name} width={64} height={64} className="h-14 w-14 object-contain" />
                      )}
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white">{wisenest.name}</h3>
                        <p className="text-sm text-white/50">{productsT('wisenest.tagline')}</p>
                      </div>
                    </div>

                    <p className="text-white/60 leading-relaxed mb-8">{t('featured.description')}</p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {highlightKeys.map((key) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-white/70">{t(`featured.highlights.${key}`)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {wisenest.appStoreUrl && (
                        <a href={wisenest.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm gap-2">
                          <Download className="h-4 w-4" /> {commonT('appStore')}
                        </a>
                      )}
                      {wisenest.playStoreUrl && (
                        <a href={wisenest.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm gap-2">
                          <Download className="h-4 w-4" /> {commonT('playStore')}
                        </a>
                      )}
                      <Link href={`/${locale}/wisenest`} className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
                        {t('featured.learnMore')} <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Product visual */}
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-900/30 to-emerald-700/10 border border-white/10 flex items-center justify-center">
                      {wisenest.logo ? (
                        <Image src={wisenest.logo} alt={wisenest.name} width={200} height={200} className="max-h-40 max-w-40 object-contain drop-shadow-2xl" />
                      ) : (
                        <span className="text-8xl">{wisenest.icon}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* ============================================ */}
      {/* ECOSYSTEM - Product Categories */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-black" />
        {/* Colored ambient orbs */}
        <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-glow-violet opacity-40" />
        <div className="absolute -right-40 bottom-1/3 h-[400px] w-[400px] rounded-full bg-glow-blue opacity-30" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-accent mb-4">{t('ecosystem.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl heading-glow">
                {t('ecosystem.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">{t('ecosystem.subtitle')}</p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ id, icon: Icon, status, glowColor }, index) => (
              <ScrollAnimationWrapper key={id} animation="slide-up" delay={index * 100}>
                <GlowingCard glowColor={glowColor} className="h-full relative">
                  <div className={`absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full ${
                    status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : status === 'coming-soon'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-white/10 text-white/50 border border-white/10'
                  }`}>
                    {t(`ecosystem.statusLabels.${status}`)}
                  </div>

                  <div className="icon-container h-14 w-14">
                    <Icon className="h-7 w-7 text-white/80" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {t(`ecosystem.categories.${id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
                    {t(`ecosystem.categories.${id}.description`)}
                  </p>
                  <p className="mt-3 text-xs text-white/30">
                    {t(`ecosystem.categories.${id}.status`)}
                  </p>
                </GlowingCard>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ROADMAP - Development Timeline */}
      {/* ============================================ */}
      <section id="roadmap" className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-primary mb-4">{t('roadmap.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl heading-glow">
                {t('roadmap.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">{t('roadmap.subtitle')}</p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-16 mx-auto max-w-3xl">
            <div className="relative">
              {/* Timeline line with gradient */}
              <div className="absolute left-6 top-0 bottom-0 w-px md:left-1/2"
                style={{ background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.2), transparent)' }}
              />

              {milestones.map(({ id, status }, index) => {
                const StatusIcon = status === 'completed' ? CheckCircle2 : status === 'in-progress' ? Clock : CircleDot;
                const isLeft = index % 2 === 0;

                return (
                  <ScrollAnimationWrapper key={id} animation="slide-up" delay={index * 150}>
                    <div className={`relative flex items-start gap-6 pb-12 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                      {/* Timeline dot */}
                      <div className="absolute left-6 -translate-x-1/2 md:left-1/2">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                          status === 'completed'
                            ? 'border-emerald-500/50 bg-emerald-500/20'
                            : status === 'in-progress'
                            ? 'border-amber-500/50 bg-amber-500/20'
                            : 'border-white/20 bg-white/5'
                        }`}>
                          <StatusIcon className={`h-5 w-5 ${
                            status === 'completed' ? 'text-emerald-400' : status === 'in-progress' ? 'text-amber-400' : 'text-white/50'
                          }`} />
                        </div>
                      </div>

                      {/* Content card */}
                      <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}>
                        <div className="glass-card p-6">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${
                            status === 'completed' ? 'text-emerald-400' : status === 'in-progress' ? 'text-amber-400' : 'text-white/40'
                          }`}>
                            {t(`roadmap.milestones.${id}.period`)}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-semibold text-white">
                            {t(`roadmap.milestones.${id}.title`)}
                          </h3>
                          <p className="mt-2 text-sm text-white/50 leading-relaxed">
                            {t(`roadmap.milestones.${id}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* NEWS & UPDATES */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-glow-cyan opacity-30" />
        <div className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-glow-violet opacity-20" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-accent mb-4">{t('news.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl heading-glow">
                {t('news.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">{t('news.subtitle')}</p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {newsEntries.map((id, index) => (
              <ScrollAnimationWrapper key={id} animation="slide-up" delay={index * 100}>
                <div className="glass-card p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      <Tag className="h-3 w-3" />
                      {t(`news.entries.${id}.tag`)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/30">
                      <Calendar className="h-3 w-3" />
                      {t(`news.entries.${id}.date`)}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-white mb-3">
                    {t(`news.entries.${id}.title`)}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">
                    {t(`news.entries.${id}.summary`)}
                  </p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BENEFITS - Why Choose Us */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-mesh-alt opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-primary mb-4">{t('benefits.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl heading-glow">
                {t('benefits.title')}
              </h2>
              <p className="mt-4 text-lg text-white/50">{t('benefits.subtitle')}</p>
            </div>
          </ScrollAnimationWrapper>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefitKeys.map((key, index) => {
              const Icon = benefitIcons[key];
              const glowColors = ['blue', 'violet', 'cool', 'white'] as const;
              return (
                <ScrollAnimationWrapper key={key} animation="slide-up" delay={index * 100}>
                  <GlowingCard glowColor={glowColors[index]}>
                    <div className="icon-container h-14 w-14">
                      <Icon className="h-7 w-7 text-white/80" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">
                      {t(`benefits.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">
                      {t(`benefits.items.${key}.description`)}
                    </p>
                  </GlowingCard>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA - Get Started */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="scale-in">
            <div className="relative overflow-hidden rounded-3xl frosted-panel">
              {/* Rich gradient mesh inside CTA */}
              <div className="absolute inset-0 bg-gradient-mesh-center" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              {/* Edge glows */}
              <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-glow-blue opacity-60" />
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-glow-violet opacity-50" />
              {/* Top highlight line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

              <div className="relative px-8 py-16 text-center sm:px-16 md:py-24">
                {wisenest.logo && (
                  <div className="glass-bubble mx-auto h-20 w-20 flex items-center justify-center mb-6">
                    <Image src={wisenest.logo} alt={wisenest.name} width={48} height={48} className="h-10 w-10 object-contain" />
                  </div>
                )}

                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl heading-glow">
                  {t('cta.title')}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
                  {t('cta.subtitle')}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link href={`/${locale}/wisenest`} className="btn-primary group">
                    {t('cta.download')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href={`mailto:contact@insight.ai.vn`} className="btn-secondary">
                    {t('cta.subscribe')}
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
}