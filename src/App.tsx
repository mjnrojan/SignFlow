import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './components/layout/AppLayout';
import { PageSkeleton } from './components/shared/PageSkeleton';
import { useUIStore } from './lib/stores/useUIStore';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AuthLayout } from './components/layout/AuthLayout';
import { useTranslation } from 'react-i18next';

// Lazy-loaded route pages
const Dashboard = React.lazy(() => import('./app/dashboard/index'));
const DocumentsList = React.lazy(() => import('./app/documents/index'));
const DocumentUpload = React.lazy(() => import('./app/documents/upload/index'));
const DocumentView = React.lazy(() => import('./app/documents/view/index'));
const DocumentEditor = React.lazy(() => import('./app/document-editor/index'));
const Landing = React.lazy(() => import('./app/landing/index'));
const Login = React.lazy(() => import('./app/auth/login/index'));
const Signup = React.lazy(() => import('./app/auth/signup/index'));

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

function App() {
  const { t } = useTranslation();

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<PageSkeleton />}>
          <Landing />
        </Suspense>
      ),
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/login',
          element: (
            <Suspense fallback={<PageSkeleton />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: '/signup',
          element: (
            <Suspense fallback={<PageSkeleton />}>
              <Signup />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
            {
              path: '/dashboard',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <Dashboard />
                </Suspense>
              ),
            },
            {
              path: '/documents',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <DocumentsList />
                </Suspense>
              ),
            },
            {
              path: '/documents/upload',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <DocumentUpload />
                </Suspense>
              ),
            },
            {
              path: '/documents/:id',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <DocumentView />
                </Suspense>
              ),
            },
            {
              path: '/documents/:id/edit',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <DocumentEditor />
                </Suspense>
              ),
            },
            {
              path: '/templates',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <div className="p-8">
                    <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">{t('sidebar.templates')}</h1>
                    <p className="text-muted-foreground mt-1 font-['Syne']">{t('common.comingSoon')}</p>
                  </div>
                </Suspense>
              ),
            },
            {
              path: '/analytics',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <div className="p-8">
                    <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">{t('sidebar.analytics')}</h1>
                    <p className="text-muted-foreground mt-1 font-['Syne']">{t('common.comingSoon')}</p>
                  </div>
                </Suspense>
              ),
            },
            {
              path: '/vault',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <div className="p-8">
                    <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">{t('sidebar.signatures')}</h1>
                    <p className="text-muted-foreground mt-1 font-['Syne']">{t('common.comingSoon')}</p>
                  </div>
                </Suspense>
              ),
            },
            {
              path: '/contacts',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <div className="p-8">
                    <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">{t('sidebar.contacts')}</h1>
                    <p className="text-muted-foreground mt-1 font-['Syne']">{t('common.comingSoon')}</p>
                  </div>
                </Suspense>
              ),
            },
            {
              path: '/settings',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <div className="p-8">
                    <h1 className="text-2xl font-bold font-['Fraunces'] text-foreground">{t('sidebar.settings')}</h1>
                    <p className="text-muted-foreground mt-1 font-['Syne']">{t('common.comingSoon')}</p>
                  </div>
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/dashboard" replace />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
