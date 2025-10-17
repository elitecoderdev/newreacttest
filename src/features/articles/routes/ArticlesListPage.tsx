import { useMemo } from 'react';
import { useListArticles } from '../hooks/useArticles';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import FiltersBar from '../components/FiltersBar';
import Pagination from '@shared/ui/Pagination';

export default function ArticlesListPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const subcategory = params.get('subcategory') || '';
  const page = parseInt(params.get('page') || '1', 10);
  const { data, isLoading, isError } = useListArticles({
    q,
    category,
    subcategory,
    page,
  });
  const items = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const kpis = useMemo(() => {
    const favs = 0;
    return [
      { label: 'Total', value: data?.total || 0 },
      { label: 'Pages', value: totalPages },
      { label: 'Page', value: page },
    ];
  }, [data, page, totalPages]);
  if (isError)
    return (
      <div className="container">
        <h2>Error</h2>
      </div>
    );
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <div className="kpis">
        {kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>
              {k.label}
            </span>
            <strong style={{ fontSize: 18 }}>{k.value}</strong>
          </div>
        ))}
      </div>
      <div style={{ height: 12 }} />
      <FiltersBar />
      <div style={{ height: 12 }} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid">
          {items.map((a) => (
            <div key={a.id} style={{ gridColumn: 'span 6' }}>
              <ArticleCard a={a} />
            </div>
          ))}
        </div>
      )}
      <div style={{ height: 12 }} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPage={(p) => {
          setParams((prev) => {
            const n = new URLSearchParams(prev);
            n.set('page', String(p));
            return n;
          });
        }}
      />
    </div>
  );
}
