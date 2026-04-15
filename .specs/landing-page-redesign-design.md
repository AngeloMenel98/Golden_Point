# Technical Design: Landing Page Redesign

## 1. File Changes

### Primary Files to Modify
- `src/app/page.tsx` — Main landing page component
- `src/app/globals.css` — Global styles and CSS custom properties
- `src/app/layout.tsx` — Add font declarations

### New Files to Create
- `src/components/landing/HeroSection.tsx` — Extracted hero component
- `src/components/landing/FeaturesSection.tsx` — Extracted features component
- `src/components/landing/TournamentsSection.tsx` — Extracted tournaments component
- `src/components/landing/CTASection.tsx` — Extracted CTA component
- `src/components/landing/Footer.tsx` — Extracted footer component
- `src/components/landing/MobileNav.tsx` — Mobile navigation menu

---

## 2. Implementation Approach

### Font Setup (next/font)
```typescript
// src/app/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap'
});
```

Update globals.css with font variables:
```css
@theme {
  --font-display: var(--font-playfair), serif;
  --font-body: var(--font-dm-sans), sans-serif;
}
```

### CSS Custom Properties (Color Tokens)
Extend existing gold palette in globals.css:
```css
@theme {
  /* Keep existing gold palette */
  --color-gold: #D4AF37;
  --color-gold-light: #E5C76B;
  --color-gold-dark: #B8960F;
  
  /* New neutral palette */
  --color-surface: #0A0A0A;
  --color-surface-elevated: #141414;
  --color-surface-hover: #1A1A1A;
  
  /* Text colors */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: rgba(255, 255, 255, 0.7);
  --color-text-muted: rgba(255, 255, 255, 0.5);
}
```

### Animation Implementation
**Recommended: CSS-only with Intersection Observer for scroll triggers**

- CSS animations for micro-interactions (hover states, button effects)
- CSS keyframe animations for entrance animations
- Intersection Observer API for scroll-triggered fade-in animations
- Avoid Framer Motion to reduce bundle size

Example scroll animation hook:
```typescript
// hooks/useScrollAnimation.ts
'use client';
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}
```

### Responsive Strategy
- Mobile-first approach with Tailwind breakpoints
- Custom breakpoints in Tailwind config for landing-specific needs
- Mobile menu: slide-in drawer from right side

---

## 3. Component Architecture

### Extraction Decision: Extract all major sections
Keeping sections inline makes the component too large (~300 lines). Extracted components improve maintainability and testing.

### Component Structure
```
src/components/landing/
├── HeroSection.tsx        // Full-viewport hero with background
├── FeaturesSection.tsx    // 3-column feature cards
├── TournamentsSection.tsx // Tournament preview cards
├── CTASection.tsx          // Call-to-action banner
├── Footer.tsx             // Site footer
├── MobileNav.tsx          // Mobile hamburger menu
└── index.ts               // Barrel export
```

### Component Props Interface
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}
```

---

## 4. Key Technical Decisions

### Animation Library: CSS-Only
**Decision: Use CSS animations with custom hooks instead of Framer Motion**

Rationale:
- Smaller bundle size (~15KB saved)
- Better performance on mobile devices
- Sufficient for landing page animations (fade, slide, scale)
- No external dependency needed

### Scroll-Triggered Animations: Intersection Observer
**Decision: Use native Intersection Observer API**

```typescript
// Implementation pattern
<div 
  ref={ref} 
  className={`transition-all duration-700 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
```

### Mobile Menu: Slide-in Drawer
**Decision: Custom slide-in drawer component**

- Uses fixed positioning with transform for smooth animation
- Backdrop blur overlay
- Close on backdrop click or escape key
- Accessible: proper focus management and ARIA attributes

---

## 5. Risks & Mitigations

### Risk 1: Font Loading Performance
**Issue**: Google Fonts can cause Cumulative Layout Shift (CLS)

**Mitigation**:
- Use `display: 'swap'` in font configuration
- Preload critical fonts in `next.config.js`
- Set font display property to ensure text remains visible during load

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageFonts: true,
  },
};
```

### Risk 2: Animation Performance on Mobile
**Issue**: Complex CSS animations may cause jank on low-end devices

**Mitigation**:
- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `top`, `left`, `width`, `height`
- Use `will-change: transform` sparingly on animated elements
- Test on mid-range devices (Pixel 4a, iPhone SE equivalent)

### Risk 3: Background Image Loading
**Issue**: Large hero background image delays LCP

**Mitigation**:
- Use Next.js `<Image>` with `priority` prop
- Implement blur placeholder
- Consider responsive image sizes with `sizes` prop

---

## 6. Implementation Checklist

- [ ] Update layout.tsx with Playfair Display and DM Sans fonts
- [ ] Add CSS custom properties in globals.css
- [ ] Create landing component folder structure
- [ ] Extract HeroSection component with scroll animation
- [ ] Extract FeaturesSection component
- [ ] Extract TournamentsSection component
- [ ] Extract CTASection component
- [ ] Extract Footer component
- [ ] Implement MobileNav with drawer animation
- [ ] Add Intersection Observer hook for scroll animations
- [ ] Verify responsive behavior at all breakpoints
- [ ] Test animation performance on mobile devices
- [ ] Verify font loading and CLS metrics

---

## 7. Dependencies

No new dependencies required. Uses existing:
- `next/font` — Font loading
- `next/image` — Optimized images
- `tailwindcss` — Styling
- Native `IntersectionObserver` — Scroll animations
