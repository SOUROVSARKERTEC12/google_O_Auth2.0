import { useState, useEffect } from 'react';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      navigate('/home');
      return;
    }

    // Check for token in URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      // Remove the token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/home');
    }

    // Check if we're returning from Google OAuth
    const code = params.get('code');
    if (code) {
      console.log('Received Google OAuth code:', code);
      handleGoogleCallback(code);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await mockLoginAPI(formData.email, formData.password);
      
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/home');
      } else {
        alert('Login failed: ' + response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleGoogleCallback = async (code) => {
    try {
      setLoading(true);
      console.log('Processing Google callback with code:', code);
      
      const callbackUrl = `${import.meta.env.VITE_API_URL}/auth/google/callback`;
      console.log('Sending code to callback URL:', callbackUrl);
      
      const response = await fetch(callbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Callback response:', data);

      if (data.success) {
        // Store the JWT token
        localStorage.setItem('token', data.token);
        // Store user data
        localStorage.setItem('user', JSON.stringify(data.user));
        // Navigate to home
        window.location.href = '/home';  // Using window.location.href for a full page reload
      } else {
        console.error('Login failed:', data);
        alert('Google login failed: ' + (data.message || 'Unknown error occurred'));
      }
    } catch (error) {
      console.error('Google callback error:', error);
      alert(`Authentication error: ${error.message}. Please check if the backend server is running.`);
    } finally {
      setLoading(false);
    }
  };

  // Mock API function for demonstration
  const mockLoginAPI = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            success: true,
            message: 'Login successful',
            user: {
              email,
              name: 'Test User'
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid credentials'
          });
        }
      }, 1000);
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="divider">
          <span>OR</span>
        </div>

        <button 
          type="button" 
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className="google-icon-wrapper">
            <GoogleIcon className="google-icon" />
          </span>
          <span className="google-btn-text">
            {loading ? 'Processing...' : 'Continue with Google'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login; 