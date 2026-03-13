import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-8 animate-in fade-in duration-500">
            <div className="size-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-red-500/20">
               <ShieldAlert className="size-12 text-red-500" />
            </div>

            <div className="space-y-3">
               <h1 className="text-3xl font-extrabold font-['Fraunces'] tracking-tight">Something went wrong</h1>
               <p className="text-muted-foreground font-['Syne']">
                  We've encountered an unexpected error. Don't worry, your documents are safe.
               </p>
               {this.state.error && (
                 <pre className="mt-4 p-4 bg-muted rounded-xl text-[10px] text-left overflow-x-auto text-muted-foreground font-mono">
                    {this.state.error.message}
                 </pre>
               )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
               <Button 
                variant="outline" 
                className="h-12 rounded-xl font-bold gap-2 px-8" 
                onClick={() => window.location.reload()}
               >
                  <RefreshCcw className="size-4" />
                  Try Again
               </Button>
               <Button 
                className="h-12 rounded-xl font-bold gap-2 px-8 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20"
                onClick={() => window.location.href = '/dashboard'}
               >
                  <Home className="size-4" />
                  Go to Dashboard
               </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
