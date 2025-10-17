import { z } from 'zod';
export const articleInput = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
  category: z.string(),
  subcategory: z.string().optional().nullable(),
});
export type ArticleInput = z.infer<typeof articleInput>;
