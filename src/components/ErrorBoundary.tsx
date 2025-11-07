import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  level?: 'app' | 'module' | 'activity';
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire app
 *
 * Usage:
 * <ErrorBoundary level="app">
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Store error info in state
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to analytics
    try {
      const analytics = require('../utils/analytics').default;
      analytics.trackEvent('error_boundary_triggered', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        level: this.props.level || 'unknown',
      });
    } catch (e) {
      // Analytics might not be available yet
      console.warn('Could not track error to analytics:', e);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      // If custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { level = 'app' } = this.props;
      const { error, errorInfo } = this.state;

      // Different UI based on error level
      if (level === 'app') {
        // Critical app-level error - show full-screen error
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 text-center mb-6">
                We encountered an unexpected error. Don't worry, your progress has been saved.
              </p>

              {/* Error Details (Collapsible) */}
              {error && (
                <details className="mb-6 bg-gray-50 rounded-xl p-4">
                  <summary className="cursor-pointer font-semibold text-gray-700 flex items-center gap-2">
                    <Bug className="w-4 h-4" />
                    Technical Details
                  </summary>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Error:</p>
                      <p className="text-sm text-red-600 font-mono bg-red-50 p-2 rounded">
                        {error.message}
                      </p>
                    </div>
                    {error.stack && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Stack Trace:</p>
                        <pre className="text-xs text-gray-600 font-mono bg-gray-100 p-2 rounded overflow-x-auto max-h-40">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                    {errorInfo?.componentStack && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Component Stack:</p>
                        <pre className="text-xs text-gray-600 font-mono bg-gray-100 p-2 rounded overflow-x-auto max-h-40">
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={this.handleReload}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reload Application
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Home className="w-5 h-5" />
                  Go to Home
                </button>
              </div>

              {/* Help Text */}
              <p className="text-sm text-gray-500 text-center mt-6">
                If this error persists, please contact support with the technical details above.
              </p>
            </div>
          </div>
        );
      } else if (level === 'module') {
        // Module-level error - show inline error card
        return (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-300 shadow-lg my-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Module Loading Error
                </h3>
                <p className="text-gray-700 mb-4">
                  This module encountered an error while loading. Please try again or select a different module.
                </p>
                {error && (
                  <p className="text-sm text-red-600 font-mono bg-red-100 p-2 rounded mb-4">
                    {error.message}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={this.handleReset}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                  <button
                    onClick={this.handleGoHome}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-700 transition-all"
                  >
                    <Home className="w-4 h-4" />
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // Activity-level error - show compact error card
        return (
          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200 my-2">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Activity Error</p>
                <p className="text-sm text-gray-600">
                  This activity couldn't load. {error?.message || 'Unknown error'}
                </p>
              </div>
              <button
                onClick={this.handleReset}
                className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
