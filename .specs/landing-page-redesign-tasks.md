# Task Breakdown: Landing Page Redesign

## 1. Setup

### 1.1 Font Configuration
- [ ] Update `layout.tsx` with Playfair Display and DM Sans fonts using `next/font/google`
- [ ] Configure font variables: `--font-playfair` and `--font-dm-sans`
- [ ] Add font variables to CSS theme in `globals.css`

### 1.2 CSS Variables & Theme
- [ ] Add gold color palette to globals.css (gold, gold-light, gold-dark)
- [ ] Add neutral surface colors (surface, surface-elevated, surface-hover)
- [ ] Add text colors (text-primary, text-secondary, text-muted)
- [ ] Configure Tailwind @theme with font-display and font-body

---

## 2. Components - Extraction

### 2.1 HeroSection
- [ ] Create `src/components/landing/HeroSection.tsx`
- [ ] Extract hero content (title, subtitle, CTAs) as props
- [ ] Add full-viewport height styling
- [ ] Add background image with Next.js Image and priority prop

### 2.2 FeaturesSection
- [ ] Create `src/components/landing/FeaturesSection.tsx`
- [ ] Extract 3-column feature cards
- [ ] Add feature icons and descriptions
- [ ] Add responsive grid layout (1 col mobile, 3 col desktop)

### 2.3 TournamentsSection
- [ ] Create `src/components/landing/TournamentsSection.tsx`
- [ ] Extract tournament preview cards
- [ ] Add tournament data (name, date, prize pool)
- [ ] Add responsive card layout

### 2.4 CTASection
- [ ] Create `src/components/landing/CTASection.tsx`
- [ ] Extract call-to-action banner
- [ ] Add button with hover effects

### 2.5 Footer
- [ ] Create `src/components/landing/Footer.tsx`
- [ ] Extract footer navigation links
- [ ] Add social links and copyright

---

## 3. Animation

### 3.1 Animation Hook
- [ ] Create `src/hooks/useScrollAnimation.ts`
- [ ] Implement Intersection Observer hook
- [ ] Add threshold parameter (default 0.1)

### 3.2 Hero Animations
- [ ] Add fade-in entrance animation for title
- [ ] Add slide-up animation for subtitle
- [ ] Add scale animation for CTA buttons

### 3.3 Section Scroll Animations
- [ ] Add fade-in + translate-up to FeaturesSection
- [ ] Add fade-in + translate-up to TournamentsSection
- [ ] Add fade-in to CTASection
- [ ] Configure animation duration (700ms) and easing

---

## 4. Mobile

### 4.1 Mobile Navigation
- [ ] Create `src/components/landing/MobileNav.tsx`
- [ ] Implement hamburger menu button
- [ ] Add slide-in drawer from right side
- [ ] Add backdrop blur overlay
- [ ] Implement close on backdrop click
- [ ] Add close on escape key
- [ ] Add proper ARIA attributes and focus management

### 4.2 Responsive Adjustments
- [ ] Add mobile-first responsive styles to HeroSection
- [ ] Add responsive grid to FeaturesSection
- [ ] Add responsive cards to TournamentsSection
- [ ] Add responsive layout to CTASection
- [ ] Add responsive layout to Footer

---

## 5. Integration

### 5.1 Component Exports
- [ ] Create `src/components/landing/index.ts` barrel export
- [ ] Export all landing components

### 5.2 Main Page Update
- [ ] Update `src/app/page.tsx` to use extracted components
- [ ] Import all components from barrel export
- [ ] Replace inline sections with component imports

### 5.3 Verification
- [ ] Verify responsive behavior at all breakpoints (mobile, tablet, desktop)
- [ ] Test animation performance on mobile devices
- [ ] Verify font loading and CLS metrics
- [ ] Test all scroll-triggered animations
