# Memomancy Theme Standards

## Brand Identity

### Core Concept
Memomancy is a premium photography and videography brand focused on narrative-first storytelling and visual legacy. The design language reflects sophistication, timelessness, and artistic excellence.

### Brand Voice
- Premium but approachable
- Narrative-driven and story-focused
- Professional yet flexible
- Excellence-oriented without being rigid
- Artistic with technical precision

### Tagline
"Where moments become legacy."

---

## Color System

### Brand Colors (CSS Variables)
```css
--color-charcoal: #121417;  /* Deep dark - hero backgrounds, text on light */
--color-offwhite: #F5F3EE;  /* Warm light - main backgrounds */
--color-taupe: #C8B89A;     /* Supporting neutral - subtle elements */
--color-gold: #B89C5D;      /* Accent - CTAs, emphasis, focus states */
```

### Tailwind Usage
```html
<!-- Backgrounds -->
<div class="bg-charcoal">Dark sections</div>
<div class="bg-offwhite">Light sections</div>

<!-- Text -->
<p class="text-charcoal">Primary text</p>
<p class="text-offwhite">Text on dark</p>
<span class="text-gold">Accent text</span>
<span class="text-charcoal/70">Muted text</span>
```

### Color Mode
- Dark mode is **disabled** in this project
- Light theme only with warm neutrals
- `colorMode: false` in Nuxt config

---

## Typography System

### Font Families
```css
--font-playfair: Playfair Display, serif;
--font-lato: Lato, sans-serif;
```

| Font | Purpose | Weight |
|------|---------|--------|
| **Playfair Display** | Headings, brand name, section markers, navigation | Medium (500) |
| **Lato** | Body text, descriptions, UI elements | Regular (400) |

### Heading Scale (2.5x dramatic scaling)
```css
/* Viewport range: 375px - 1440px */
--text-heading-1: clamp(3rem, calc(6.76vw + 1.416rem), 7.5rem);    /* 48px → 120px */
--text-heading-2: clamp(1.5rem, calc(3.38vw + 0.708rem), 3.75rem); /* 24px → 60px */
--text-heading-3: clamp(1rem, calc(2.25vw + 0.473rem), 2.5rem);    /* 16px → 40px */
--text-heading-4: clamp(0.75rem, calc(1.13vw + 0.486rem), 1.5rem); /* 12px → 24px */
--text-heading-5: clamp(0.5rem, calc(0.75vw + 0.324rem), 1rem);    /* 8px → 16px */
--text-heading-6: clamp(0.25rem, calc(0.376vw + 0.162rem), 0.5rem);/* 4px → 8px */
--text-heading-7: clamp(0.125rem, calc(0.188vw + 0.081rem), 0.25rem);/* 2px → 4px */
```

### Normal Text Scale (2x for subheadings, 1.5x for body)
```css
--text-normal-1: clamp(1.5rem, calc(2.25vw + 0.972rem), 3rem);      /* 24px → 48px */
--text-normal-2: clamp(1rem, calc(1.5vw + 0.648rem), 2rem);         /* 16px → 32px */
--text-normal-3: clamp(0.75rem, calc(1.13vw + 0.486rem), 1.5rem);   /* 12px → 24px */
--text-normal-4: clamp(0.5rem, calc(0.376vw + 0.412rem), 0.75rem);  /* 8px → 12px */
--text-normal-5: clamp(0.375rem, calc(0.282vw + 0.309rem), 0.5625rem);/* 6px → 9px */
--text-normal-6: clamp(0.25rem, calc(0.188vw + 0.206rem), 0.375rem);/* 4px → 6px */
--text-normal-7: clamp(0.125rem, calc(0.094vw + 0.103rem), 0.1875rem);/* 2px → 3px */
```

### Typography Usage
```html
<!-- Headings -->
<h1 class="font-playfair text-heading-1">Main headline</h1>
<h2 class="font-playfair text-heading-2">Section title</h2>

<!-- Body text -->
<p class="font-lato text-normal-3">Description text</p>
<span class="font-lato text-normal-4">Small text</span>

<!-- Section markers -->
<header class="font-playfair text-heading-5 tracking-wider uppercase">
  ■ SECTION TITLE
</header>
```

---

## Spacing System

### Uniform Spacing Scale (2x multiplier)
```css
/* Viewport range: 375px - 1440px */
--spacing-uniform-1: clamp(3rem, calc(4.51vw + 1.944rem), 6rem);    /* 48px → 96px */
--spacing-uniform-2: clamp(2rem, calc(3vw + 1.296rem), 4rem);       /* 32px → 64px */
--spacing-uniform-3: clamp(1.5rem, calc(2.25vw + 0.972rem), 3rem);  /* 24px → 48px */
--spacing-uniform-4: clamp(1rem, calc(1.5vw + 0.648rem), 2rem);     /* 16px → 32px */
--spacing-uniform-5: clamp(0.75rem, calc(1.13vw + 0.486rem), 1.5rem);/* 12px → 24px */
--spacing-uniform-6: clamp(0.5rem, calc(0.75vw + 0.324rem), 1rem);  /* 8px → 16px */
--spacing-uniform-7: clamp(0.25rem, calc(0.376vw + 0.162rem), 0.5rem);/* 4px → 8px */
```

### Padding Tokens
```css
--padding-container: clamp(1rem, calc(1.5vw + 0.648rem), 2rem);     /* 16px → 32px */
--padding-section: clamp(0.5rem, calc(0.75vw + 0.324rem), 1rem);    /* 8px → 16px */
--padding-card: clamp(0.25rem, calc(0.376vw + 0.162rem), 0.5rem);   /* 4px → 8px */
--padding-button-y: clamp(0.25rem, calc(0.376vw + 0.162rem), 0.5rem);/* 4px → 8px */
--padding-button-x: clamp(0.5rem, calc(0.75vw + 0.324rem), 1rem);   /* 8px → 16px */
--padding-menubar-y: clamp(0.5rem, calc(0.75vw + 0.324rem), 1rem);  /* 8px → 16px */
--padding-menubar-x: clamp(1rem, calc(1.5vw + 0.648rem), 2rem);     /* 16px → 32px */
```

### Usage
```html
<!-- Padding -->
<section class="p-uniform-3">Sectio padding</section>
<div class="px-uniform-5 py-uniform-4">Custom padding</div>

<!-- Gap -->
<div class="flex gap-uniform-4">Flexbox gap</div>
<div class="grid gap-uniform-3">Grid gap</div>

<!-- Margin -->
<div class="mt-uniform-3 mb-uniform-4">Margins</div>
```

---

## Icon System

### Icon Sizes (2x multiplier)
```css
--icon-size-1: clamp(4rem, calc(6.01vw + 2.591rem), 8rem);    /* 64px → 128px */
--icon-size-2: clamp(2rem, calc(3vw + 1.296rem), 4rem);       /* 32px → 64px */
--icon-size-3: clamp(1.5rem, calc(2.25vw + 0.972rem), 3rem);  /* 24px → 48px */
--icon-size-4: clamp(1.25rem, calc(1.88vw + 0.81rem), 2.5rem);/* 20px → 40px */
--icon-size-5: clamp(1rem, calc(1.5vw + 0.648rem), 2rem);     /* 16px → 32px */
--icon-size-6: clamp(0.75rem, calc(1.13vw + 0.486rem), 1.5rem);/* 12px → 24px */
--icon-size-7: clamp(0.5rem, calc(0.75vw + 0.324rem), 1rem);  /* 8px → 16px */
```

### Usage
```html
<Icon name="solar:arrow-left-linear" class="text-icon-size-4" />
<Icon name="solar:hamburger-menu-linear" class="text-icon-size-4 sm:text-icon-size-4" />
```

### Icon Set
- **Primary**: Solar icon set (linear style)
- Use via Nuxt Icon component
- Consistent line weight throughout

---

## Transition Tokens

```css
--transition-fast: 150ms;
--transition-normal: 300ms;
--transition-slow: 500ms;
```

---

## Layout Standards

### Section Structure
Standard section pattern:
```vue
<div class="bg-offwhite">
  <section
    class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto"
    id="section-id"
    data-parallax
  >
    <header class="font-playfair text-charcoal text-heading-5 tracking-wider uppercase">
      ■ SECTION TITLE
    </header>
    <div class="flex flex-col md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <!-- Content -->
    </div>
    <footer class="text-end text-charcoal text-normal-5">M✦ - 01</footer>
  </section>
</div>
```

### Content Width Constraints
```html
<div class="xl:max-w-6xl xl:mx-auto">Container</div>
<div class="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">Content</div>
```

### Aspect Ratios
- Mobile hero: `aspect-9/16` (portrait)
- Desktop hero: `aspect-video` (16:9)
- Gallery cards: `aspect-3/4`

---

## Component Styling

### Navigation (AppHeader)
- Fixed positioning at top
- Mix-blend-difference for universal visibility
- Z-index: 999
- Mobile: UDrawer (bottom sheet)
- Desktop: Horizontal nav links

### Buttons
**Philosophy**: Text-based with animated underlines, no solid backgrounds.

```html
<!-- Standard button -->
<button class="text-charcoal bg-transparent hover:bg-transparent active:text-gold min-w-11 min-h-11 flex items-center justify-center">
  <Icon name="..." />
</button>

<!-- CTA button -->
<AnimatedButton to="/link" classes="text-gold font-lato text-normal-4 py-uniform-6">
  Button Text
</AnimatedButton>
```

### Underline Animation
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

---

## Visual Style Rules

### No Rounded Corners
```html
<!-- Always use -->
<div class="rounded-none">

<!-- Never use -->
<div class="rounded-lg">
```

### No Shadows
```html
<!-- No box-shadow anywhere -->
<button class="focus:shadow-none">
```

### Transparent Backgrounds
Components inherit from section backgrounds:
```html
<button class="bg-transparent hover:bg-transparent">
<div class="bg-transparent">
```

---

## Content Guidelines

### Section Markers
- Symbol: `■`
- Text: ALL CAPS
- Font: Playfair Display
- Size: `text-heading-5`
- Tracking: `tracking-wider`

### Section Identifiers
- Format: `M✦ - ##` (two digits)
- Position: `text-end`
- Size: `text-normal-5`
- Sequential numbering

---

## Accessibility

### Focus States
Gold outline for keyboard navigation:
```css
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

### Touch Targets
Minimum 44x44px:
```html
<button class="min-w-11 min-h-11 flex items-center justify-center">
```

### Color Contrast
- Charcoal on offwhite: WCAG AA compliant
- Gold on offwhite: Check for sufficient contrast
- White on charcoal: High contrast

---

## Best Practices

### Do
- Use Playfair Display for all headings
- Use Lato for all body content
- Maintain offwhite backgrounds throughout
- Use gold sparingly for CTAs and emphasis
- Use the uniform spacing tokens
- Keep sharp edges (rounded-none)
- Use text-based buttons with underlines
- Apply fluid sizing with clamp()

### Don't
- Use rounded corners
- Use box shadows
- Use solid button backgrounds
- Use arbitrary spacing values
- Mix fonts within sections
- Override theme tokens directly
- Ignore the 2x scaling system
- Use inline styles
