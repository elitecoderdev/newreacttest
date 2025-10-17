import Select from '@shared/ui/Select';
import { useCategories } from '../hooks/useArticles';
import { useSearchParams } from 'react-router-dom';

export default function FiltersBar() {
  const { data } = useCategories();
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const subcategory = params.get('subcategory') || '';
  return (
    <div className="row card">
      <div style={{ width: 240 }}>
        <label>Category</label>
        <Select
          value={category}
          onChange={(e) => {
            const v = e.target.value;
            setParams((prev) => {
              const p = new URLSearchParams(prev);
              if (v) p.set('category', v);
              else {
                p.delete('category');
                p.delete('subcategory');
              }
              p.set('page', '1');
              return p;
            });
          }}
        >
          <option value="">All</option>
          {data?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
      <div style={{ width: 240 }}>
        <label>Subcategory</label>
        <Select
          value={subcategory}
          onChange={(e) => {
            const v = e.target.value;
            setParams((prev) => {
              const p = new URLSearchParams(prev);
              if (v) p.set('subcategory', v);
              else p.delete('subcategory');
              p.set('page', '1');
              return p;
            });
          }}
        >
          <option value="">All</option>
          {data
            ?.find((c) => c.id === category)
            ?.subcategories?.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name}
              </option>
            ))}
        </Select>
      </div>
    </div>
  );
}
