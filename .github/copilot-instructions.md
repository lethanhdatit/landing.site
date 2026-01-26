# Insight AI Landing Site

## Project Overview
Multi-product landing site for Insight AI (insight.ai.vn). Serves as the central hub for product information, legal documents, and marketing content.

## Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **i18n**: next-intl (Vietnamese & English)
- **Deployment**: Docker + GitHub Actions → GHCR → SSH Deploy

## Project Structure
```
├── docker/
│   ├── Dockerfile              # Multi-stage production build (port 3000 internal)
│   └── nginx/sites/            # Nginx reverse proxy configs
├── public/                     # Static assets (must exist for Docker build)
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── page.tsx                    # Home page
│   │       ├── layout.tsx                  # Root layout with i18n
│   │       ├── about/
│   │       ├── contact/
│   │       └── [product]/
│   │           ├── page.tsx                # Product landing
│   │           └── [legal]/page.tsx        # Dynamic legal pages
│   ├── components/
│   │   ├── ui/                             # Reusable UI components
│   │   └── layout/                         # Header, Footer, LanguageSwitcher
│   ├── lib/
│   │   ├── company.ts                      # ⭐ Centralized company data
│   │   ├── content.ts                      # ⭐ Placeholder injection utilities
│   │   ├── products.ts                     # Product configurations
│   │   └── utils.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── request.ts                      # Injects placeholders at runtime
│   │   └── locales/
│   │       ├── en.json                     # Uses {{placeholder}} syntax
│   │       └── vi.json                     # Uses {{placeholder}} syntax
│   └── styles/
│       └── globals.css
└── .github/
    └── workflows/
        └── deploy.yml                      # CI/CD: Build → GHCR → SSH Deploy
```

## Centralized Content Management

### Company Data (src/lib/company.ts)
All company info is centralized here:
- `company` - Name, tagline, domain, foundedYear
- `emails` - support, privacy, legal, billing, press, careers
- `address` - English and Vietnamese versions
- `legal` - Response times, retention periods, age limits
- `socials` - Facebook, Twitter, LinkedIn, etc.
- `appStores` - iOS/Android URLs per product

### Placeholder Injection (src/lib/content.ts)
Locale files use `{{placeholder}}` syntax that gets replaced at runtime:
```json
{
  "contact": {
    "email": "Email us at {{email.support}}"
  }
}
```

Available placeholders:
- `{{company.name}}`, `{{company.domain}}`, `{{company.website}}`
- `{{email.support}}`, `{{email.privacy}}`, `{{email.legal}}`, `{{email.billing}}`
- `{{address.full}}`, `{{address.fullVi}}`
- `{{legal.minimumAge}}`, `{{legal.privacyResponseDays}}`
- `{{appStore.wisenest.ios}}`, `{{appStore.wisenest.android}}`

### Adding New Placeholders
1. Add value in `company.ts`
2. Export in `placeholders` object in `content.ts`
3. Use `{{key}}` in locale files

## Products
- **wisenest**: Smart food & household management app
- Future: Finance apps, lifestyle apps, mini games

## Coding Guidelines
- Use TypeScript strict mode
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling (no inline styles)
- Keep components small and focused
- Use next-intl for all text content - NEVER hardcode text
- Use placeholders for emails, addresses, legal info - NEVER hardcode
- Optimize for SEO with proper metadata
- Mobile-first responsive design

## Legal Pages Requirements
Each product needs these legal pages (all use {{placeholder}} syntax):
1. **Privacy Policy** - Data collection, usage, third-party sharing
2. **Terms of Service** - User agreements, limitations
3. **Permissions** - Device permissions explanation
4. **Subscription Terms** - Premium features, billing, cancellation
5. **Disclaimer** - Liability limitations

Legal page styling:
- Section titles: `font-display font-semibold text-lg`
- Content: `text-base leading-relaxed text-neutral-600`

## SEO Requirements
- Dynamic metadata per page
- Structured data (JSON-LD)
- Sitemap.xml generation
- robots.txt
- Open Graph & Twitter cards

## Deployment

### CI/CD Pipeline (deploy.yml)
Triggers on push to `master`:
1. Build: npm ci → type-check → lint
2. Docker: Build multi-stage image → Push to GHCR
3. Deploy: SSH to server → docker compose up
4. Verify: Health check on https://insight.ai.vn

### Docker
- Container port: 3000 (internal)
- Host port: 3100 (mapped)
- Image: ghcr.io/lethanhdatit/landing.site:latest

### Server
- Location: /opt/insight/landing
- Nginx reverse proxy: insight.ai.vn → localhost:3100

### Required GitHub Secrets
- `SERVER_HOST` - Server IP
- `SERVER_USER` - SSH username
- `SERVER_PASSWORD` - SSH password

## Important Notes
- `public/` folder MUST exist (even empty with .gitkeep) for Docker build
- Don't use heredoc in SSH scripts (indentation issues) - use echo instead
- Always test `npm run lint` before pushing
