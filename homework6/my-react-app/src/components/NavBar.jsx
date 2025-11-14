import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Product Explorer</h1>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/items">Items</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
