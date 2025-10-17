import { http, HttpResponse } from 'msw';
import { articlesSeed, categoriesSeed } from './seed';
import { Article } from '@domain/articles/types';
import { ArticleInput } from '@domain/articles/validators';

let articles = [...articlesSeed];

function paginate<T>(arr: T[], page: number, size: number) {
  const total = arr.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const start = (page - 1) * size;
  const data = arr.slice(start, start + size);
  return { data, page, totalPages, total };
}

export const handlers = [
  http.get('/api/categories', () => {
    return HttpResponse.json(categoriesSeed);
  }),

  http.get('/api/articles', ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category') || '';
    const subcategory = url.searchParams.get('subcategory') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    let filtered = [...articles];
    if (q) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q.toLowerCase()) ||
          a.body.toLowerCase().includes(q.toLowerCase())
      );
    }
    if (category)
      filtered = filtered.filter((a) => a.category === category);
    if (subcategory)
      filtered = filtered.filter(
        (a) => a.subcategory === subcategory
      );

    const res = paginate(filtered, page, 10);
    return HttpResponse.json(res);
  }),

  http.get('/api/articles/:id', ({ params }) => {
    const { id } = params as { id: string };
    const a = articles.find((x) => x.id === id);
    if (!a) return new HttpResponse('Not found', { status: 404 });
    return HttpResponse.json(a);
  }),

  http.post('/api/articles', async ({ request }) => {
    const body = (await request.json()) as ArticleInput;
    const id = String(
      articles.length
        ? Math.max(...articles.map((a) => Number(a.id))) + 1
        : 1
    );
    const now = new Date().toISOString();
    const a: Article = {
      id,
      title: body.title,
      body: body.body,
      category: body.category,
      subcategory: body.subcategory ?? null,
      rating: 0,
      createdAt: now,
      updatedAt: now,
    };
    articles = [a, ...articles];
    return HttpResponse.json(a, { status: 201 });
  }),

  http.put('/api/articles/:id', async ({ request, params }) => {
    const { id } = params as { id: string };
    const body = (await request.json()) as ArticleInput;

    const idx = articles.findIndex((x) => x.id === id);
    if (idx === -1)
      return new HttpResponse('Not found', { status: 404 });

    const prev = articles[idx];
    const updated: Article = {
      ...prev,
      title: body.title,
      body: body.body,
      category: body.category,
      subcategory: body.subcategory ?? null,
      updatedAt: new Date().toISOString(),
    };
    articles[idx] = updated;
    return HttpResponse.json(updated);
  }),

  http.post('/api/articles/:id/rate', async ({ request, params }) => {
    const { id } = params as { id: string };
    const { rating } = (await request.json()) as { rating: number };

    const idx = articles.findIndex((x) => x.id === id);
    if (idx === -1)
      return new HttpResponse('Not found', { status: 404 });

    const updated = { ...articles[idx], rating };
    articles[idx] = updated;
    return HttpResponse.json(updated);
  }),
];
