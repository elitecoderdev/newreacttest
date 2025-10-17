import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProviders } from '@app/providers';
import ArticleForm from '@features/articles/components/ArticleForm';
import { vi } from 'vitest';

vi.mock('@infra/articles/repository', () => ({
  articlesRepository: {
    categories: vi
      .fn()
      .mockResolvedValue([
        { id: 'technology', name: 'Technology', subcategories: [] },
      ]),
  },
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}

it('validates required fields', async () => {
  const onSubmit = vi.fn();
  render(<ArticleForm onSubmit={onSubmit} />, { wrapper: Wrapper });
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /save/i }));
  expect(onSubmit).not.toHaveBeenCalled();
});
