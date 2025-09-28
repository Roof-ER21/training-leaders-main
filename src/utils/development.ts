/**
 * Development Utilities for RoofER Training System
 *
 * Helper functions for development environment
 */

// Environment checks
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

// Feature flags
export const featureFlags = {
  enableExperimentalFeatures: process.env.REACT_APP_ENABLE_EXPERIMENTAL_FEATURES === 'true',
  enableA11yDebug: process.env.REACT_APP_ENABLE_A11Y_DEBUG === 'true',
  enableDevtools: process.env.REACT_APP_ENABLE_DEVTOOLS === 'true',
  enableDebugMode: process.env.REACT_APP_ENABLE_DEBUG_MODE === 'true',
  enablePerformanceMonitoring: process.env.REACT_APP_ENABLE_PERFORMANCE_MONITORING === 'true',
  enableTrainingLogs: process.env.REACT_APP_ENABLE_TRAINING_LOGS === 'true',
  agnesDebugMode: process.env.REACT_APP_AGNES_DEBUG_MODE === 'true',
  enableMockApi: process.env.REACT_APP_ENABLE_MOCK_API === 'true',
};

// API configuration
export const apiConfig = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  enableMockApi: featureFlags.enableMockApi,
  timeout: isDevelopment ? 10000 : 5000,
};

// Agnes AI configuration
export const agnesConfig = {
  apiKey: process.env.REACT_APP_AGNES_API_KEY || '',
  debugMode: featureFlags.agnesDebugMode,
  enableLogs: featureFlags.enableTrainingLogs,
};

// Development logger
export const devLogger = {
  log: (message: string, data?: any) => {
    if (featureFlags.enableDebugMode) {
      console.log(`[RoofER Dev] ${message}`, data || '');
    }
  },
  warn: (message: string, data?: any) => {
    if (featureFlags.enableDebugMode) {
      console.warn(`[RoofER Warning] ${message}`, data || '');
    }
  },
  error: (message: string, error?: any) => {
    if (featureFlags.enableDebugMode) {
      console.error(`[RoofER Error] ${message}`, error || '');
    }
  },
  performance: (label: string, duration: number) => {
    if (featureFlags.enablePerformanceMonitoring) {
      console.log(`[RoofER Performance] ${label}: ${duration}ms`);
    }
  },
};

// Hot reload utilities
export const hotReloadUtils = {
  // Accept hot module replacement for development
  acceptHMR: (callback?: () => void) => {
    if (isDevelopment && module.hot) {
      module.hot.accept(callback);
    }
  },

  // Dispose hot module replacement
  disposeHMR: (callback: () => void) => {
    if (isDevelopment && module.hot) {
      module.hot.dispose(callback);
    }
  },
};

// Performance monitoring
export const performanceUtils = {
  // Measure component render time
  measureRender: (componentName: string) => {
    if (!featureFlags.enablePerformanceMonitoring) return { start: () => {}, end: () => {} };

    const startTime = performance.now();

    return {
      start: () => performance.now(),
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        devLogger.performance(`${componentName} render`, duration);
        return duration;
      },
    };
  },

  // Mark performance milestones
  mark: (name: string) => {
    if (featureFlags.enablePerformanceMonitoring) {
      performance.mark(name);
    }
  },

  // Measure between marks
  measure: (name: string, startMark: string, endMark: string) => {
    if (featureFlags.enablePerformanceMonitoring) {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      devLogger.performance(name, measure.duration);
    }
  },
};

// Development accessibility helpers
export const a11yUtils = {
  // Log accessibility violations (requires axe-core in development)
  logA11yViolations: async () => {
    if (!featureFlags.enableA11yDebug || !isDevelopment) return;

    try {
      // Dynamic import to avoid bundle in production
      const axe = await import('axe-core');
      const results = await axe.run();

      if (results.violations.length > 0) {
        console.group('🔍 Accessibility Violations Found');
        results.violations.forEach(violation => {
          console.warn(`${violation.impact}: ${violation.description}`);
          console.log('Help:', violation.helpUrl);
          console.log('Elements:', violation.nodes);
        });
        console.groupEnd();
      } else {
        devLogger.log('✅ No accessibility violations found');
      }
    } catch (error) {
      devLogger.warn('Could not run accessibility checks', error);
    }
  },

  // Highlight focusable elements for debugging
  highlightFocusableElements: () => {
    if (!featureFlags.enableA11yDebug || !isDevelopment) return;

    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.outline = '2px solid red';
      htmlElement.style.outlineOffset = '2px';
      htmlElement.setAttribute('data-focus-order', (index + 1).toString());
    });

    devLogger.log(`Highlighted ${focusableElements.length} focusable elements`);
  },

  // Remove focus highlights
  removeFocusHighlights: () => {
    const highlightedElements = document.querySelectorAll('[data-focus-order]');
    highlightedElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.outline = '';
      htmlElement.style.outlineOffset = '';
      htmlElement.removeAttribute('data-focus-order');
    });
  },
};

// Development keyboard shortcuts
export const setupDevKeyboardShortcuts = () => {
  if (!isDevelopment || !featureFlags.enableDebugMode) return;

  const handleKeydown = (event: KeyboardEvent) => {
    // Ctrl/Cmd + Shift + A: Run accessibility check
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'A') {
      event.preventDefault();
      a11yUtils.logA11yViolations();
    }

    // Ctrl/Cmd + Shift + F: Highlight focusable elements
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'F') {
      event.preventDefault();
      a11yUtils.highlightFocusableElements();
    }

    // Ctrl/Cmd + Shift + R: Remove focus highlights
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'R') {
      event.preventDefault();
      a11yUtils.removeFocusHighlights();
    }
  };

  document.addEventListener('keydown', handleKeydown);

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeydown);
  };
};

// Development info panel
export const showDevInfo = () => {
  if (!isDevelopment || !featureFlags.enableDebugMode) return;

  console.group('🔧 RoofER Training System - Development Info');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('React Version:', React.version);
  console.log('Feature Flags:', featureFlags);
  console.log('API Config:', apiConfig);
  console.log('Agnes Config:', { ...agnesConfig, apiKey: agnesConfig.apiKey ? '[HIDDEN]' : 'Not set' });
  console.log('Keyboard Shortcuts:');
  console.log('  Ctrl/Cmd + Shift + A: Run accessibility check');
  console.log('  Ctrl/Cmd + Shift + F: Highlight focusable elements');
  console.log('  Ctrl/Cmd + Shift + R: Remove focus highlights');
  console.groupEnd();
};