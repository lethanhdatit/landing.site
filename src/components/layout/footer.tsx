'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getActiveProducts } from '@/lib/products';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const products = getActiveProducts();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-500"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-500"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              {t('products')}
            </h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/${locale}/${product.id}`}
                    className="text-sm text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-500"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/wisenest/privacy-policy`}
                  className="text-sm text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-500"
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/wisenest/terms-of-service`}
                  className="text-sm text-neutral-600 transition-colors hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-500"
                >
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/images/logo-trans.png"
                alt="Insight AI VN"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              {t('madeWith')}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
