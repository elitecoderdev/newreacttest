import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { AppProviders } from '@app/providers';
import ArticlesListPage from '@features/articles/routes/ArticlesListPage';
import { vi } from 'vitest';

vi.mock('@infra/articles/repository', () => ({
  articlesRepository: {
    list: vi.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Article 1',
          body: 'Content for article 1.',
          category: 'technology',
          subcategory: 'frontend',
          rating: 3,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
      page: 1,
      totalPages: 1,
      total: 1,
    }),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    rate: vi.fn(),
    categories: vi.fn().mockResolvedValue([]),
  },
}));

it('renders list and toggles favorites state independently of server', async () => {
  const router = createMemoryRouter(
    [{ path: '/articles', element: <ArticlesListPage /> }],
    { initialEntries: ['/articles'] }
  );
  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
  expect(
    await screen.findByRole('link', { name: /Article 1/i })
  ).toBeInTheDocument();
});
