'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { getActiveProducts } from '@/lib/products';
import { company } from '@/lib/company';

export function Header() {
  const t = useTranslations('nav');
  const tProducts = useTranslations('products');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const products = getActiveProducts();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('products'), href: '#', hasDropdown: true },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        isScrolled
          ? 'border-b border-white/10 bg-black/80 backdrop-blur-xl shadow-lg shadow-black/50 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-blue-500/10 after:to-transparent'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            {/* Glow effect behind logo */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-400/10 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/images/logo-trans.png"
                alt={company.name}
                width={180}
                height={45}
                className="relative h-10 w-auto brightness-110 md:h-11"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={cn(
                      'flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
                      'text-white/70 hover:bg-white/5 hover:text-white',
                      isProductsOpen && 'bg-white/5 text-white'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        isProductsOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Dropdown with crystal glass */}
                  <div
                    className={cn(
                      'absolute left-0 top-full mt-2 w-72 rounded-2xl border border-white/10 p-3 shadow-xl transition-all duration-300',
                      'bg-black/90 backdrop-blur-xl',
                      isProductsOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-2 opacity-0'
                    )}
                  >
                    {/* Top highlight */}
                    <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent pointer-events-none" />
                    
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${locale}/${product.id}`}
                        className="group relative flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-white/5"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        {/* Product icon with glow */}
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-lg bg-white/20 blur opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          {product.logo ? (
                            <Image
                              src={product.logo}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="relative h-10 w-10 object-contain"
                            />
                          ) : (
                            <span className="relative text-3xl">{product.icon}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white group-hover:text-white">
                            {product.name}
                          </div>
                          <div className="text-sm text-white/50 group-hover:text-white/70">
                            {tProducts(`${product.id}.tagline` as any)}
                          </div>
                        </div>
                        <Sparkles className="h-4 w-4 text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'rounded-xl p-2.5 transition-all duration-300 md:hidden',
                'text-white/70 hover:bg-white/5 hover:text-white',
                isMenuOpen && 'bg-white/5 text-white'
              )}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with crystal glass */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-500 md:hidden',
            isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="border-t border-white/10 py-4">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="py-1">
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        isProductsOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300',
                      isProductsOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${locale}/${product.id}`}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/50 transition-all duration-300 hover:bg-white/5 hover:text-white"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProductsOpen(false);
                        }}
                      >
                        {product.logo ? (
                          <Image
                            src={product.logo}
                            alt={product.name}
                            width={28}
                            height={28}
                            className="h-7 w-7 object-contain"
                          />
                        ) : (
                          <span className="text-xl">{product.icon}</span>
                        )}
                        <span>{product.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
