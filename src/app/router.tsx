import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@features/ui/components/AppLayout';
import ArticlesListPage from '@features/articles/routes/ArticlesListPage';
import ArticleDetailPage from '@features/articles/routes/ArticleDetailPage';
import CategoriesPage from '@features/articles/routes/CategoriesPage';
import NewArticlePage from '@features/articles/routes/NewArticlePage';
import EditArticlePage from '@features/articles/routes/EditArticlePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/articles" replace /> },
      { path: 'articles', element: <ArticlesListPage /> },
      { path: 'articles/categories', element: <CategoriesPage /> },
      { path: 'articles/new', element: <NewArticlePage /> },
      { path: 'articles/:id', element: <ArticleDetailPage /> },
      { path: 'articles/:id/edit', element: <EditArticlePage /> },
      {
        path: '*',
        element: (
          <div className="container">
            <h2>Not Found</h2>
          </div>
        ),
      },
    ],
  },
]);
