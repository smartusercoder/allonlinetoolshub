# All Online Tools Hub - Deployment Guide

## Quick Deploy

### Netlify (Recommended)
1. Upload the zip file or connect your Git repository
2. Build settings are automatically configured via `netlify.toml`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Node version: 20

### Cloudflare Pages
1. Upload the zip file or connect your Git repository
2. Build settings are automatically configured via `wrangler.toml`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Node version: 20

## Pre-deployment Checklist

- [x] TypeScript errors fixed
- [x] Build successful
- [x] SPA routing configured (_redirects, netlify.toml)
- [x] Security headers configured (_headers)
- [x] Robots.txt included
- [x] Sitemap generated (auto-generated sitemaps for 1557 tools)
- [x] Node version specified (>=18.0.0)

## Environment Variables

No required environment variables for basic deployment.

## Build Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type check
npm run typecheck
```

## Project Structure

```
├── public/           # Static assets
│   ├── _redirects   # Netlify SPA routing
│   ├── _headers     # Security headers
│   ├── robots.txt   # Search engine directives
│   └── sitemap*.xml # Generated sitemaps
├── src/             # Source code
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── data/        # Tool data and categories
│   └── types/       # TypeScript types
├── netlify.toml     # Netlify configuration
├── wrangler.toml    # Cloudflare configuration
└── package.json     # Dependencies and scripts
```

## Features

- 1557+ free online tools
- 17 categories
- Dark/Light mode
- Mobile responsive
- SEO optimized with sitemaps
- No backend required (runs in browser)

## Post-deployment

1. Verify all routes work (SPA routing)
2. Check dark mode toggle
3. Test search functionality
4. Verify sitemap at /sitemap.xml
5. Submit sitemap to Google Search Console

## Support

For issues, check that:
1. Node version is 18+
2. npm install completed successfully
3. Build completes without errors
