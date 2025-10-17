import { useCategories } from '../hooks/useArticles';
import { useNavigate } from 'react-router-dom';

export default function CategoriesTree() {
  const { data } = useCategories();
  const navigate = useNavigate();
  return (
    <div className="card">
      <h3 className="h">Browse</h3>
      <ul>
        {data?.map((c) => (
          <li key={c.id} style={{ marginBottom: 8 }}>
            <button
              onClick={() =>
                navigate(`/articles?category=${c.id}&page=1`)
              }
            >
              {c.name}
            </button>
            {c.subcategories?.length ? (
              <ul>
                {c.subcategories.map((sc) => (
                  <li key={sc.id} style={{ marginTop: 4 }}>
                    <button
                      onClick={() =>
                        navigate(
                          `/articles?category=${c.id}&subcategory=${sc.id}&page=1`
                        )
                      }
                    >
                      {sc.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
