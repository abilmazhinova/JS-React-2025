
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import "./NavBar.css";

export default function NavBar() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Product Explorer</h1>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/items">Items</NavLink></li>
          
          {/* Условный рендеринг по статусу авторизации */}
          {currentUser ? (
            <>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/signup">Signup</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}