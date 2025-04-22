import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        const user = await authService.checkAuthStatus();
        console.log('Auth check result:', { user });
        setAuthenticated(!!user);
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div>Checking authentication...</div>
      </div>
    );
  }

  if (!authenticated) {
    console.log('Not authenticated, redirecting to login...');
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Authenticated, rendering protected content...');
  return children;
};

export default ProtectedRoute; 