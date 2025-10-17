import { Article, Paginated, ArticleFilters } from './types';
import { ArticleInput } from './validators';
export interface ArticlesRepository {
  list(filters: ArticleFilters): Promise<Paginated<Article>>;
  get(id: string): Promise<Article>;
  create(input: ArticleInput): Promise<Article>;
  update(id: string, input: ArticleInput): Promise<Article>;
  rate(id: string, rating: number): Promise<Article>;
  categories(): Promise<
    {
      id: string;
      name: string;
      subcategories?: { id: string; name: string }[];
    }[]
  >;
}
