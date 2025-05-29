import React, { Component, type ReactNode } from 'react';
import { toast } from 'react-toastify';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Tampilkan error dengan toast
    toast.error(`💥 Terjadi kesalahan: ${error.message}`, {
      toastId: 'boundary-error', // agar tidak muncul berulang
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{ padding: '1rem', textAlign: 'center', color: 'red' }}>
            <h2>Oops! Terjadi kesalahan.</h2>
            <p>{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
