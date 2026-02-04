/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Static export for GitHub Pages
  output: 'export',
  
  // Trailing slash for static hosting compatibility
  trailingSlash: true,

  // Disable image optimization for static export (use unoptimized images)
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  // Note: Custom headers are not supported in static export
  // They should be configured via _headers file or hosting provider
};

module.exports = withNextIntl(nextConfig);
