import { Article } from '@domain/articles/types';
import { addDays } from 'date-fns';

export const categoriesSeed = [
  {
    id: 'technology',
    name: 'Technology',
    subcategories: [
      { id: 'frontend', name: 'Frontend' },
      { id: 'backend', name: 'Backend' },
    ],
  },
  { id: 'health', name: 'Health' },
  { id: 'travel', name: 'Travel' },
];

function genArticle(i: number): Article {
  const cat =
    i % 3 === 0 ? 'technology' : i % 3 === 1 ? 'health' : 'travel';
  const sub =
    cat === 'technology'
      ? i % 2 === 0
        ? 'frontend'
        : 'backend'
      : null;
  const created = addDays(new Date(2024, 0, 1), i);
  return {
    id: String(i + 1),
    title: `Article ${i + 1}`,
    body: `Content for article ${
      i + 1
    }. This is a longer text body used to simulate a realistic article with multiple sentences and structure.`,
    category: cat,
    subcategory: sub,
    rating: (i % 5) + 1,
    createdAt: created.toISOString(),
    updatedAt: created.toISOString(),
  };
}

export const articlesSeed: Article[] = Array.from({ length: 48 }).map(
  (_, i) => genArticle(i)
);
