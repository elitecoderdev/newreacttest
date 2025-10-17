export type Category = {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
};
export type Article = {
  id: string;
  title: string;
  body: string;
  category: string;
  subcategory?: string | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
export type Paginated<T> = {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
};
export type ArticleFilters = {
  q?: string;
  category?: string;
  subcategory?: string;
  page?: number;
};
