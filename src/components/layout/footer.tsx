'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getActiveProducts } from '@/lib/products';
import { emails, socials, company } from '@/lib/company';
import { Github, Twitter, Mail, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const products = getActiveProducts();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background - pure black */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Subtle crystal glow effects */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-white/3 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-white/3 blur-3xl" />
      
      <div className="container-custom relative py-16 md:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Company */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t('company')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="group inline-flex items-center gap-1 text-sm text-white/50 transition-all duration-300 hover:text-white"
                >
                  <span>{t('about')}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center gap-1 text-sm text-white/50 transition-all duration-300 hover:text-white"
                >
                  <span>{t('contact')}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t('products')}
            </h3>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/${locale}/${product.id}`}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 transition-all duration-300 hover:text-white"
                  >
                    {product.logo ? (
                      <Image
                        src={product.logo}
                        alt={product.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain opacity-60 transition-opacity group-hover:opacity-100"
                      />
                    ) : (
                      <span className="text-base opacity-60 transition-opacity group-hover:opacity-100">{product.icon}</span>
                    )}
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t('legal')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${locale}/wisenest/privacy-policy`}
                  className="text-sm text-white/50 transition-all duration-300 hover:text-white"
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/wisenest/terms-of-service`}
                  className="text-sm text-white/50 transition-all duration-300 hover:text-white"
                >
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="group inline-block">
              <div className="relative">
                <div className="absolute -inset-2 rounded-lg bg-white/10 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Image
                  src="/images/logo-trans.png"
                  alt={company.name}
                  width={160}
                  height={40}
                  className="relative h-10 w-auto brightness-110"
                />
              </div>
            </Link>
            <p className="mt-4 text-sm text-white/40">
              {t('madeWith')}
            </p>
            
            {/* Social links - crystal glass style */}
            <div className="mt-6 flex gap-3">
              <a
                href={`mailto:${emails.general}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-white/50 transition-colors group-hover:text-white" />
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-white/50 transition-colors group-hover:text-white" />
              </a>
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-white/50 transition-colors group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16">
          {/* Gradient divider */}
          <div className="divider-gradient mb-8" />
          
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="flex items-center gap-1 text-sm text-white/40">
              {t('copyright', { year: currentYear })}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-white/30">
              <span>Built with</span>
              <Heart className="h-3.5 w-3.5 animate-pulse text-rose-400" />
              <span>and</span>
              <span className="text-white font-medium">AI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
