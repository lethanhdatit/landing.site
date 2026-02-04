'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { getActiveProducts } from '@/lib/products';

export function Header() {
  const t = useTranslations('nav');
  const tProducts = useTranslations('products');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const products = getActiveProducts();

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('products'), href: '#', hasDropdown: true },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/images/logo-trans.png"
              alt="Insight AI VN"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isProductsOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isProductsOpen && (
                    <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/${locale}/${product.id}`}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          {product.logo ? (
                            <Image
                              src={product.logo}
                              alt={product.name}
                              width={32}
                              height={32}
                              className="h-8 w-8 object-contain"
                            />
                          ) : (
                            <span className="text-2xl">{product.icon}</span>
                          )}
                          <div>
                            <div className="font-medium text-neutral-900 dark:text-white">
                              {product.name}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {tProducts(`${product.id}.tagline` as any)}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 md:hidden dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-neutral-200 py-4 md:hidden dark:border-neutral-800">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="py-1">
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isProductsOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isProductsOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/${locale}/${product.id}`}
                          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsProductsOpen(false);
                          }}
                        >
                          {product.logo ? (
                            <Image
                              src={product.logo}
                              alt={product.name}
                              width={24}
                              height={24}
                              className="h-6 w-6 object-contain"
                            />
                          ) : (
                            <span>{product.icon}</span>
                          )}
                          <span>{product.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
