# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build production version
npm run start        # Start production server
npm run lint         # Run ESLint checks

# Alternative package managers (as noted in README)
pnpm dev             # Preferred package manager for development
```

## Architecture Overview

This is a **Next.js 14 multilingual one-page website** for saimor.world using the App Router with TypeScript.

### Key Architecture Patterns

**Internationalization (i18n):**
- Uses `next-intl` middleware for DE/EN localization
- Routes structure: `/de` (default) and `/en`
- Middleware automatically redirects root `/` to `/de`
- Localized page structures in `app/de/` and `app/en/` directories

**Security Headers:**
- Custom middleware sets comprehensive CSP headers
- Includes Cal.com integration permissions for booking functionality
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

**Component Structure:**
- `components/`: Reusable UI components (Hero, Navbar, Footer, Sections, Logo)
- App Router pages in locale-specific directories
- Single API route at `app/api/contact/route.ts` (email functionality not yet connected)

**Styling & Animation:**
- TailwindCSS for styling with Navy/Gold theme
- Framer Motion for animations
- Typography-focused design

### Tech Stack
- Next.js 14 (App Router, TypeScript)
- next-intl (internationalization middleware)
- TailwindCSS (styling)
- Framer Motion (animations)
- Lucide React (icons)

### Development Notes
- Default locale is German (`de`)
- Server actions are configured with `allowedOrigins: ["*"]` in next.config.js
- Contact form exists but email sending is not yet implemented
- SEO basics included: `sitemap.ts`, `robots.ts`