const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
  }

  async logout() {
    try {
      // Call backend to end session
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Important for cookies
      });

      // Clear all localStorage items
      localStorage.clear();
      
      // Clear all cookies for localhost
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }

      // Reload the page to ensure clean state
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data even if backend call fails
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }

  async checkAuthStatus() {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: 'include', // Important for cookies
      });
      
      const data = await response.json();
      console.log('Auth status response:', data);
      
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      
      if (data.authenticated && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
      } else {
        localStorage.removeItem('user');
        return null;
      }
    } catch (error) {
      console.error('Auth status check error:', error);
      localStorage.removeItem('user');
      return null;
    }
  }
}

export default new AuthService(); 