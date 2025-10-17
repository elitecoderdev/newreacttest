import { ArticlesRepository } from '@domain/articles/ports';
import {
  Article,
  Paginated,
  ArticleFilters,
} from '@domain/articles/types';
import { api } from './api';

function qp(filters: ArticleFilters) {
  const p = new URLSearchParams();
  if (filters.q) p.set('q', filters.q);
  if (filters.category) p.set('category', filters.category);
  if (filters.subcategory) p.set('subcategory', filters.subcategory);
  p.set('page', String(filters.page ?? 1));
  return p.toString();
}

export const articlesRepository: ArticlesRepository = {
  async list(filters) {
    const { data } = await api.get<Paginated<Article>>(
      `/articles?${qp(filters)}`
    );
    return data;
  },

  async get(id) {
    const { data } = await api.get<Article>(`/articles/${id}`);
    return data;
  },
  async create(input) {
    const { data } = await api.post<Article>('/articles', input);
    return data;
  },
  async update(id, input) {
    const { data } = await api.put<Article>(`/articles/${id}`, input);
    return data;
  },
  async rate(id, rating) {
    const { data } = await api.post<Article>(`/articles/${id}/rate`, {
      rating,
    });
    return data;
  },
  async categories() {
    const { data } = await api.get(`/categories`);
    return data;
  },
};
