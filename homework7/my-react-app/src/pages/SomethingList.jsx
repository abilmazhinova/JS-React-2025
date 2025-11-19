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
  

  const query = searchParams.get('q') || '';

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
  }, [query]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value }); 
    } else {
      setSearchParams({});
    }
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div className="something-list">
      <h1>Products</h1>
      
      {}
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

      {}
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