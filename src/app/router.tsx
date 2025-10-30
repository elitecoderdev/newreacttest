import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppLayout from '@features/ui/components/AppLayout';
import { Protected, RoleGate, GuestOnly } from './route-guards';

const ArticlesListPage = lazy(
  () => import('@features/articles/routes/ArticlesListPage')
);
const CategoriesPage = lazy(
  () => import('@features/articles/routes/CategoriesPage')
);
const ArticleDetailPage = lazy(
  () => import('@features/articles/routes/ArticleDetailPage')
);
const NewArticlePage = lazy(
  () => import('@features/articles/routes/NewArticlePage')
);
const EditArticlePage = lazy(
  () => import('@features/articles/routes/EditArticlePage')
);
const LoginPage = lazy(
  () => import('@features/auth/routes/LoginPage')
);

const Fallback = (
  <div className="container" style={{ paddingTop: 12 }}>
    <div className="spinner" /> Loading
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/articles" replace /> },
      {
        element: <GuestOnly />,
        children: [
          {
            path: 'login',
            element: (
              <Suspense fallback={Fallback}>
                <LoginPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <Protected />,
        children: [
          {
            path: 'articles',
            element: (
              <Suspense fallback={Fallback}>
                <ArticlesListPage />
              </Suspense>
            ),
          },
          {
            path: 'articles/categories',
            element: (
              <Suspense fallback={Fallback}>
                <CategoriesPage />
              </Suspense>
            ),
          },
          {
            path: 'articles/:id',
            element: (
              <Suspense fallback={Fallback}>
                <ArticleDetailPage />
              </Suspense>
            ),
          },
          {
            element: <RoleGate roles={['editor', 'admin']} />,
            children: [
              {
                path: 'articles/new',
                element: (
                  <Suspense fallback={Fallback}>
                    <NewArticlePage />
                  </Suspense>
                ),
              },
              {
                path: 'articles/:id/edit',
                element: (
                  <Suspense fallback={Fallback}>
                    <EditArticlePage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);
