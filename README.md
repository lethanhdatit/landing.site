# insight-landing

Landing site for Insight AI products at [insight.ai.vn](https://insight.ai.vn).

## Features

- 🌐 **Multi-language Support** - English and Vietnamese (i18n with next-intl)
- 📱 **Multi-product Support** - Dynamic routes for each product (WiseNest, etc.)
- 📄 **Legal Pages** - Privacy Policy, Terms of Service, Permissions, Subscription Terms, Disclaimer
- 🎨 **Modern UI** - Tailwind CSS with custom brand colors
- 🔍 **SEO Optimized** - Sitemap, robots.txt, structured data
- 🚀 **Fast Performance** - Next.js 14 with App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Icons**: Lucide React
- **TypeScript**: Strict mode

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── [product]/
│   │   │   ├── [legal]/      # Legal pages
│   │   │   └── page.tsx      # Product page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx          # Home page
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   └── layout/
│       ├── header.tsx
│       ├── footer.tsx
│       └── language-switcher.tsx
├── i18n/
│   ├── config.ts
│   ├── request.ts
│   └── locales/
│       ├── en.json
│       └── vi.json
├── lib/
│   ├── products.ts           # Product configuration
│   └── utils.ts
└── styles/
    └── globals.css
```

## Adding a New Product

1. Add the product configuration in `src/lib/products.ts`:

```typescript
const products: Product[] = [
  {
    id: 'new-product',
    name: 'New Product',
    tagline: 'Product tagline',
    icon: '🚀',
    active: true,
    appStoreUrl: 'https://...',
    playStoreUrl: 'https://...',
    legalPages: ['privacy-policy', 'terms-of-service', ...],
  },
];
```

2. Add translations in `src/i18n/locales/en.json` and `vi.json` under `products` and `legal` keys.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://insight.ai.vn
```

## Deployment

The site is automatically deployed via GitHub Actions when pushing to the `main` branch.

### Manual Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Start with PM2:
   ```bash
   pm2 start npm --name "insight-landing" -- start
   ```

## License

Copyright © 2025 Insight AI. All rights reserved.
