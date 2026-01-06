# Memomancy Web - Development Guide

## Project Overview
Nuxt 4 application with PrimeVue UI components, Kinde authentication, and NuxtHub database/blob storage.

## Tech Stack
- **Framework**: Nuxt 4
- **UI**: PrimeVue 4.3.7, TailwindCSS
- **Auth**: Kinde (@nuxtjs/kinde)
- **Database**: Drizzle ORM with NuxtHub
- **State**: Pinia
- **Package Manager**: pnpm

## Development Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build
- `pnpm db:generate` - Generate database migrations

## Project Structure
- `/app/` - Main application directory (deleted from git)
- `/server/` - Server-side API routes
- `/public/` - Static assets
- Custom PrimeVue theme via composables

## Key Features
- Authentication with Kinde (dashboard requires permissions)
- Route-based access control
- Custom viewport breakpoints
- Color mode support (system/light/dark)
- Database integration with Drizzle ORM

## Environment Variables
Kinde auth requires:
- `NUXT_KINDE_AUTH_DOMAIN`
- `NUXT_KINDE_CLIENT_ID`
- `NUXT_KINDE_CLIENT_SECRET` 
- `NUXT_KINDE_REDIRECT_URL`
- `NUXT_KINDE_LOGOUT_REDIRECT_URL`
- `NUXT_KINDE_POST_LOGIN_REDIRECT_URL`
- `NUXT_KINDE_PASSWORD`

## Route Access
- `/` - Public
- `/calculator` - Public  
- `/gallery` - Public
- `/reservation` - Public
- `/dashboard` - Requires dashboard permission
- All others - Requires authentication