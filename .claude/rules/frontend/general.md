# Frontend Development Standards - Memomancy Web

## Tech Stack
- **Framework**: Nuxt 4 with Vue 3 Composition API
- **UI Library**: Nuxt UI 4.3.0 (use Nuxt UI components over custom implementations)
- **Styling**: TailwindCSS 4 with custom `@theme` tokens
- **State Management**: Pinia stores for shared state
- **TypeScript**: Required for type safety

## Component Standards

### File Naming
- Use PascalCase for component files: `AnimatedButton.vue`
- Place in `/app/components/` directory
- Group related components in subdirectories: `Gallery/GalleryProjectCard.vue`

### Component Structure
```vue
<script lang="ts" setup>
// 1. Type imports
// 2. Interface definitions
// 3. Props & Emits
// 4. Composables
// 5. Reactive state
// 6. Computed properties
// 7. Functions
// 8. Lifecycle hooks
</script>

<template>
  <!-- Template content -->
</template>

<style scoped>
/* Scoped styles when necessary */
</style>
```

### Props & Emits
```ts
interface Props {
  project: Project;
  isActive?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [project: Project];
}>();
```

## Styling Guidelines

### TailwindCSS 4 Usage
- Use custom theme tokens defined in `main.css`
- Typography: `text-heading-*`, `text-normal-*`
- Spacing: `p-uniform-*`, `gap-uniform-*`, `m-uniform-*`
- Icons: `text-icon-size-*`
- Colors: `text-charcoal`, `bg-offwhite`, `text-gold`

### Responsive Design
Mobile-first with consistent breakpoint progression:
```html
<div class="
  text-heading-5
  sm:text-heading-4
  md:text-heading-4
  lg:text-heading-5
  xl:text-heading-5
">
```

### Color Mode
- Dark mode is disabled (`colorMode: false` in config)
- Use brand colors: charcoal, offwhite, gold, taupe
- Light theme only with warm neutrals

## Nuxt UI Integration

### Available Components
Use Nuxt UI components when available:
- `UDrawer` - Mobile navigation drawer
- `USeparator` - Section dividers
- `USkeleton` - Loading placeholders
- `UAccordion` - Expandable content

### Component Customization
Use the `:ui` prop for styling:
```vue
<UAccordion
  :items="items"
  :ui="{
    item: 'border-b border-charcoal',
    trigger: 'font-playfair text-heading-4 text-charcoal bg-transparent rounded-none',
    content: 'pb-uniform-5',
    body: 'text-normal-4 font-lato text-charcoal'
  }"
/>
```

## State Management

### Composables (Preferred)
Use composables for:
- Reusable logic: `useMedia()`, `useParallax()`
- Data management: `useGalleryProjects()`
- Component-specific reactive state

### Pinia Stores
Use for:
- Global application state
- State that persists across route changes
- Complex state with actions/getters

## Routing & Navigation

### Page Components
- Place in `/app/pages/` directory
- Use file-based routing convention
- Keep pages lightweight, delegate to composables/components

### Navigation
```vue
<!-- Internal links -->
<NuxtLink to="/gallery">Gallery</NuxtLink>

<!-- Animated links -->
<AnimatedButton to="/gallery" classes="text-gold">
  View Gallery
</AnimatedButton>
```

## Authentication

### Route Protection
| Route | Access |
|-------|--------|
| `/` | Public |
| `/calculator` | Public (auth middleware) |
| `/gallery` | Public |
| `/reservation` | Public (auth middleware) |
| `/dashboard` | Requires permission |

### Kinde Integration
Authentication handled via `@nuxtjs/kinde` module with route rules in `nuxt.config.ts`.

## Performance

### Media Loading
Always show skeleton while loading:
```vue
<USkeleton v-if="!loaded" class="absolute inset-0 w-full h-full rounded-none" />
<video @loadeddata="loaded = true" ... />
```

### Image Optimization
- Use lazy loading: `loading="lazy"`
- Provide appropriate `preload` hints
- Use `object-cover` for consistent sizing

### Parallax
Use `useParallax()` composable with data attributes:
```vue
<section data-parallax>Content</section>
<div data-parallax-media>Media</div>
```

## Accessibility

### Touch Targets
Minimum 44x44px:
```html
<button class="min-w-11 min-h-11 flex items-center justify-center">
```

### ARIA Labels
```html
<button aria-label="Previous page">
<button :aria-label="`Go to page ${page}`">
```

### Focus States
Gold outline for keyboard focus (defined in `main.css`):
```css
button:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

## Code Quality

### TypeScript
- Define interfaces for props, emits, and data structures
- Import types from `~/types`
- Avoid `any` type

### Auto-imports
These are auto-imported (no explicit import needed):
- Vue: `ref`, `computed`, `watch`, `onMounted`
- Nuxt: `useRoute`, `navigateTo`, `$fetch`
- Project composables: `useMedia`, `useParallax`
- Components in `/app/components/`

## File Organization

### Current Structure
```
/app/components/
  AppHeader.vue
  AppFooter.vue
  SectionLayout.vue
  AnimatedButton.vue
  /Gallery/
    GalleryProjectCard.vue
    GalleryModal.vue
    GalleryItem.vue

/app/composables/
  useMedia.ts
  useParallax.ts
  useGalleryProjects.ts
  useR2.ts

/app/data/
  commonInformations.ts
  eastJavaRegions.ts

/app/types/
  index.ts
```

## Anti-Patterns to Avoid

- Using PrimeVue components (project uses Nuxt UI)
- Mixing Options API with Composition API
- Arbitrary spacing/sizing values (use tokens)
- Rounded corners (use `rounded-none`)
- Box shadows (flat design)
- Solid button backgrounds (use text-based buttons)
- Direct DOM manipulation (use template refs)
- Hardcoded API URLs (use runtime config)

## Naming Conventions

### Variables & Functions
- camelCase: `isActive`, `handleClick`
- Boolean prefix: `is`, `has`, `should`
- Event handlers: `on*`, `handle*`

### Files
- Components: PascalCase
- Composables: camelCase with `use` prefix
- Data files: camelCase
- Pages: lowercase with hyphens

## Resources

- [Nuxt 4 Documentation](https://nuxt.com)
- [Nuxt UI Documentation](https://ui.nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [TailwindCSS v4 Documentation](https://tailwindcss.com)
- [Pinia Documentation](https://pinia.vuejs.org)
