import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto p-8 bg-slate-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Ops! Algo deu errado</h2>
            <p className="text-blue-200 mb-6">
              Desculpe pelo inconveniente. Nossa equipe foi notificada e está trabalhando na solução.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
