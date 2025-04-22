import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.checkAuthStatus();
        if (user) {
          setUser(user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect to login if logout fails
      window.location.href = '/login';
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome, {user.displayName || user.name || 'User'}!</h1>
        {user.email && <p>Email: {user.email}</p>}
        {user.photo && <img src={user.photo} alt="Profile" className="profile-photo" />}
      </div>

      <div className="features-section">
        <h2>Your Dashboard</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Profile</h3>
            <p>View and edit your profile information</p>
          </div>
          <div className="feature-card">
            <h3>Settings</h3>
            <p>Customize your account settings</p>
          </div>
          <div className="feature-card">
            <h3>Activity</h3>
            <p>View your recent activity</p>
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Home; 