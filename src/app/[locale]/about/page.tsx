import { getTranslations } from 'next-intl/server';
import { Heart, Users, Lightbulb, Target, Sparkles, Cpu, Code2, Rocket } from 'lucide-react';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation';
import { GlowingCard } from '@/components/ui/glowing-card';
import { FloatingOrbs } from '@/components/ui/floating-orbs';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('about');

  const values = [
    { icon: Heart, key: 'passion', glowColor: 'warm' as const },
    { icon: Users, key: 'users', glowColor: 'silver' as const },
    { icon: Lightbulb, key: 'innovation', glowColor: 'white' as const },
    { icon: Target, key: 'quality', glowColor: 'cool' as const },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <FloatingOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        
        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-3xl text-center">
              <span className="badge-primary mb-6">{t('hero.badge')}</span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl heading-glow">
                {t('hero.title')}
              </h1>
              <p className="mt-6 text-lg text-white/60 sm:text-xl">
                {t('hero.subtitle')}
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-white/3 blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <ScrollAnimationWrapper animation="slide-left">
              <div>
                <span className="badge-accent mb-4">{t('mission.badge')}</span>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {t('mission.title')}
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  {t('mission.content')}
                </p>
              </div>
            </ScrollAnimationWrapper>
            
            <ScrollAnimationWrapper animation="slide-right" delay={200}>
              {/* Placeholder for mission image */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-2xl" />
                <div className="relative aspect-video rounded-2xl frosted-panel overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center water-droplets">
                    <div className="text-center p-6">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center glass-bubble">
                        <Rocket className="h-8 w-8 text-white/80" />
                      </div>
                      <p className="text-xs text-white/40">PLACEHOLDER IMAGE</p>
                      <p className="text-xs text-white/30 mt-1 max-w-[200px] mx-auto">
                        Futuristic workspace with holographic displays, AI interfaces, team collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-white/3 blur-3xl" />
        
        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="slide-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-primary mb-4">{t('values.badge')}</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl heading-glow">
                {t('values.title')}
              </h2>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, key, glowColor }, index) => (
              <ScrollAnimationWrapper key={key} animation="slide-up" delay={index * 100}>
                <GlowingCard glowColor={glowColor} className="text-center h-full">
                  <div className="mx-auto icon-container h-16 w-16">
                    <Icon className="h-8 w-8 text-white/80" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-white">
                    {t(`values.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed">
                    {t(`values.items.${key}.description`)}
                  </p>
                </GlowingCard>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute left-1/4 bottom-0 h-80 w-80 rounded-full bg-white/3 blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <ScrollAnimationWrapper animation="slide-left" delay={200}>
              {/* Placeholder for team image */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-2xl" />
                <div className="relative aspect-video rounded-2xl frosted-panel overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center water-droplets">
                    <div className="text-center p-6">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center glass-bubble">
                        <Code2 className="h-8 w-8 text-white/80" />
                      </div>
                      <p className="text-xs text-white/40">PLACEHOLDER IMAGE</p>
                      <p className="text-xs text-white/30 mt-1 max-w-[200px] mx-auto">
                        Team of developers working together, coding on multiple screens, neon-lit office
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
            
            <ScrollAnimationWrapper animation="slide-right" className="order-1 lg:order-2">
              <div>
                <span className="badge-accent mb-4">{t('team.badge')}</span>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {t('team.title')}
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  {t('team.content')}
                </p>
                
                {/* Team stats */}
                <div className="mt-10 grid grid-cols-3 gap-6">
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-xs text-white/40 mt-1">{t('team.stats.experience')}</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-white">10+</div>
                    <div className="text-xs text-white/40 mt-1">{t('team.stats.projects')}</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-xs text-white/40 mt-1">{t('team.stats.passion')}</div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}