import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { locales, type Locale, setRequestLocale } from '@/i18n/config';
import { emails, getAddress } from '@/lib/content';

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
    { icon: Mail, key: 'email', value: emails.support, href: `mailto:${emails.support}` },
    { icon: MapPin, key: 'location', value: addr.full, href: null },
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
          <div className="mx-auto max-w-2xl">
            <div className="grid gap-8 md:grid-cols-2">
              {contactMethods.map(({ icon: Icon, key, value, href }) => (
                <div key={key} className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/50 dark:text-brand-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                    {t(`methods.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {t(`methods.${key}.description`)}
                  </p>
                  {href ? (
                    <a href={href} className="mt-4 inline-block text-brand-600 hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-4 text-neutral-900 dark:text-white">{value}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/50 dark:text-brand-500">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900 dark:text-white">
                    {t('support.title')}
                  </h3>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    {t('support.description')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {t('support.hours')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}