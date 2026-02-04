import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Insight AI',
  description: 'AI-powered solutions for everyday life',
};

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Root layout - minimal wrapper for root redirect page
 * The main layout with header/footer is in [locale]/layout.tsx
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
