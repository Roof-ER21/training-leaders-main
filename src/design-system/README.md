# RoofER Training System Design System

A comprehensive design system built for accessibility, consistency, and scalability in the roofing industry training context.

## Core Principles

### 1. Accessibility First
- WCAG 2.1 AA compliance out of the box
- Semantic HTML structure
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios (4.5:1 minimum)

### 2. Professional & Industry-Appropriate
- Roofing industry color palette (blues, construction orange)
- Safety-focused design language
- Professional typography (Inter font family)
- Clear visual hierarchy
- Construction/industrial aesthetic

### 3. Mobile-First Responsive
- 320px minimum width support
- Progressive enhancement
- Touch-friendly interactions (44px minimum touch targets)
- Flexible grid system
- Responsive typography

### 4. Performance Optimized
- Minimal bundle impact
- CSS-in-JS with zero runtime cost
- Optimized for Core Web Vitals
- Lazy loading considerations
- Efficient re-renders

## Design Tokens

### Color System
```typescript
import { colors } from './tokens';

// Primary - Roofing blue palette
colors.primary[500] // Main brand blue
colors.primary[100] // Light blue for backgrounds
colors.primary[700] // Dark blue for text

// Secondary - Construction orange
colors.secondary[500] // Main accent orange
colors.warning[500]  // Safety warning yellow
colors.success[500]  // Safety approval green
colors.error[500]    // Danger/error red
```

### Typography Scale
```typescript
import { typography } from './tokens';

// Font families
typography.fontFamily.sans // ['Inter', 'system-ui', ...]
typography.fontFamily.mono // ['JetBrains Mono', ...]

// Size scale (16px base)
typography.fontSize.xs   // 12px
typography.fontSize.base // 16px
typography.fontSize['2xl'] // 24px
```

### Spacing System
Based on 4px grid system for consistent layouts:
```typescript
import { spacing } from './tokens';

spacing[1]  // 4px
spacing[4]  // 16px
spacing[8]  // 32px
spacing[16] // 64px
```

## Component Patterns

### Button Components
```typescript
import { buttonVariants } from './components';

// Usage with styling
const primaryButton = {
  ...buttonVariants.base,
  ...buttonVariants.size.md,
  ...buttonVariants.variant.primary,
};
```

Variants:
- `primary` - Main call-to-action buttons
- `secondary` - Secondary actions
- `outline` - Alternative actions
- `ghost` - Subtle actions

Sizes:
- `sm` - Compact spaces (32px height)
- `md` - Standard use (40px height)
- `lg` - Prominent actions (48px height)

### Input Fields
```typescript
import { inputVariants } from './components';

const textInput = {
  ...inputVariants.base,
  ...inputVariants.size.md,
};
```

States:
- Default
- Hover
- Focus (with focus ring)
- Error (red border/focus ring)
- Success (green border/focus ring)
- Disabled

### Cards
```typescript
import { cardVariants } from './components';

const moduleCard = {
  ...cardVariants.base,
  ...cardVariants.variant.interactive,
};
```

Variants:
- `default` - Standard card with padding
- `compact` - Reduced padding
- `elevated` - Prominent shadow
- `outlined` - Border emphasis
- `interactive` - Hover animations

## Usage Guidelines

### Accessibility Requirements

#### Color Contrast
- Text on background: minimum 4.5:1 ratio
- Large text (18px+): minimum 3:1 ratio
- Interactive elements: sufficient contrast in all states

#### Focus Management
- All interactive elements must have visible focus indicators
- Focus order should follow logical tab sequence
- Focus should be trapped in modals/dialogs

#### Semantic HTML
```html
<!-- Good -->
<button type="button" aria-label="Start roofing safety module">
  Start Module
</button>

<!-- Bad -->
<div onClick={handleClick}>Start Module</div>
```

#### Screen Reader Support
- Use proper heading hierarchy (h1, h2, h3...)
- Provide alt text for images
- Use aria-label for icon-only buttons
- Announce dynamic content changes

### Responsive Design

#### Breakpoints
```typescript
import { breakpoints } from './tokens';

// Mobile first approach
@media (min-width: ${breakpoints.sm}) { ... } // 640px+
@media (min-width: ${breakpoints.md}) { ... } // 768px+
@media (min-width: ${breakpoints.lg}) { ... } // 1024px+
```

#### Touch Targets
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Consider thumb reach zones on mobile

### Performance Considerations

#### Bundle Size
- Import only needed tokens/variants
- Use tree shaking effectively
- Minimize CSS-in-JS runtime impact

#### Loading States
- Skeleton screens for content loading
- Progressive loading for large datasets
- Optimistic updates for better UX

## Agnes AI Integration Patterns

### Chat Interface
- Consistent message bubbles
- Clear user vs AI distinction
- Proper loading states
- Accessibility for screen readers

### Progress Tracking
- Visual progress indicators
- Completion badges
- Achievement celebrations
- Clear next steps

### Training Modules
- Consistent module cards
- Progress visualization
- Interactive elements
- Safety emphasis

## Testing Guidelines

### Visual Testing
- Test all component variants
- Verify responsive behavior
- Check dark mode compatibility
- Validate color contrast

### Accessibility Testing
- Keyboard navigation testing
- Screen reader testing
- Focus management verification
- ARIA attribute validation

### Performance Testing
- Bundle size analysis
- Runtime performance profiling
- Memory leak detection
- Loading time optimization

## Contributing

### Adding New Tokens
1. Add to appropriate section in `tokens.ts`
2. Follow naming conventions
3. Include accessibility considerations
4. Document usage guidelines

### Creating Component Variants
1. Define in `components.ts`
2. Include all interactive states
3. Follow accessibility patterns
4. Test across breakpoints

### Design Review Process
1. Accessibility audit
2. Brand compliance check
3. Performance impact assessment
4. Cross-browser testing
5. Mobile device testing