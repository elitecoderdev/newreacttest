import { useNavigate } from 'react-router-dom';
import { useCreateArticle } from '../hooks/useArticles';
import ArticleForm from '../components/ArticleForm';
import { ArticleInput } from '@domain/articles/validators';

export default function NewArticlePage() {
  const create = useCreateArticle();
  const navigate = useNavigate();
  function onSubmit(v: ArticleInput) {
    create.mutate(v, {
      onSuccess: (a) => navigate(`/articles/${a.id}`),
    });
  }
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h2 className="h">New Article</h2>
      <ArticleForm onSubmit={onSubmit} />
    </div>
  );
}
