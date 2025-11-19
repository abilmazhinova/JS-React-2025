import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ item }) {
  return (
    <div className="card">
      <img src={item.thumbnail} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description.slice(0, 60)}...</p>
      <Link to={`/items/${item.id}`}>View details</Link>
    </div>
  );
}