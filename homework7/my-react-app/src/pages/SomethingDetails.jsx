import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as itemsService from '../services/itemsService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import './SomethingDetails.css';

export default function SomethingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    itemsService
      .getById(id)
      .then(setItem)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="product-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>
      
      <div className="product-details-container">
        <div className="product-image-section">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="product-main-image"
          />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{item.title}</h1>
          <p className="product-description">{item.description}</p>
          
          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Brand:</span>
              <span className="meta-value">{item.brand || 'No brand'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{item.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Price:</span>
              <span className="product-price">${item.price}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Rating:</span>
              <span className="rating-value">{item.rating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
