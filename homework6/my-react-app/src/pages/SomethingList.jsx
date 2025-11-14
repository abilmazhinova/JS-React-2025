import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as itemsService from '../services/itemsService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import Card from '../components/Card';
import './SomethingList.css'; 

export default function SomethingList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // получаю поисковый запрос из URL - это создает ?q= в адресной строке
  const query = searchParams.get('q') || '';

  // загружаются данные при изменении состояния поиска 
  useEffect(() => {
    setLoading(true);
    itemsService
      .getAll(query)
      .then((data) => {
        setItems(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query]); // при изменении ?q= перезагружаются данные

  // обработчик поиска - обновляет URL с параметром ?q=
  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value }); 
    } else {
      setSearchParams({});
    }
  };

  // обработчик отправки формы поиска
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // поиск работает в реальном времени, эта функция для предотвращения перезагрузки
  };

  // очистка поиска
  const handleClearSearch = () => {
    setSearchParams({});
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div className="something-list">
      <h1>Products</h1>
      
      {/* Поисковик и его форма*/}
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search products..."
          className="search-input"
        />
        <button 
          onClick={handleSearchSubmit}
          className="search-btn"
        >
          Search
        </button>
        {query && (
          <button 
            onClick={handleClearSearch} 
            className="clear-btn"
          >
            Clear
          </button>
        )}
      </div>

      {/* резы */}
      {items.length === 0 && query ? (
        <div className="no-results">
          No products found for "{query}"
        </div>
      ) : items.length === 0 ? (
        <div className="no-results">
          No products available
        </div>
      ) : (
        <>
          {query && (
            <div className="search-info">
              Showing results for "{query}"
            </div>
          )}
          <div className="cards-grid">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}