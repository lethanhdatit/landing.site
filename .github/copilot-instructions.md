# Insight AI Landing Site

## Project Overview
Multi-product landing site for Insight AI (insight.ai.vn). Serves as the central hub for product information, legal documents, and marketing content.

## Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **i18n**: next-intl (Vietnamese & English)
- **Deployment**: Vercel / Docker

## Project Structure
```
src/
├── app/
│   └── [locale]/
│       ├── page.tsx                    # Home page
│       ├── layout.tsx                  # Root layout with i18n
│       ├── [product]/
│       │   ├── page.tsx                # Product landing
│       │   ├── privacy-policy/
│       │   ├── terms-of-service/
│       │   ├── permissions/
│       │   ├── subscription-terms/
│       │   └── disclaimer/
│       └── about/
├── components/
│   ├── ui/                             # Reusable UI components
│   ├── layout/                         # Header, Footer, Navigation
│   └── sections/                       # Page sections
├── lib/
│   ├── products.ts                     # Product configurations
│   └── utils.ts                        # Utilities
├── i18n/
│   ├── locales/
│   │   ├── en.json
│   │   └── vi.json
│   └── config.ts
└── styles/
    └── globals.css
```

## Products
- **wisenest**: Smart food & household management app
- Future: Finance apps, lifestyle apps, mini games

## Coding Guidelines
- Use TypeScript strict mode
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling (no inline styles)
- Keep components small and focused
- Use next-intl for all text content
- Optimize for SEO with proper metadata
- Mobile-first responsive design

## Legal Pages Requirements
Each product needs these legal pages:
1. Privacy Policy - Data collection, usage, third-party sharing
2. Terms of Service - User agreements, limitations
3. Permissions - Device permissions explanation (camera, notifications, etc.)
4. Subscription Terms - Premium features, billing, cancellation
5. Disclaimer - Liability limitations

## SEO Requirements
- Dynamic metadata per page
- Structured data (JSON-LD)
- Sitemap.xml generation
- robots.txt
- Open Graph & Twitter cards
