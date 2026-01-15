'use client';

import React from 'react';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return <Fallback error={this.state.error} resetError={this.handleReset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-[#081410] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3 text-rose-400">
          <AlertTriangle className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Ups, etwas ist schiefgelaufen</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-white/70">
            Es ist ein unerwarteter Fehler aufgetreten. Wir wurden automatisch benachrichtigt und arbeiten an einer Lösung.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-white/50 hover:text-white/70 mb-2">
                Fehlerdetails (nur Development)
              </summary>
              <pre className="text-xs bg-black/40 p-4 rounded-lg overflow-auto text-white/60">
                {error.message}
                {'\n\n'}
                {error.stack}
              </pre>
            </details>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={resetError}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Neu laden
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
          >
            Zur Startseite
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;

