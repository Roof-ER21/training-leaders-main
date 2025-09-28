# 👥 Frontend Development Team Guide

> **Complete onboarding and collaboration guide for frontend developers joining the RoofER Training System project**

## 🎯 Project Overview

The RoofER Advanced Training System is a comprehensive roofing industry training platform featuring 10 interactive modules powered by Agnes AI. Our mission is to create the most accessible, engaging, and effective training system in the construction industry.

### 🏗️ Key Statistics
- **10 Training Modules** covering comprehensive roofing education
- **Live Production System** at https://roof-er-training-system.vercel.app
- **WCAG 2.1 AA Compliance** requirement across all features
- **Mobile-First Design** for field accessibility
- **React 19 + TypeScript** modern architecture

## 🚀 Quick Start (Day 1)

### ⚡ Environment Setup
```bash
# 1. Clone the repository
git clone <repository-url>
cd roof-er-training-live

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Start development server
npm start
# Application opens at http://localhost:3000

# 5. Start Storybook for component development
npm run storybook
# Storybook opens at http://localhost:6006
```

### 🧪 Verify Setup
```bash
# Run all quality checks
npm run pre-commit

# Should complete without errors:
# ✓ ESLint checks
# ✓ Prettier formatting
# ✓ TypeScript type checking
# ✓ Test suite execution
```

## 📚 Architecture Overview

### 🏗️ Technology Stack

**Core Framework**
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 4.9.5** - Strict mode enabled for type safety
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Create React App** - Build tooling and development server

**Development Tools**
- **Storybook 8.4** - Component development and documentation
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Git hooks for quality gates
- **React Testing Library** - Component testing framework

### 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic design system components
│   │   ├── Button.tsx   # Button component with variants
│   │   └── *.stories.tsx # Storybook stories for each component
│   └── features/        # Feature-specific components
│       ├── training/    # Training module components
│       ├── chat/        # Agnes AI chat components
│       └── navigation/  # Navigation components
├── design-system/       # Design tokens and guidelines
│   ├── tokens.ts        # Color, typography, spacing tokens
│   ├── components.ts    # Component styling patterns
│   └── README.md        # Design system documentation
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and helpers
├── types/               # TypeScript type definitions
├── contexts/            # React context providers
├── pages/               # Page-level components
└── assets/              # Static assets (images, icons)
```

### 🎨 Design System Architecture

**Design Tokens** (`src/design-system/tokens.ts`)
- Centralized color palette with accessibility ratios
- Typography scale with responsive sizing
- Spacing system based on 4px grid
- Consistent border radius and shadow definitions

**Component Patterns** (`src/design-system/components.ts`)
- Button variants with all interactive states
- Input field patterns with validation states
- Card layouts with elevation options
- Modal and overlay patterns

## 👨‍💻 Development Workflow

### 🔄 Day-to-Day Workflow

1. **Start with Design System**
   ```bash
   # Check existing components first
   npm run storybook
   # Browse existing components at http://localhost:6006
   ```

2. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

3. **Component-Driven Development**
   - Build components in Storybook first
   - Test all variants and states
   - Ensure accessibility compliance
   - Document with comprehensive stories

4. **Integration and Testing**
   ```bash
   # Run all quality checks before committing
   npm run pre-commit

   # Commit with conventional format
   git commit -m "feat: add training progress indicator component"
   ```

5. **Pull Request Process**
   - Use provided PR template
   - Include accessibility testing results
   - Add Storybook stories for new components
   - Ensure mobile responsiveness

### 🧪 Testing Strategy

**Component Testing**
```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

test('button handles click events', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**Accessibility Testing**
```typescript
// Accessibility testing example
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('button is accessible', async () => {
  const { container } = render(<Button>Accessible button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🎨 Component Development Guide

### 📝 Component Creation Checklist

**1. Plan Component API**
```typescript
// Define clear TypeScript interfaces
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Accessibility label */
  'aria-label'?: string;
  /** Click handler */
  onClick?: () => void;
}
```

**2. Implement Component**
```typescript
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel,
  onClick,
  ...props
}) => {
  // Implementation using design system tokens
  const buttonClasses = getButtonClasses(variant, size, disabled);

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

**3. Create Comprehensive Stories**
```typescript
// Button.stories.tsx
export default {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primary UI component following WCAG 2.1 AA guidelines.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

// Include stories for all variants and states
export const Primary: Story = {
  args: { children: 'Primary Button' },
};

export const Accessibility: Story = {
  args: {
    children: '🔧',
    'aria-label': 'Open tools training module',
  },
};
```

**4. Add Comprehensive Tests**
```typescript
describe('Button Component', () => {
  test('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles all variants', () => {
    // Test all variant props
  });

  test('accessibility compliance', async () => {
    // Accessibility testing
  });
});
```

### ♿ Accessibility Requirements

**WCAG 2.1 AA Compliance Checklist**
- [ ] **Color Contrast**: 4.5:1 ratio minimum (3:1 for large text)
- [ ] **Keyboard Navigation**: All functionality available via keyboard
- [ ] **Screen Reader Support**: Proper ARIA labels and semantic HTML
- [ ] **Focus Management**: Visible focus indicators and logical tab order
- [ ] **Alternative Text**: All images and icons have appropriate alt text

**Development Tools**
```bash
# Accessibility keyboard shortcuts (development only)
Ctrl/Cmd + Shift + A  # Run accessibility audit
Ctrl/Cmd + Shift + F  # Highlight focusable elements
Ctrl/Cmd + Shift + R  # Remove focus highlights
```

## 📱 Mobile-First Development

### 🎯 Mobile Requirements

**Touch Targets**
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Consider thumb reach zones

**Responsive Breakpoints**
```typescript
// Design system breakpoints
xs: '475px'   // Extra small devices
sm: '640px'   // Small devices (mobile)
md: '768px'   // Medium devices (tablet)
lg: '1024px'  // Large devices (desktop)
xl: '1280px'  // Extra large devices
2xl: '1536px' // Ultra wide devices
```

**Performance Considerations**
- Bundle size optimization
- Image optimization and lazy loading
- Network request minimization
- Offline capability planning

### 📱 Mobile Testing Strategy

**Real Device Testing**
- iOS Safari (latest 2 versions)
- Chrome Mobile (latest 2 versions)
- Samsung Internet
- Firefox Mobile

**Responsive Testing Tools**
- Chrome DevTools device simulation
- Firefox Responsive Design Mode
- BrowserStack for comprehensive testing

## 🤖 Agnes AI Integration Guidelines

### 💬 Chat Interface Standards

**Message Components**
```typescript
interface MessageProps {
  content: string;
  sender: 'user' | 'agnes';
  timestamp: Date;
  isTyping?: boolean;
}
```

**AI Personality Guidelines**
- Professional and knowledgeable tone
- Industry-specific expertise
- Encouraging and supportive coaching style
- Safety-first approach in all recommendations

**Integration Patterns**
- Seamless module integration
- Context-aware responses
- Progress tracking integration
- Offline capability considerations

## 🚀 Performance Standards

### 📊 Core Web Vitals Targets

**Performance Metrics**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Bundle Size**: < 200KB gzipped initial load

**Optimization Strategies**
```typescript
// Lazy loading example
const TrainingModule = lazy(() => import('./TrainingModule'));

// Component memoization
const OptimizedComponent = memo(({ data }: Props) => {
  return <div>{data}</div>;
});

// Hook optimization
const useTrainingData = () => {
  return useMemo(() => {
    return expensiveDataProcessing();
  }, [dependencies]);
};
```

### 🔧 Performance Monitoring

**Development Tools**
```bash
npm run build:analyze    # Bundle size analysis
npm run lighthouse       # Performance audit
```

**Production Monitoring**
- Web Vitals tracking
- Error monitoring with Sentry
- Performance budgets in CI/CD

## 🧪 Quality Assurance

### ✅ Definition of Done

**Component Completion Criteria**
- [ ] TypeScript interfaces defined
- [ ] All variants implemented
- [ ] Storybook stories created
- [ ] Unit tests written (>80% coverage)
- [ ] Accessibility tests passing
- [ ] Mobile responsiveness verified
- [ ] Performance impact assessed
- [ ] Documentation updated

**Pull Request Checklist**
- [ ] Code follows project conventions
- [ ] All tests passing
- [ ] Accessibility compliance verified
- [ ] Mobile testing completed
- [ ] Performance impact acceptable
- [ ] Storybook stories updated
- [ ] Documentation current

### 🔍 Code Review Guidelines

**Review Focus Areas**
1. **Accessibility**: WCAG compliance and screen reader testing
2. **Performance**: Bundle impact and runtime efficiency
3. **TypeScript**: Type safety and interface design
4. **Design System**: Consistency with established patterns
5. **Testing**: Coverage and test quality

**Review Process**
- Automated checks must pass before review
- At least one accessibility-focused reviewer
- Performance impact assessment required
- Mobile experience verification needed

## 🛠️ Troubleshooting Guide

### 🐛 Common Issues

**Development Environment**
```bash
# Clean install if dependencies are problematic
npm run clean:install

# Reset TypeScript cache
npx tsc --build --clean

# Clear React scripts cache
npm start -- --reset-cache
```

**Storybook Issues**
```bash
# Clear Storybook cache
npx storybook clean

# Rebuild Storybook
npm run build-storybook
```

**Performance Problems**
```bash
# Analyze bundle size
npm run build:analyze

# Check for memory leaks
npm run dev
# Use Chrome DevTools Performance tab
```

### 🔧 Quick Fixes

**TypeScript Errors**
- Check import paths and type definitions
- Verify component prop interfaces
- Ensure proper TypeScript configuration

**Accessibility Issues**
- Verify ARIA labels and roles
- Check keyboard navigation order
- Test with screen reader

**Styling Problems**
- Verify Tailwind class names
- Check responsive breakpoints
- Validate design token usage

## 📞 Getting Help

### 👥 Team Contacts

**Technical Questions**
- Frontend Lead: Architecture and complex implementations
- Design System: Component patterns and tokens
- Accessibility Specialist: WCAG compliance and testing

**Process Questions**
- Development workflow and git procedures
- Testing strategies and requirements
- Performance optimization techniques

### 📚 Resources

**Documentation**
- `src/design-system/README.md` - Design system guidelines
- Storybook at http://localhost:6006 - Component documentation
- This guide for development processes

**External Resources**
- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### 🎯 Success Tips

**Productivity Boosters**
1. **Start with Storybook**: Develop components in isolation first
2. **Use Design Tokens**: Leverage the design system for consistency
3. **Test Early**: Write tests as you develop, not after
4. **Mobile First**: Design for mobile, enhance for desktop
5. **Accessibility Always**: Consider accessibility from the start

**Common Pitfalls to Avoid**
- Building components without checking existing design system
- Ignoring accessibility until the end
- Not testing on real mobile devices
- Implementing custom solutions when design tokens exist
- Skipping Storybook documentation

---

**🏗️ Welcome to the RoofER Training System frontend team! Together, we're building the future of roofing industry education.**

*This guide is living documentation - please contribute improvements and updates as you discover better practices.*