import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { articlesRepository } from '@infra/articles/repository';
import { ArticleFilters } from '@domain/articles/types';
import { ArticleInput } from '@domain/articles/validators';
import type { Article } from '@domain/articles/types';

export function useListArticles(filters: ArticleFilters) {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: () => articlesRepository.list(filters),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useGetArticle(id: string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesRepository.get(id),
    staleTime: 30_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => articlesRepository.categories(),
    staleTime: 5 * 60_000,
  });
}

export function useCreateArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ArticleInput) =>
      articlesRepository.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

export function useUpdateArticle(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ArticleInput) =>
      articlesRepository.update(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['articles'] });
      qc.invalidateQueries({ queryKey: ['article', id] });
    },
  });
}

export function useRateArticle(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (rating: number) =>
      articlesRepository.rate(id, rating),
    onMutate: async (rating: number) => {
      await qc.cancelQueries({ queryKey: ['article', id] });
      const previous = qc.getQueryData<Article>(['article', id]);
      if (previous)
        qc.setQueryData(['article', id], { ...previous, rating });
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous)
        qc.setQueryData(['article', id], ctx.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['article', id] });
    },
  });
}
