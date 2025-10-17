import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetArticle,
  useUpdateArticle,
} from '../hooks/useArticles';
import ArticleForm from '../components/ArticleForm';
import { ArticleInput } from '@domain/articles/validators';

export default function EditArticlePage() {
  const { id = '' } = useParams();
  const { data } = useGetArticle(id);
  const update = useUpdateArticle(id);
  const navigate = useNavigate();
  function onSubmit(v: ArticleInput) {
    update.mutate(v, {
      onSuccess: (a) => navigate(`/articles/${a.id}`),
    });
  }
  if (!data) return <div className="container">Loading...</div>;
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h2 className="h">Edit Article</h2>
      <ArticleForm
        defaultValues={{
          title: data.title,
          body: data.body,
          category: data.category,
          subcategory: data.subcategory || undefined,
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}
