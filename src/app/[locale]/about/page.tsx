import { getTranslations } from 'next-intl/server';
import { Heart, Users, Lightbulb, Target } from 'lucide-react';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';

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
    { icon: Heart, key: 'passion' },
    { icon: Users, key: 'users' },
    { icon: Lightbulb, key: 'innovation' },
    { icon: Target, key: 'quality' },
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 dark:from-neutral-900 dark:to-neutral-950 md:py-32">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {t('mission.title')}
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              {t('mission.content')}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900 md:py-32">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {t('values.title')}
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, key }) => (
              <div key={key} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/50 dark:text-brand-500">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {t(`values.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {t('team.title')}
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              {t('team.content')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}