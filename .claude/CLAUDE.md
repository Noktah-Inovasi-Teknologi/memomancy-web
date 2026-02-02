# Memomancy Web - Development Guide

## Project Overview
Nuxt 4 application for a premium photography & videography brand. Features Nuxt UI components, Kinde authentication, Cloudflare R2 media storage, and Drizzle ORM database.

## Tech Stack
- **Framework**: Nuxt 4.2.1
- **UI**: Nuxt UI 4.3.0, TailwindCSS 4
- **Auth**: Kinde (@nuxtjs/kinde 0.3.0)
- **Database**: Drizzle ORM with SQLite (Cloudflare D1)
- **Media Storage**: Cloudflare R2
- **State**: Pinia 3.0.2
- **Icons**: Nuxt Icon (Solar icon set)
- **Package Manager**: pnpm

## Development Commands
```bash
pnpm dev          # Start development server
pnpm build        # Build for production (Cloudflare)
pnpm generate     # Generate static site
pnpm preview      # Preview production build
pnpm db:generate  # Generate database migrations
```

## Project Structure
```
/app/
  /assets/css/      # CSS files (main.css with Tailwind v4 @theme)
  /components/      # Vue components
    /Gallery/       # Gallery-related components
  /composables/     # Reusable composition functions
  /data/            # Static data files
  /pages/           # Route pages
  /types/           # TypeScript interfaces
/server/
  /api/             # API routes
  /database/        # Drizzle schema and migrations
  /utils/           # Server utilities
/public/            # Static assets (dev media files)
```

## Key Components
- `AppHeader` - Fixed navigation with mix-blend-difference
- `AppFooter` - Site footer
- `SectionLayout` - Standardized section wrapper
- `AnimatedButton` - Text link with underline animation
- `GalleryProjectCard` - Project thumbnail card
- `GalleryModal` - Project detail modal

## Key Composables
- `useMedia()` - Media URL generation (R2/local)
- `useParallax()` - Parallax scrolling effects
- `useGalleryProjects()` - Gallery data and pagination
- `useR2()` - R2 bucket operations

## CSS Architecture
Uses TailwindCSS 4 with custom theme tokens defined in `main.css`:
- Typography: `--text-heading-*`, `--text-normal-*`
- Spacing: `--spacing-uniform-*`, `--padding-*`
- Colors: `--color-charcoal`, `--color-offwhite`, `--color-gold`, `--color-taupe`
- Icons: `--icon-size-*`
- All values use `clamp()` for fluid responsive scaling (2x multiplier)

## Environment Variables
```env
# Kinde Auth
NUXT_KINDE_AUTH_DOMAIN=
NUXT_KINDE_CLIENT_ID=
NUXT_KINDE_CLIENT_SECRET=
NUXT_KINDE_REDIRECT_URL=
NUXT_KINDE_LOGOUT_REDIRECT_URL=
NUXT_KINDE_POST_LOGIN_REDIRECT_URL=
NUXT_KINDE_PASSWORD=

# Admin
MEMOMANCY_ADMIN_LIST=
```

## Route Access
| Route | Access |
|-------|--------|
| `/` | Public |
| `/calculator` | Public (with auth middleware) |
| `/gallery` | Public |
| `/reservation` | Public (with auth middleware) |
| `/dashboard` | Requires dashboard permission |

## Viewport Breakpoints
```ts
xs: 320    // Extra small
sm: 640    // Small
md: 768    // Medium
mtl: 960   // Medium-to-large
lg: 1024   // Large
xl: 1280   // Extra large
2xl: 1536  // 2X large
```

## Deployment
- **Platform**: Cloudflare Pages
- **Preset**: `cloudflare-module`
- **Media**: Cloudflare R2 bucket
- **Database**: Cloudflare D1 (SQLite)

## Documentation Files
- `.claude/rules/frontend/general.md` - Frontend development standards
- `.claude/rules/frontend/theme.md` - Brand and theme specifications
- `.claude/rules/frontend/reference.md` - Component and API reference
- `.claude/rules/frontend/standard.md` - Coding patterns and standards
