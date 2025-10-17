import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  articleInput,
  ArticleInput,
} from '@domain/articles/validators';
import Input from '@shared/ui/Input';
import Select from '@shared/ui/Select';
import { useCategories } from '../hooks/useArticles';

export default function ArticleForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<ArticleInput>;
  onSubmit: (v: ArticleInput) => void;
}) {
  const { data } = useCategories();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ArticleInput>({
    resolver: zodResolver(articleInput),
    defaultValues: {
      title: '',
      body: '',
      category: '',
      subcategory: null,
      ...defaultValues,
    },
  });
  const category = watch('category');
  const subs =
    data?.find((c) => c.id === category)?.subcategories || [];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <div style={{ gridColumn: 'span 12' }}>
        <label htmlFor="title">Title</label>
        <Input id="title" {...register('title')} />
        {errors.title?.message && (
          <div style={{ color: 'var(--danger)', fontSize: 12 }}>
            {errors.title.message}
          </div>
        )}
      </div>
      <div style={{ gridColumn: 'span 12' }}>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          {...register('body')}
          className="input"
          rows={6}
        />
        {errors.body?.message && (
          <div style={{ color: 'var(--danger)', fontSize: 12 }}>
            {errors.body.message}
          </div>
        )}
      </div>
      <div style={{ gridColumn: 'span 6' }}>
        <label htmlFor="category">Category</label>
        <Select id="category" {...register('category')}>
          <option value="">Select</option>
          {data?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        {errors.category?.message && (
          <div style={{ color: 'var(--danger)', fontSize: 12 }}>
            {errors.category.message}
          </div>
        )}
      </div>
      <div style={{ gridColumn: 'span 6' }}>
        <label htmlFor="subcategory">Subcategory</label>
        <Select id="subcategory" {...register('subcategory')}>
          <option value="">None</option>
          {subs.map((sc) => (
            <option key={sc.id} value={sc.id}>
              {sc.name}
            </option>
          ))}
        </Select>
      </div>
      <div style={{ gridColumn: 'span 12', display: 'flex', gap: 8 }}>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
