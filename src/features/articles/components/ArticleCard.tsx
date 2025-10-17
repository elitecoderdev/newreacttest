import { Link } from 'react-router-dom';
import { Article } from '@domain/articles/types';
import Badge from '@shared/ui/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@features/articles/state/favoritesSlice';
import { RootState } from '@app/store';

export default function ArticleCard({ a }: { a: Article }) {
  const ids = useSelector((s: RootState) => s.favorites.ids);
  const dispatch = useDispatch();
  const fav = ids.includes(a.id);
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
        <button onClick={() => dispatch(toggle(a.id))}>
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
