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

## Color Palette

### Primary Colors
- **Charcoal**: Deep dark background color for hero sections and contrast
- **Offwhite**: Light, warm background for content sections
- **Gold**: Accent color for CTAs and emphasis
- **Taupe**: Supporting neutral for subtle elements

### Color Usage Philosophy
- Use charcoal for dramatic, high-impact sections
- Use offwhite for readable content areas
- Gold as accent for interactive elements and CTAs
- Maintain high contrast between text and backgrounds
- Ensure accessibility across all color combinations

### Color Mode Strategy
- Primary mode: Light with warm neutrals
- Dark mode: Currently disabled in theme configuration
- Use mix-blend-difference for fixed navigation to ensure visibility over any background

## Typography

### Font Families

#### Playfair Display (Serif)
- **Purpose**: Headings, brand name, section markers, navigation
- **Character**: Elegant, sophisticated, traditional
- **Usage**: All display text, titles, emphasis
- **Weight**: Medium (500) as standard

#### Lato (Sans-serif)
- **Purpose**: Body text, descriptions, UI elements
- **Character**: Clean, readable, modern
- **Usage**: All content paragraphs, supporting text, UI copy
- **Weight**: Regular (400) as standard

### Typography Scale

#### Heading Sizes
Seven levels of fluid heading sizes using clamp for responsive scaling:
- heading-1: Largest display text (3rem to 9rem)
- heading-2: Major section headings (1.5rem to 4.5rem)
- heading-3: Subsection titles (1rem to 3rem)
- heading-4 through heading-7: Progressive smaller sizes

#### Normal Text Sizes
Seven levels of body text sizes:
- normal-1: Largest body text (1.5rem to 4.5rem)
- normal-2: Standard large text (1rem to 3rem)
- normal-3: Medium body text (0.75rem to 2.25rem)
- normal-4: Standard readable text (0.5rem to 1.5rem)
- normal-5 through normal-7: Progressive smaller sizes

### Typography Guidelines
- Use Playfair Display exclusively for all headings and brand elements
- Use Lato for all body content and descriptions
- Never mix heading fonts within a section
- Maintain fluid scaling across all viewport sizes
- Ensure text remains readable at all breakpoints

## Spacing System

### Uniform Spacing Scale
Seven-level spacing system using clamp for fluid scaling:
- uniform-1: Largest spacing (3rem to 9rem) - Major section gaps
- uniform-2: Large spacing (2rem to 6rem) - Section internal spacing
- uniform-3: Medium-large spacing (1.5rem to 4.5rem) - Component gaps
- uniform-4: Medium spacing (1rem to 3rem) - Content separation
- uniform-5: Small-medium spacing (0.75rem to 2.25rem) - Element gaps
- uniform-6: Small spacing (0.5rem to 1.5rem) - Tight element spacing
- uniform-7: Smallest spacing (0.25rem to 0.75rem) - Minimal gaps

### Spacing Usage Principles
- Use consistent spacing tokens throughout the application
- Prefer larger spacing between major sections
- Use uniform-3 for standard padding in sections
- Maintain vertical rhythm using the uniform scale
- Never use arbitrary spacing values

### Padding Standards
- Container padding: Fluid scaling (1rem to 3rem)
- Section padding: Fluid scaling (0.5rem to 1.5rem)
- Card padding: Fluid scaling (0.25rem to 0.75rem)
- Button padding Y: Fluid scaling (0.25rem to 0.75rem)
- Button padding X: Fluid scaling (0.5rem to 1.5rem)
- Menubar padding Y: Fluid scaling (0.5rem to 1.5rem)
- Menubar padding X: Fluid scaling (1rem to 3rem)

## Layout Standards

### Section Structure
- Each major section should have a distinct background color
- Alternate between charcoal and offwhite backgrounds
- Use consistent padding (uniform-3) for all sections
- Maintain consistent gap spacing (uniform-3) within sections

### Content Organization
- Use three-part structure: marker, content, identifier
- Section markers use "■" symbol with descriptive text
- Section identifiers use "M✦ - ##" format in bottom right
- Content occupies the central area with appropriate spacing

### Aspect Ratios
- Mobile hero images: 9:16 (portrait)
- Desktop hero images: 16:9 (landscape)
- Maintain responsive aspect ratio switching

### Responsive Behavior
- Mobile-first approach
- Fluid typography and spacing across all breakpoints
- Components should stack vertically on mobile
- Horizontal layouts emerge at larger breakpoints

## Component Styling

### Navigation (Menubar)
- Fixed positioning at top of viewport
- Mix-blend-difference for universal visibility
- Playfair Display font at heading-2 size
- White text color
- High z-index for layering (999)
- Hamburger menu icon for navigation
- Popup menu pattern for navigation items

### Buttons

#### Button Philosophy
- All buttons are text-based with animated underlines
- No solid backgrounds or borders on buttons
- Minimal, elegant interaction design
- Focus on typography and subtle animation

#### Standard Buttons
- Use PrimeVue Button component with text variant
- Large size as default
- Icon support integrated
- No background fills or heavy borders

#### Animated Buttons (CTAs)
- Custom AnimatedButton component for primary actions
- Text-only presentation with bottom underline
- Gold text color for emphasis
- Lato font at normal-4 size
- Appropriate padding for touch targets
- Self-centering alignment
- Used for primary conversion actions

#### Underline Animation
- Thin bottom underline using normal-7 size
- Gold color for the underline
- Animated on hover with disappear-reappear effect
- Animation duration: 0.6s ease-in-out
- Smooth scaling transition from left to right, then reappears
- Always present in default state, animates on interaction

### Hero Section
- Charcoal background for drama
- Large aspect ratio image placeholder
- White placeholder text (temporary)
- Offwhite text for readings
- Playfair Display for headline at heading-2
- Lato for subheadline at normal-2
- Centered CTA button with margin bottom

### Content Sections
- Offwhite background for readability
- Section marker in top left (Playfair Display)
- Content area with adequate spacing
- Section identifier in bottom right
- Use mb-uniform-3 for content item separation

### Philosophy/Service Points
- Title in Playfair Display at heading-3
- Description in Lato at normal-3 or normal-4
- Consistent spacing between points (mb-uniform-3 or mb-uniform-6)
- Clear visual hierarchy

## Icon System

### Icon Sizes
Seven levels of fluid icon scaling:
- icon-size-1: Largest (4rem to 12rem)
- icon-size-2: Large (2rem to 6rem)
- icon-size-3: Medium-large (1.5rem to 4.5rem)
- icon-size-4: Medium (1.25rem to 3.75rem)
- icon-size-5: Standard (1rem to 3rem)
- icon-size-6: Small (0.75rem to 2.25rem)
- icon-size-7: Smallest (0.5rem to 1.5rem)

### Icon Usage
- Use Nuxt Icon component for all icons
- Solar icon set as primary icon family
- Linear style for consistent line weight
- Icons should scale with text size

## PrimeVue Theme Integration

### Theme Preset
- Based on Aura preset
- Yellow color palette for primary semantic colors
- Dark mode selector: disabled
- Theme customization via PrimeVue preset system

### Component Theming
- Leverage PrimeVue theme tokens
- Don't override PrimeVue CSS directly
- Extend through preset configuration
- Maintain PrimeVue's semantic color system

## Animation & Interaction Standards

### Mix Blend Mode
- Use mix-blend-difference for navigation elements over varying backgrounds
- Ensures text visibility regardless of underlying content
- Applied to fixed header elements

### Hover States
- Provide clear hover feedback on interactive elements
- Maintain brand color palette in hover states
- Smooth transitions for state changes

### Transitions
- Use subtle, purposeful animations
- Maintain performance across devices
- Avoid excessive motion

## Underline System

### Underline Purpose
- Primary decorative element in the design system
- Used for section separation and button emphasis
- Creates visual continuity throughout the interface
- Minimal, sophisticated accent

### Underline Properties
- **Thickness**: Thin lines using normal-7 size token
- **Color**: Gold for interactive elements, varies for dividers
- **Position**: Bottom-only (never top, left, or right)
- **Style**: Solid, clean lines

### Underline Usage

#### Button Underlines
- All buttons have bottom underlines
- Gold color for emphasis
- Animated on hover (disappear-reappear effect)
- Present in default state
- Never use border property, always use pseudo-elements

#### Section Dividers
- Thin bottom borders to separate major sections
- Subtle visual breaks between content areas
- Consistent thickness using normal-7 token
- Color matches section context

#### Link Underlines
- Text links should follow button underline pattern
- Gold color for consistency
- Animated hover states
- Maintains text-only aesthetic

### Underline Guidelines
- Use sparingly for maximum impact
- Never stack multiple underlines
- Maintain consistent thickness throughout
- Always bottom-aligned, never centered or top
- Prefer underlines over boxes or backgrounds for interactive elements

## Visual Style Standards

### No Rounded Corners
- All components use sharp, clean edges
- Use `rounded-none` on all interactive elements
- No border-radius on any component
- Maintains minimal, editorial aesthetic

### Transparent Backgrounds
- All components inherit background from parent sections
- Use `bg-transparent` for all interactive elements
- No white boxes or background fills
- Components blend seamlessly into sections
- Only section-level backgrounds (charcoal/offwhite alternating)

### No Shadows or Elevation
- No box-shadows on any elements
- No elevation effects or depth
- Flat, minimal design throughout
- Use `focus:shadow-none` to remove focus shadows
- Rely on underlines and typography for hierarchy

## Design Principles

### Visual Hierarchy
- Large, bold headings in Playfair Display
- Supporting text in readable Lato
- Clear size differentiation between heading levels
- Consistent spacing creates rhythm

### Minimalism
- Text-based interface design
- No heavy borders or backgrounds on interactive elements
- No rounded corners anywhere
- No shadows or elevation effects
- Underlines as primary decorative accent
- Clean, uncluttered layouts
- Let typography and spacing do the work

### White Space
- Generous spacing between sections
- Adequate breathing room around content
- Never cramped or cluttered
- Premium feel through space

### Contrast
- High contrast between text and backgrounds
- Dramatic contrast between sections (charcoal vs offwhite)
- Gold accent provides visual interest
- Accessibility-first contrast ratios

### Consistency
- Reuse spacing tokens throughout
- Maintain typographic scale
- Consistent component patterns
- Predictable layout structure
- Uniform underline treatment

### Responsive Fluidity
- All sizing uses clamp for smooth scaling
- No abrupt breakpoint jumps
- Graceful degradation on smaller screens
- Enhanced layouts on larger screens

## Content Guidelines

### Section Markers
- Use "■" symbol prefix
- All caps text
- Descriptive, concise labels
- Playfair Display font

### Section Identifiers
- Format: "M✦ - ##" (two digits)
- Right-aligned
- Sequential numbering
- Subtle branding element

### Messaging Tone
- Lead with benefits and narrative
- Emphasize storytelling over technical specs
- Professional but warm language
- Avoid generic marketing speak

## Accessibility Considerations

### Color Contrast
- Ensure WCAG AA compliance minimum
- Test gold text on offwhite backgrounds
- Verify white text on charcoal backgrounds
- Never use color alone to convey information

### Typography Accessibility
- Maintain readable font sizes at all viewports
- Sufficient line height for readability
- Clear heading hierarchy for screen readers
- Proper semantic HTML structure

### Interactive Elements
- Clear focus indicators for keyboard navigation
- Adequate touch target sizes on mobile
- Descriptive labels for screen readers
- Logical tab order

## Best Practices

### Do's
- Use Playfair Display for all headings and brand elements
- Use Lato for all body content
- Maintain the charcoal/offwhite alternating pattern
- Use gold sparingly for CTAs and emphasis
- Leverage the uniform spacing system
- Keep section structure consistent
- Use fluid sizing throughout
- Maintain high contrast
- Format all buttons as text with animated underlines
- Use thin underlines (normal-7) for separation and emphasis
- Keep interactive elements minimal and text-focused

### Don'ts
- Don't mix serif fonts in body text
- Don't use arbitrary spacing values
- Don't override PrimeVue CSS directly
- Don't use inline styles
- Don't create custom components when PrimeVue has them
- Don't ignore the fluid scaling system
- Don't compromise accessibility for aesthetics
- Don't use gold for large text blocks
- Don't use solid button backgrounds or heavy borders
- Don't use underlines on top, left, or right positions (bottom only)
- Don't create thick or multiple underlines
- Don't use box styles for interactive elements (use underlines instead)
- Don't use rounded corners (always use rounded-none)
- Don't add white backgrounds to components (use bg-transparent)
- Don't use shadows or elevation effects on any elements

## Testing Requirements

### Visual Testing
- Test across mobile, tablet, and desktop viewports
- Verify fluid typography scales correctly
- Check spacing consistency
- Validate color contrast ratios

### Brand Consistency
- Ensure Playfair Display loads correctly
- Verify Lato as fallback sans-serif
- Check gold color rendering
- Validate section marker and identifier placement

### Responsive Behavior
- Verify aspect ratio switching on hero images
- Test navigation visibility with mix-blend-difference
- Check button sizing and padding
- Validate spacing at all breakpoints

## Resources

- [Playfair Display Font](https://fonts.google.com/specimen/Playfair+Display)
- [Lato Font](https://fonts.google.com/specimen/Lato)
- [PrimeVue Aura Theme](https://primevue.org/theming/aura)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
