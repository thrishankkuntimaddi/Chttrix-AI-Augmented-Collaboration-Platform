/**
 * ErrorBoundary Component - PHASE 0 DAY 2
 * 
 * Catches unhandled React errors to prevent white screen of death
 * Provides graceful fallback UI instead of crashing
 * 
 * Effective: 2026-01-31
 */

import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so next render shows fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('🔥 UI Error Caught by ErrorBoundary:', error);
        console.error('Component Stack:', errorInfo.componentStack);

        // Store error details in state for potential display
        this.setState({
            error,
            errorInfo
        });

        // TODO: Send to error reporting service (e.g., Sentry)
        // Sentry.captureException(error, { extra: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI when error occurs
            return (
                <div style={{
                    padding: 24,
                    maxWidth: 600,
                    margin: '50px auto',
                    textAlign: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    <h2 style={{ color: '#d32f2f', marginBottom: 16 }}>
                        ⚠️ Something went wrong
                    </h2>
                    <p style={{ color: '#666', marginBottom: 24 }}>
                        The application encountered an unexpected error.
                        Please refresh the page or contact support if the problem persists.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px',
                            fontSize: 16,
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }}
                    >
                        Reload Page
                    </button>

                    {/* Show error details in development */}
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{
                            marginTop: 24,
                            textAlign: 'left',
                            backgroundColor: '#f5f5f5',
                            padding: 16,
                            borderRadius: 4
                        }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                Error Details (Dev Only)
                            </summary>
                            <pre style={{
                                fontSize: 12,
                                overflow: 'auto',
                                marginTop: 12,
                                color: '#d32f2f'
                            }}>
                                {this.state.error.toString()}
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
