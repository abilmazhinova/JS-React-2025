import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

export default function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <div className="user-info">
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>User ID:</strong> {currentUser.uid}</p>
          <p><strong>Email Verified:</strong> {currentUser.emailVerified ? 'Yes' : 'No'}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}