import { useParams } from 'react-router-dom';
import { useGetArticle, useRateArticle } from '../hooks/useArticles';
import Rating from '@shared/ui/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@features/articles/state/favoritesSlice';
import { RootState } from '@app/store';

export default function ArticleDetailPage() {
  const { id = '' } = useParams();
  const { data, isError } = useGetArticle(id);
  const rate = useRateArticle(id);
  const dispatch = useDispatch();
  const ids = useSelector((s: RootState) => s.favorites.ids);
  if (isError)
    return (
      <div className="container">
        <h2>Not found</h2>
      </div>
    );
  if (!data) return <div className="container">Loading...</div>;
  const fav = ids.includes(data.id);
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <div
        className="row"
        style={{ justifyContent: 'space-between' }}
      >
        <h2 className="h">{data.title}</h2>
        <button onClick={() => dispatch(toggle(data.id))}>
          {fav ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
      <div className="row">
        <span className="badge">{data.category}</span>
        {data.subcategory ? (
          <span className="badge">{data.subcategory}</span>
        ) : null}
      </div>
      <div style={{ height: 12 }} />
      <p>{data.body}</p>
      <div style={{ height: 12 }} />
      <Rating value={data.rating} onChange={(v) => rate.mutate(v)} />
    </div>
  );
}
