import { Link } from 'react-router-dom';
import { Article } from '@domain/articles/types';
import Badge from '@shared/ui/Badge';
import { useFavorites } from '@app/contexts/favorites';

export default function ArticleCard({ a }: { a: Article }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(a.id);

  return (
    <div className="card">
      <div
        className="row"
        style={{ justifyContent: 'space-between' }}
      >
        <h3 className="h">
          <Link className="link" to={`/articles/${a.id}`}>
            {a.title}
          </Link>
        </h3>
        <button onClick={() => toggle(a.id)}>
          {fav ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
      <div className="row">
        <Badge>{a.category}</Badge>
        {a.subcategory ? <Badge>{a.subcategory}</Badge> : null}
        <Badge>Rating {a.rating}</Badge>
      </div>
      <p>{a.body.slice(0, 160)}...</p>
      <div className="row">
        <Link className="link" to={`/articles/${a.id}`}>
          Open
        </Link>
        <Link className="link" to={`/articles/${a.id}/edit`}>
          Edit
        </Link>
      </div>
    </div>
  );
}
