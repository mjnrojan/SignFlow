import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './components/layout/AppLayout';
import { PageSkeleton } from './components/shared/PageSkeleton';
import { useUIStore } from './lib/stores/useUIStore';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AuthLayout } from './components/layout/AuthLayout';
import { ErrorBoundary } from './components/error-boundary';

// Lazy-loaded route pages
const Dashboard = React.lazy(() => import('./app/dashboard/index'));
// const Analytics = React.lazy(() => import('./app/analytics/index')); // M11: merged into dashboard
const DocumentsList = React.lazy(() => import('./app/documents/index'));
// const Templates = React.lazy(() => import('./app/templates/index')); // M11: hidden for now
const Vault = React.lazy(() => import('./app/vault/index'));
const Contacts = React.lazy(() => import('./app/contacts/index'));
const Settings = React.lazy(() => import('./app/settings/index'));
const DocumentUpload = React.lazy(() => import('./app/documents/upload/index'));
const DocumentView = React.lazy(() => import('./app/documents/view/index'));
const DocumentSend = React.lazy(() => import('./app/documents/send/index'));
const DocumentEditor = React.lazy(() => import('./app/document-editor/index'));
const SigningPage = React.lazy(() => import('./app/sign/[token]/index'));
const Landing = React.lazy(() => import('./app/landing/index'));
const Login = React.lazy(() => import('./app/auth/login/index'));
const Signup = React.lazy(() => import('./app/auth/signup/index'));
const NotFound = React.lazy(() => import('./app/not-found/index'));

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

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/sign/:token',
      element: (
        <Suspense fallback={<PageSkeleton />}>
          <SigningPage />
        </Suspense>
      ),
    },
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
            // M11: Analytics merged into dashboard — route hidden
            // {
            //   path: '/analytics',
            //   element: (
            //     <Suspense fallback={<PageSkeleton />}>
            //       <Analytics />
            //     </Suspense>
            //   ),
            // },
            {
              path: '/contacts',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <Contacts />
                </Suspense>
              ),
            },
            {
              path: '/settings',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <Settings />
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
            // M11: Templates hidden for now
            // {
            //   path: '/templates',
            //   element: (
            //     <Suspense fallback={<PageSkeleton />}>
            //       <Templates />
            //     </Suspense>
            //   ),
            // },
            {
              path: '/vault',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <Vault />
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
              path: '/documents/:id/send',
              element: (
                <Suspense fallback={<PageSkeleton />}>
                  <DocumentSend />
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
          ],
        },
      ],
    },
    {
      path: '/404',
      element: (
        <Suspense fallback={<PageSkeleton />}>
          <NotFound />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
