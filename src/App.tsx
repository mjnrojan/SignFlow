import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './components/layout/AppLayout';
import { PageSkeleton } from './components/shared/PageSkeleton';
import { useUIStore } from './lib/stores/useUIStore';

// Lazy-loaded route pages
const Dashboard = React.lazy(() => import('./app/dashboard/index'));
const DocumentsList = React.lazy(() => import('./app/documents/index'));
const DocumentUpload = React.lazy(() => import('./app/documents/upload/index'));
const DocumentView = React.lazy(() => import('./app/documents/view/index'));
const DocumentEditor = React.lazy(() => import('./app/document-editor/index'));
const Landing = React.lazy(() => import('./app/landing/index'));
const Login = React.lazy(() => import('./app/login/index'));
const Signup = React.lazy(() => import('./app/signup/index'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AuthLayout } from './components/layout/AuthLayout';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public landing route */}
            <Route path="/" element={
              <Suspense fallback={<PageSkeleton />}>
                <Landing />
              </Suspense>
            } />

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Login />
                </Suspense>
              } />
              <Route path="/signup" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Signup />
                </Suspense>
              } />
            </Route>

            {/* Protected layout routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="/documents"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <DocumentsList />
                  </Suspense>
                }
              />
              <Route
                path="/documents/upload"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <DocumentUpload />
                  </Suspense>
                }
              />
              <Route
                path="/documents/:id"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <DocumentView />
                  </Suspense>
                }
              />
              <Route
                path="/documents/:id/edit"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <DocumentEditor />
                  </Suspense>
                }
              />
              <Route
                path="/templates"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">Templates</h1>
                      <p className="text-muted-foreground mt-1 font-['Syne']">Coming soon</p>
                    </div>
                  </Suspense>
                }
              />
              <Route
                path="/analytics"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">Analytics</h1>
                      <p className="text-muted-foreground mt-1 font-['Syne']">Coming soon</p>
                    </div>
                  </Suspense>
                }
              />
              <Route
                path="/vault"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">Secure Vault</h1>
                      <p className="text-muted-foreground mt-1 font-['Syne']">Coming soon</p>
                    </div>
                  </Suspense>
                }
              />
              <Route
                path="/contacts"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">Contacts</h1>
                      <p className="text-muted-foreground mt-1 font-['Syne']">Coming soon</p>
                    </div>
                  </Suspense>
                }
              />
              <Route
                path="/settings"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">Settings</h1>
                      <p className="text-muted-foreground mt-1 font-['Syne']">Coming soon</p>
                    </div>
                  </Suspense>
                }
              />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
