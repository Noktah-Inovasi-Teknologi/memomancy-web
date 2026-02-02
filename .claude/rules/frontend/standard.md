# Memomancy Web - Coding Standards

## Component Structure

### File Organization
Components follow a strict three-section order:

```vue
<script lang="ts" setup>
// 1. Imports
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
/* Scoped styles (when necessary) */
</style>
```

### Props Definition Pattern
```ts
interface Props {
  project: Project;
  thumbnailUrl: string;
  isActive?: boolean;
}

const props = defineProps<Props>();
```

### Emits Definition Pattern
```ts
const emit = defineEmits<{
  click: [project: Project];
  update: [value: string];
}>();
```

---

## CSS Token Usage

### Typography Classes
Always use the project's typography tokens:

```html
<!-- Headings (Playfair Display) -->
<h1 class="font-playfair text-heading-1">...</h1>
<h2 class="font-playfair text-heading-2">...</h2>
<h3 class="font-playfair text-heading-3">...</h3>

<!-- Body text (Lato) -->
<p class="font-lato text-normal-3">...</p>
<span class="font-lato text-normal-4">...</span>
```

### Spacing Classes
Use uniform spacing tokens:

```html
<!-- Padding -->
<div class="p-uniform-3">...</div>
<section class="px-uniform-5 py-uniform-4">...</section>

<!-- Margin -->
<div class="mt-uniform-4 mb-uniform-3">...</div>

<!-- Gap -->
<div class="flex gap-uniform-4">...</div>
```

### Icon Sizing
```html
<Icon name="solar:arrow-left-linear" class="text-icon-size-4" />
```

---

## Responsive Design Pattern

### Standard Breakpoint Progression
Use mobile-first with this consistent pattern:

```html
<element class="
  text-heading-5          <!-- xs (default) -->
  sm:text-heading-4       <!-- sm: 640px -->
  md:text-heading-4       <!-- md: 768px -->
  lg:text-heading-5       <!-- lg: 1024px -->
  xl:text-heading-5       <!-- xl: 1280px -->
">
```

### Container Width Pattern
```html
<div class="xl:max-w-6xl xl:mx-auto">
  <!-- Content constrained at xl breakpoint -->
</div>
```

### Padding Progression Pattern
```html
<section class="
  p-uniform-5
  sm:p-uniform-4
  md:p-uniform-3
  lg:p-uniform-2
">
```

### Gap Progression Pattern
```html
<div class="
  gap-uniform-4
  sm:gap-uniform-3
  md:gap-uniform-3
  lg:gap-uniform-2
  xl:gap-uniform-2
">
```

---

## Color Usage

### Brand Colors
```html
<!-- Backgrounds -->
<div class="bg-charcoal">Dark sections</div>
<div class="bg-offwhite">Light sections</div>

<!-- Text -->
<p class="text-charcoal">Primary text on light</p>
<p class="text-offwhite">Text on dark</p>
<span class="text-gold">Accent/CTA text</span>

<!-- Opacity variants -->
<p class="text-charcoal/70">Muted text</p>
<div class="bg-taupe/20">Subtle hover state</div>
```

### Focus States
```html
<!-- Gold outline for keyboard focus -->
<button class="focus-visible:outline-2 focus-visible:outline-gold">
```

---

## Section Structure

### Standard Section Pattern
```vue
<div class="bg-offwhite">
  <section
    class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto"
    id="section-name"
    data-parallax
  >
    <!-- Section marker -->
    <header class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase">
      ■ SECTION TITLE
    </header>

    <!-- Content area -->
    <div class="flex flex-col md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <!-- Content -->
    </div>

    <!-- Section identifier -->
    <footer class="text-end text-charcoal text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5">
      M✦ - 01
    </footer>
  </section>
</div>
```

### Hero Section Pattern
```vue
<div class="bg-offwhite px-uniform-5 pb-uniform-5 pt-uniform-3 sm:px-uniform-4 sm:pb-uniform-4 sm:pt-uniform-2 md:px-uniform-3 md:pb-uniform-3 md:pt-uniform-2 lg:px-uniform-2 lg:pb-uniform-2 lg:pt-uniform-1" id="hero">
  <div class="aspect-9/16 md:aspect-video overflow-hidden relative xl:max-w-6xl xl:mx-auto" data-parallax-media>
    <!-- Hero media content -->
  </div>
</div>
```

---

## Interactive Elements

### Button Pattern (Text-based)
```html
<button class="
  text-charcoal
  bg-transparent
  hover:bg-transparent
  active:text-gold
  min-w-11 min-h-11
  flex items-center justify-center
">
  <Icon name="solar:arrow-left-linear" class="text-icon-size-4" />
</button>
```

### Pagination Dots Pattern
```html
<button
  :class="[
    'w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 border border-charcoal transition-colors',
    isActive ? 'bg-charcoal' : 'bg-transparent hover:bg-charcoal/30 active:bg-charcoal/50'
  ]"
/>
```

### CTA Button Pattern
```vue
<AnimatedButton
  to="/destination"
  classes="self-center md:self-start text-gold font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 py-uniform-6"
>
  Button Text
</AnimatedButton>
```

---

## Accordion/Expandable Pattern

```vue
<div v-for="(item, index) in items" :key="item.title" class="border-b border-charcoal">
  <button
    @click="toggleItem(index)"
    class="w-full flex justify-between items-center font-playfair text-heading-4 sm:text-heading-3 md:text-heading-3 lg:text-heading-4 xl:text-heading-4 text-charcoal bg-transparent p-0 pb-uniform-5 md:pb-uniform-4 lg:pb-uniform-3 xl:pb-uniform-3 gap-uniform-5"
  >
    <span class="font-playfair text-left">{{ item.title }}</span>
    <Icon
      :name="openIndex === index ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'"
      class="text-charcoal text-icon-size-4 sm:text-icon-size-4 md:text-icon-size-5 lg:text-icon-size-5 xl:text-icon-size-5 shrink-0"
    />
  </button>
  <div v-if="openIndex === index" class="pb-uniform-5 md:pb-uniform-4 lg:pb-uniform-3 xl:pb-uniform-3">
    <p class="text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 font-lato">
      {{ item.description }}
    </p>
  </div>
</div>
```

---

## Media Loading Pattern

### Video with Skeleton
```vue
<script setup>
const loaded = ref(false);
</script>

<template>
  <div class="relative overflow-hidden">
    <USkeleton v-if="!loaded" class="absolute inset-0 w-full h-full rounded-none" />
    <video
      :src="videoUrl"
      class="w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      @loadeddata="loaded = true"
    />
  </div>
</template>
```

### Image with Skeleton
```vue
<div class="relative overflow-hidden">
  <USkeleton v-if="!loaded" class="absolute inset-0 w-full h-full rounded-none" />
  <img
    :src="imageUrl"
    :alt="altText"
    class="w-full h-full object-cover"
    loading="lazy"
    @load="loaded = true"
  />
</div>
```

---

## Grid Layouts

### Gallery Grid Pattern
```html
<div class="
  grid
  grid-cols-2
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
  gap-uniform-5
  sm:gap-uniform-4
  md:gap-uniform-4
  lg:gap-uniform-3
  xl:gap-uniform-3
">
  <!-- Grid items -->
</div>
```

### Footer Columns Pattern
```html
<div class="
  flex flex-col
  sm:flex-row flex-wrap
  md:flex-nowrap
  gap-uniform-4
  sm:gap-uniform-3
  md:gap-uniform-3
  lg:gap-uniform-2
  xl:gap-uniform-2
">
  <div class="flex-1 min-w-0 sm:min-w-[45%] md:min-w-0">
    <!-- Column content -->
  </div>
</div>
```

---

## Nuxt UI Component Customization

### UAccordion Styling
```vue
<UAccordion
  :items="items"
  type="single"
  collapsible
  :ui="{
    item: 'border-b border-charcoal',
    trigger: 'font-playfair text-heading-4 text-charcoal bg-transparent rounded-none py-uniform-5 hover:bg-transparent focus:outline-none',
    content: 'pb-uniform-5',
    body: 'text-normal-4 font-lato text-charcoal'
  }"
/>
```

### UDrawer Styling
```vue
<UDrawer
  v-model:open="isOpen"
  direction="bottom"
  :handle="true"
  :ui="{
    overlay: 'bg-charcoal/80',
    content: 'bg-offwhite rounded-none',
    handle: 'bg-charcoal/30',
    body: 'p-0'
  }"
>
```

---

## Animation Classes

### Underline Animation (CSS)
```css
.border-line-animate::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transition: width var(--transition-normal) ease-out;
}

.border-line-animate:hover::after {
  animation: borderDisappearReappear 0.6s ease-in-out;
}
```

### Nav Link Hover Underline
```css
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width var(--transition-normal) ease-out;
}

.nav-link:hover::after {
  width: 100%;
}
```

---

## Naming Conventions

### Component Files
- PascalCase: `AnimatedButton.vue`, `GalleryProjectCard.vue`
- Group in folders: `Gallery/GalleryModal.vue`

### Composables
- camelCase with `use` prefix: `useMedia.ts`, `useParallax.ts`

### CSS Custom Properties
- Typography: `--text-heading-*`, `--text-normal-*`
- Spacing: `--spacing-uniform-*`
- Padding: `--padding-*`
- Icons: `--icon-size-*`
- Colors: `--color-*`
- Transitions: `--transition-*`

### Data Attributes
- Parallax content: `data-parallax`
- Parallax media: `data-parallax-media`

---

## Import Patterns

### Auto-imports (No explicit import needed)
- Vue reactivity: `ref`, `computed`, `watch`, `onMounted`
- Nuxt composables: `useRoute`, `navigateTo`, `$fetch`
- Project composables: `useMedia`, `useParallax`, `useGalleryProjects`
- Components in `app/components/` directory

### Explicit imports required
```ts
import type { Project, Media } from "~/types";
```

---

## Accessibility Standards

### Touch Targets
Minimum 44x44px for interactive elements:
```html
<button class="min-w-11 min-h-11 flex items-center justify-center">
```

### ARIA Labels
```html
<button aria-label="Open navigation menu">
<button aria-label="Previous page" :disabled="currentPage === 0">
<button :aria-label="`Go to page ${page}`">
```

### Focus Visibility
```css
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

---

## Anti-Patterns to Avoid

### Don't
```html
<!-- Don't use arbitrary values -->
<div class="p-4 m-6">

<!-- Don't use rounded corners -->
<div class="rounded-lg">

<!-- Don't use shadows -->
<div class="shadow-md">

<!-- Don't use solid button backgrounds -->
<button class="bg-gold text-white">
```

### Do
```html
<!-- Use spacing tokens -->
<div class="p-uniform-4 m-uniform-3">

<!-- Keep sharp edges -->
<div class="rounded-none">

<!-- No shadows, flat design -->
<div class="">

<!-- Text-based buttons with underlines -->
<AnimatedButton to="/link" classes="text-gold">
```