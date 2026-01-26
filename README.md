# Insight AI Landing Site

Landing site for Insight AI products at [insight.ai.vn](https://insight.ai.vn).

## Features

- 🌐 **Multi-language Support** - English and Vietnamese (i18n with next-intl)
- 📱 **Multi-product Support** - Dynamic routes for each product (WiseNest, etc.)
- 📄 **Legal Pages** - Privacy Policy, Terms of Service, Permissions, Subscription Terms, Disclaimer
- 🎨 **Modern UI** - Tailwind CSS with custom brand colors
- 🔍 **SEO Optimized** - Sitemap, robots.txt, structured data
- 🚀 **Fast Performance** - Next.js 14 with App Router
- 🐳 **Docker Ready** - Multi-stage Dockerfile with optimized production build
- ⚙️ **Centralized Config** - Dynamic content injection with placeholders

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Icons**: Lucide React
- **TypeScript**: Strict mode
- **Deployment**: Docker + GitHub Actions

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

### Production (Docker)

```bash
# Build image
docker build -t landing-site -f docker/Dockerfile .

# Run container
docker run -p 3100:3000 landing-site
```

## Project Structure

```
├── docker/
│   ├── Dockerfile              # Multi-stage production build
│   └── nginx/
│       └── sites/
│           └── landing.conf    # Nginx reverse proxy config
├── public/                     # Static assets (favicon, images)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── [product]/
│   │   │   │   ├── [legal]/    # Legal pages (dynamic)
│   │   │   │   └── page.tsx    # Product page
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx        # Home page
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── language-switcher.tsx
│   │   └── ui/
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── request.ts          # Content injection here
│   │   └── locales/
│   │       ├── en.json         # Uses {{placeholders}}
│   │       └── vi.json         # Uses {{placeholders}}
│   ├── lib/
│   │   ├── company.ts          # Centralized company data
│   │   ├── content.ts          # Placeholder injection utilities
│   │   ├── products.ts         # Product configuration
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
└── .github/
    └── workflows/
        └── deploy.yml          # CI/CD pipeline
```

## Centralized Content Management

All company data (emails, addresses, legal info) is centralized in `src/lib/company.ts`. Locale files use placeholders that get replaced at runtime.

### Available Placeholders

```
{{company.name}}         → Insight AI VN
{{company.domain}}       → insight.ai.vn
{{email.support}}        → support@insight.ai.vn
{{email.privacy}}        → privacy@insight.ai.vn
{{email.legal}}          → legal@insight.ai.vn
{{email.billing}}        → billing@insight.ai.vn
{{address.full}}         → Ho Chi Minh City, Vietnam
{{address.fullVi}}       → Thành phố Hồ Chí Minh, Việt Nam
{{legal.minimumAge}}     → 13
{{legal.privacyResponseDays}} → 30
{{appStore.wisenest.ios}}     → App Store URL
{{appStore.wisenest.android}} → Play Store URL
```

### Usage in Locale Files

```json
{
  "contact": {
    "email": "Email us at {{email.support}}"
  }
}
```

### Adding New Placeholders

1. Add the value in `src/lib/company.ts`
2. Export it in the `placeholders` object in `src/lib/content.ts`
3. Use `{{key}}` syntax in locale files

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

3. Add app store URLs in `src/lib/company.ts`:

```typescript
export const appStores = {
  newproduct: {
    ios: 'https://apps.apple.com/...',
    android: 'https://play.google.com/...',
  },
};
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://insight.ai.vn
```

## Deployment

### Automated (CI/CD)

Push to `master` branch triggers automatic deployment:

1. **Build & Push**: Docker image built and pushed to GHCR
2. **Deploy**: SSH to server, pull image, run with docker-compose
3. **Verify**: Health check on https://insight.ai.vn

Required GitHub Secrets:
- `SERVER_HOST` - Server IP/hostname
- `SERVER_USER` - SSH username
- `SERVER_PASSWORD` - SSH password

### Manual Deployment

```bash
# On server
cd /opt/insight/landing
docker compose pull
docker compose up -d
```

### Nginx Configuration

The site runs on port 3100 internally. Nginx config is at `docker/nginx/sites/landing.conf`:

```nginx
server {
    listen 80;
    server_name insight.ai.vn;
    
    location / {
        proxy_pass http://127.0.0.1:3100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## License

Copyright © 2026 Insight AI VN. All rights reserved.
