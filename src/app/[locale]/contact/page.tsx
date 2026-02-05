import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, MessageCircle, Clock, Send, ArrowRight } from 'lucide-react';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { emails, getAddress } from '@/lib/content';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation';
import { GlowingCard } from '@/components/ui/glowing-card';
import { FloatingOrbs } from '@/components/ui/floating-orbs';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('contact');
  const addr = getAddress(locale as 'en' | 'vi');

  const contactMethods = [
    { icon: Mail, key: 'email', value: emails.support, href: `mailto:${emails.support}`, glowColor: 'white' as const },
    { icon: MapPin, key: 'location', value: addr.full, href: null, glowColor: 'silver' as const },
    { icon: Clock, key: 'hours', value: null, href: null, glowColor: 'cool' as const },
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

      {/* Contact Methods Grid */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-white/3 blur-3xl" />
        <div className="absolute right-0 bottom-1/3 h-80 w-80 rounded-full bg-white/3 blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              {contactMethods.map(({ icon: Icon, key, value, href, glowColor }, index) => (
                <ScrollAnimationWrapper key={key} animation="slide-up" delay={index * 100}>
                  <GlowingCard glowColor={glowColor} className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="icon-container h-12 w-12 flex-shrink-0">
                        <Icon className="h-6 w-6 text-white/80" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {t(`methods.${key}.title`)}
                        </h3>
                        <p className="mt-1 text-sm text-white/50">
                          {t(`methods.${key}.description`)}
                        </p>
                        {value && (href ? (
                          <a 
                            href={href}
                            className="mt-3 inline-block text-sm text-white/80 hover:text-white transition-colors duration-300"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-3 text-sm text-white">{value}</p>
                        ))}
                      </div>
                    </div>
                  </GlowingCard>
                </ScrollAnimationWrapper>
              ))}
            </div>
            
            {/* Support Card */}
            <ScrollAnimationWrapper animation="slide-up" delay={300}>
              <div className="mt-8 relative">
                <div className="absolute -inset-2 rounded-3xl bg-white/5 blur-xl" />
                <div className="glass-card-glow relative p-8">
                  <div className="flex items-start gap-4">
                    <div className="icon-container h-14 w-14 flex-shrink-0">
                      <MessageCircle className="h-7 w-7 text-white/80" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-white">
                        {t('support.title')}
                      </h3>
                      <p className="mt-2 text-white/60">
                        {t('support.description')}
                      </p>
                      <p className="mt-4 text-sm text-white/40 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t('support.hours')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="container-custom relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start max-w-5xl mx-auto">
            <ScrollAnimationWrapper animation="slide-left">
              <div>
                <span className="badge-accent mb-4">{t('form.badge')}</span>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl heading-glow">
                  {t('form.title')}
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  {t('form.description')}
                </p>
                
                {/* Quick links */}
                <div className="mt-10 space-y-4">
                  <a href={`mailto:${emails.support}`} className="glass-card p-4 flex items-center gap-4 hover:border-white/20 transition-colors group cursor-pointer block">
                    <div className="icon-container h-10 w-10 flex-shrink-0">
                      <Mail className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{t('quickLinks.generalInquiries')}</p>
                      <p className="text-xs text-white/40">{emails.support}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/80 transition-colors" />
                  </a>
                  
                  <div className="glass-card p-4 flex items-center gap-4 hover:border-white/20 transition-colors group cursor-pointer">
                    <div className="icon-container h-10 w-10 flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{t('quickLinks.technicalSupport')}</p>
                      <p className="text-xs text-white/40">{t('quickLinks.available247')}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
            
            <ScrollAnimationWrapper animation="slide-right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-2xl" />
                <div className="glass-card-glow relative p-8">
                  <form className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                          {t('form.name')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10 focus:outline-none transition-all duration-300"
                          placeholder={t('form.namePlaceholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                          {t('form.email')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10 focus:outline-none transition-all duration-300"
                          placeholder={t('form.emailPlaceholder')}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                        {t('form.subject')}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10 focus:outline-none transition-all duration-300"
                        placeholder={t('form.subjectPlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                        {t('form.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10 focus:outline-none transition-all duration-300 resize-none"
                        placeholder={t('form.messagePlaceholder')}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {t('form.submit')}
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Map/Location Section - Placeholder */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-black" />
        
        <div className="container-custom relative z-10">
          <ScrollAnimationWrapper animation="scale-in">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden aspect-video max-w-4xl mx-auto frosted-panel">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/20 glass-bubble">
                    <MapPin className="h-8 w-8 text-white/80" />
                  </div>
                  <p className="text-xs text-white/40">PLACEHOLDER IMAGE</p>
                  <p className="text-xs text-white/30 mt-1 max-w-[200px] mx-auto">
                    Interactive 3D map with glowing location pin, futuristic city view, dark theme
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
}