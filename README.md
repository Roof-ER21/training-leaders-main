# 🏗️ RoofER Advanced Training System

An intelligent roofing industry training platform powered by **Agnes AI** for comprehensive safety education and skill development.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-roof--er--training--system.vercel.app-blue)](https://roof-er-training-system.vercel.app)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-blue)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-8.4.7-pink)](https://storybook.js.org/)

## 🎯 Project Overview

The RoofER Advanced Training System provides comprehensive training modules for roofing professionals with:
- **10 Interactive Training Modules** covering all aspects of roofing safety and techniques
- **Agnes AI Coaching** for personalized learning experiences
- **Progress Tracking** with detailed analytics
- **Accessibility-First Design** (WCAG 2.1 AA compliant)
- **Mobile-Responsive Interface** for field use

### 🚀 Live System
- **Production**: https://roof-er-training-system.vercel.app
- **Status**: Fully operational with all 10 modules active

## 🏗️ Architecture & Tech Stack

### Frontend Framework
- **React 19.1.1** with TypeScript
- **Tailwind CSS 4.1** for styling
- **Lucide React** for icons
- **Create React App** foundation

### Development Tools
- **Storybook 8.4** for component development
- **ESLint + Prettier** for code quality
- **Husky + lint-staged** for git hooks
- **TypeScript** strict mode enabled

### Design System
- **Professional roofing industry color palette**
- **WCAG 2.1 AA accessibility compliance**
- **Mobile-first responsive design**
- **Component-driven architecture**

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git for version control

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd roof-er-training-live

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📚 Development Scripts

### Core Development
```bash
npm start              # Start development server with hot reload
npm run dev            # Alternative to npm start
npm run build          # Production build
npm test               # Run test suite
npm run test:coverage  # Run tests with coverage report
```

### Code Quality
```bash
npm run lint           # Check code with ESLint
npm run lint:fix       # Fix ESLint issues automatically
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting
npm run type-check     # TypeScript type checking
npm run pre-commit     # Run all checks (lint, format, type-check)
```

### Component Development
```bash
npm run storybook      # Start Storybook on port 6006
npm run build-storybook # Build Storybook for deployment
npm run serve-storybook # Serve built Storybook
```

### Deployment & Analysis
```bash
npm run deploy         # Deploy to production (Vercel)
npm run deploy:staging # Deploy to staging environment
npm run deploy:preview # Create preview deployment
npm run build:analyze  # Analyze bundle size
npm run lighthouse     # Run Lighthouse performance audit
```

### Maintenance
```bash
npm run clean          # Clean build cache
npm run clean:install  # Fresh install (removes node_modules)
npm run audit          # Security audit
npm run outdated       # Check for outdated packages
```

## 🎨 Design System

### Color Palette
- **Primary**: Professional roofing blue (#3b82f6)
- **Secondary**: Construction orange (#f59e0b)
- **Success**: Safety green (#22c55e)
- **Warning**: Caution yellow (#eab308)
- **Error**: Danger red (#ef4444)

### Typography
- **Font Family**: Inter (sans-serif)
- **Scale**: 12px - 60px responsive scale
- **Line Height**: Optimized for readability

### Components
Located in `src/design-system/`:
- **Design Tokens** (`tokens.ts`): Colors, typography, spacing
- **Component Variants** (`components.ts`): Button, input, card patterns
- **Guidelines** (`README.md`): Usage and accessibility guidelines

## 📱 Responsive Breakpoints

```typescript
xs: '475px'   // Extra small devices
sm: '640px'   // Small devices (mobile)
md: '768px'   // Medium devices (tablet)
lg: '1024px'  // Large devices (desktop)
xl: '1280px'  // Extra large devices
2xl: '1536px' // Ultra wide devices
```

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 minimum ratio
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Alternative Text**: All images and icons properly labeled

### Development Accessibility Tools
```bash
# Keyboard shortcuts (development only)
Ctrl/Cmd + Shift + A  # Run accessibility audit
Ctrl/Cmd + Shift + F  # Highlight focusable elements
Ctrl/Cmd + Shift + R  # Remove focus highlights
```

## 🧪 Testing Strategy

### Unit Testing
- **React Testing Library** for component testing
- **Jest** for test runner
- **User Event** for interaction testing

### Visual Testing
- **Storybook** for component documentation
- **Chromatic** for visual regression testing (optional)

### Accessibility Testing
- **axe-core** integration for automated a11y testing
- **Manual testing** with screen readers

### Performance Testing
- **Lighthouse** for performance auditing
- **Bundle analyzer** for size optimization
- **Web Vitals** monitoring

## 🌿 Git Workflow

### Branch Strategy
```
main         # Production-ready code
├── develop  # Integration branch for features
├── staging  # Pre-production testing
└── feature/* # Feature development branches
```

### Commit Convention
```bash
feat: add new training module component
fix: resolve accessibility issue in navigation
docs: update API documentation
style: format code with prettier
refactor: optimize component performance
test: add unit tests for button component
```

### Pre-commit Hooks
Automatically runs on every commit:
- ESLint code linting
- Prettier code formatting
- TypeScript type checking
- Test suite execution

## 📦 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Basic UI elements (Button, Input, etc.)
│   └── features/     # Feature-specific components
├── design-system/    # Design tokens and guidelines
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── contexts/        # React context providers
├── pages/           # Page components
└── assets/          # Static assets (images, icons)

.storybook/          # Storybook configuration
public/              # Public assets
build/               # Production build output
```

## 🔧 Environment Configuration

### Development Environment
```bash
# .env.development
FAST_REFRESH=true
REACT_APP_ENABLE_DEBUG_MODE=true
REACT_APP_AGNES_DEBUG_MODE=true
REACT_APP_ENABLE_A11Y_DEBUG=true
```

### Production Environment
```bash
# .env.production
GENERATE_SOURCEMAP=false
REACT_APP_ENABLE_DEBUG_MODE=false
REACT_APP_ENABLE_ANALYTICS=true
```

## 🤖 Agnes AI Integration

### Features
- **Intelligent Coaching**: Personalized training recommendations
- **Progress Tracking**: Advanced analytics and insights
- **Interactive Learning**: Conversational training experience
- **Safety Guidance**: Real-time safety tips and best practices

### Configuration
```typescript
// Agnes AI settings
agnesConfig: {
  apiKey: process.env.REACT_APP_AGNES_API_KEY,
  debugMode: process.env.REACT_APP_AGNES_DEBUG_MODE === 'true',
  enableLogs: process.env.REACT_APP_ENABLE_TRAINING_LOGS === 'true',
}
```

## 📊 Performance Optimization

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Strategies
- **Code Splitting**: Route-based and component-based
- **Lazy Loading**: Images and non-critical components
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Service worker and browser caching

## 🚀 Deployment

### Vercel (Current Platform)
```bash
npm run deploy         # Deploy to production
npm run deploy:staging # Deploy to staging
npm run deploy:preview # Create preview deployment
```

### Build Optimization
```bash
npm run build:analyze  # Analyze bundle size
npm run lighthouse     # Performance audit
```

## 🛠️ Development Best Practices

### Code Quality
- **TypeScript strict mode** enabled
- **ESLint + Prettier** for consistent formatting
- **Pre-commit hooks** for automated quality checks
- **Component-driven development** with Storybook

### Component Development
- **Accessibility-first** approach
- **Mobile-first** responsive design
- **Performance optimization** with memoization
- **Comprehensive testing** with React Testing Library

### Naming Conventions
- **PascalCase**: Component names (`Button`, `TrainingModule`)
- **camelCase**: Variables and functions (`handleClick`, `trainingData`)
- **kebab-case**: File names (`training-module.tsx`, `button.stories.tsx`)
- **SCREAMING_SNAKE_CASE**: Constants (`MAX_RETRY_ATTEMPTS`)

## 📖 Documentation

### Component Documentation
- **Storybook**: Interactive component documentation
- **JSDoc**: Inline code documentation
- **TypeScript**: Strong typing for API contracts

### API Documentation
- **Interface definitions** in TypeScript
- **Usage examples** in Storybook stories
- **Accessibility guidelines** in design system docs

## 🤝 Contributing

### For New Team Members

1. **Setup Development Environment**
   ```bash
   git clone <repository-url>
   cd roof-er-training-live
   npm install
   cp .env.example .env.local
   npm start
   ```

2. **Run Storybook for Component Development**
   ```bash
   npm run storybook
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Follow Development Standards**
   - Write accessible components
   - Add comprehensive tests
   - Create Storybook stories
   - Follow TypeScript best practices

5. **Submit Pull Request**
   - Ensure all tests pass
   - Follow commit message conventions
   - Include accessibility considerations

### Development Workflow
1. **Start with Design System**: Check existing components first
2. **Component Development**: Use Storybook for isolated development
3. **Accessibility Testing**: Use development tools and manual testing
4. **Performance Testing**: Monitor bundle size and runtime performance
5. **Documentation**: Update Storybook stories and README as needed

## 📞 Support & Resources

### Development Resources
- **Storybook**: http://localhost:6006 (when running)
- **Design System**: `src/design-system/README.md`
- **Component Library**: Storybook documentation
- **Accessibility Guidelines**: WCAG 2.1 AA standards

### External Resources
- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**🏗️ Built for the roofing industry, by frontend professionals.**
