# Frontend Development Standards - Memomancy Web

## Tech Stack Compliance
- **Framework**: Nuxt 4 with Vue 3 Composition API
- **UI Library**: PrimeVue 4.3.7 (use PrimeVue components over custom implementations)
- **Styling**: TailwindCSS utility classes + PrimeVue theme system
- **State Management**: Pinia stores for shared state
- **TypeScript**: Preferred for type safety

## Component Standards

### File Naming
- Use PascalCase for component files
- Place in `/app/components/` directory
- Group related components in subdirectories

### Component Structure
- Use Composition API with `<script setup>` syntax exclusively
- Define props with TypeScript interfaces or typed defineProps
- Emit events using typed defineEmits
- Keep components focused and single-responsibility
- Component files should have three sections: script, template, style (in that order)

## Styling Guidelines

### TailwindCSS Best Practices
- Prefer Tailwind utility classes over custom CSS
- Use `@apply` sparingly in component styles
- Follow mobile-first responsive design
- Use custom breakpoints defined in project config
- Leverage PrimeVue theme tokens when available

### Class Organization
- Group related utilities in logical order: layout → spacing → typography → colors → effects
- Maintain consistent class ordering across the project

### Color Mode Support
- Use theme-aware classes or CSS variables
- Test components in light/dark/system modes
- Avoid hardcoded color values
- Ensure proper contrast ratios in all color modes

## PrimeVue Integration

### Component Usage
- Always use PrimeVue components when available (Button, InputText, Dialog, DataTable, etc.)
- Follow PrimeVue naming conventions and prop patterns
- Leverage unstyled mode if custom styling is needed
- Reference PrimeVue 4.3.7 documentation for API compatibility

### Theme Customization
- Use the project's custom theme via composables
- Never override PrimeVue CSS directly
- Extend theme tokens in theme configuration
- Maintain consistency with PrimeVue design system

## State Management

### When to Use Pinia
- Shared state across multiple components/pages
- Complex state logic requiring actions and getters
- Data that persists across route changes
- Global application state

### When to Use Composables
- Reusable logic without global state
- Component-specific reactive state
- Utility functions and helpers
- Business logic that doesn't need persistence

### Store Guidelines
- Use setup syntax for Pinia stores
- Keep stores focused on specific domains
- Avoid over-centralization of state
- Use getters for computed state

## Routing & Navigation

### Page Components
- Place all pages in `/app/pages/` directory
- Use file-based routing convention
- Add route middleware for protected routes
- Use `definePageMeta()` for page-specific configuration
- Keep page components lightweight, delegate logic to composables/components

### Navigation
- Use `<NuxtLink>` for internal navigation
- Use `navigateTo()` for programmatic navigation
- Avoid full page reloads
- Implement proper loading states during navigation

## Authentication & Authorization

### Route Protection
- **Public routes**: `/`, `/calculator`, `/gallery`, `/reservation`
- **Authenticated routes**: All others except dashboard
- **Permission-based**: `/dashboard` (requires dashboard permission)

### Kinde Auth Integration
- Use Kinde composable for authentication state
- Check authentication status before protected operations
- Verify permissions for role-based access
- Handle authentication redirects properly

## Performance Best Practices

### Code Splitting
- Use dynamic imports for heavy components
- Lazy load routes (handled automatically by Nuxt)
- Split vendor bundles appropriately

### Image Optimization
- Use `<NuxtImg>` or `<NuxtPicture>` components
- Provide appropriate sizes and formats
- Use lazy loading for below-fold images
- Optimize image assets before uploading

### Reactivity
- Avoid unnecessary reactive wrappers
- Use `shallowRef` for large objects
- Unref values in computed properties
- Minimize watchers and computed dependencies

## Accessibility (a11y)

### Semantic HTML
- Use proper heading hierarchy (h1 → h6)
- Use semantic elements: `<nav>`, `<main>`, `<article>`, `<section>`
- Label form inputs properly with associated labels

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order
- Provide visible focus indicators
- Support standard keyboard shortcuts

### ARIA Attributes
- Use ARIA labels for screen readers where needed
- Provide alt text for all images
- Use appropriate ARIA roles
- Don't override semantic HTML with unnecessary ARIA

### Form Accessibility
- Associate labels with inputs
- Provide error messages in accessible format
- Use proper input types
- Include helpful placeholder text

## Code Quality

### TypeScript Usage
- Define interfaces for props, emits, and data structures
- Avoid `any` type unless absolutely necessary
- Use type inference where possible
- Leverage TypeScript for better IDE support

### Error Handling
- Handle async errors with try-catch blocks
- Provide user-friendly error feedback
- Log errors appropriately for debugging
- Don't expose sensitive error details to users

### Testing Considerations
- Write testable, modular code
- Keep business logic separate from UI
- Use composables for complex logic
- Ensure components can be tested in isolation

## Development Workflow

### Before Committing
- Test in multiple viewports and devices
- Test light/dark mode functionality
- Check console for warnings/errors
- Verify authentication flows work correctly
- Test with realistic data when possible
- Ensure no broken links or navigation issues

### Code Review Checklist
- Follows component structure standards
- Uses PrimeVue components appropriately
- Implements responsive design
- Handles loading and error states
- Accessible to keyboard and screen readers
- TypeScript types properly defined
- No console.log statements in production code
- Proper error handling implemented

## File Organization

### Component Structure
- `/app/components/ui/` - Reusable UI components
- `/app/components/layout/` - Layout components (header, footer, sidebar)
- `/app/components/features/` - Feature-specific components

### Composables
- `/app/composables/` - Reusable composition functions
- Name composables with `use` prefix
- Keep composables focused on single responsibility

### Utils
- `/app/utils/` - Pure utility functions
- Include validators, formatters, constants
- Keep utilities framework-agnostic when possible

### Types
- Define TypeScript interfaces in component files or shared types directory
- Use meaningful names for types and interfaces
- Export reusable types

## Anti-Patterns to Avoid

- Mixing Options API and Composition API
- Direct DOM manipulation (use template refs instead)
- Mutating props directly
- Using `var` (use `const` or `let`)
- Creating global state without Pinia
- Hardcoding API URLs (use runtime config)
- Ignoring TypeScript errors
- Over-nesting components (keep component tree flat)
- Creating custom components when PrimeVue equivalents exist
- Using inline styles (prefer Tailwind classes)
- Large components (break down into smaller, focused components)
- Unnecessary watchers (prefer computed properties)
- Props drilling (use provide/inject or Pinia for deep hierarchies)

## Naming Conventions

### Variables and Functions
- Use camelCase for variables and functions
- Use descriptive names that indicate purpose
- Boolean variables should start with `is`, `has`, `should`
- Event handlers should start with `on` or `handle`

### Constants
- Use UPPER_SNAKE_CASE for true constants
- Place constants in dedicated files or at top of file

### Files and Directories
- Components: PascalCase
- Composables: camelCase with `use` prefix
- Utils: camelCase
- Pages: lowercase with hyphens

## Best Practices Summary

- Always prefer PrimeVue components over building custom ones
- Keep components small and focused
- Use TypeScript for type safety
- Follow mobile-first responsive design
- Test across multiple browsers and devices
- Maintain accessibility standards
- Write self-documenting code
- Use semantic HTML
- Optimize performance from the start
- Follow the principle of least surprise

## Resources

- [Nuxt 4 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [PrimeVue 4 Documentation](https://primevue.org)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Kinde Nuxt Module](https://github.com/nuxt-modules/kinde)
