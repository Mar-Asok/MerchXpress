import api from './api';

export const authService = {
  async register(userData) {
    try {
      console.log('AuthService: Attempting registration with:', userData);
      console.log('API base URL:', api.defaults.baseURL);
      
      const response = await api.post('/register', userData);
      
      console.log('AuthService: Registration response:', response);
      console.log('AuthService: Response data:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('AuthService: Registration error details:');
      console.error('- Error object:', error);
      console.error('- Error response:', error.response);
      console.error('- Error response data:', error.response?.data);
      console.error('- Error response status:', error.response?.status);
      console.error('- Error response headers:', error.response?.headers);
      console.error('- Error message:', error.message);
      
      // Check if it's a network error
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error: Unable to connect to server. Make sure your Laravel backend is running on http://localhost:8000');
      }
      
      // Check if it's a CORS error
      if (error.message.includes('CORS') || error.message.includes('Cross-Origin')) {
        throw new Error('CORS error: Please check your Laravel CORS configuration');
      }
      
      throw error.response?.data || error.message;
    }
  },

  async login(credentials) {
    try {
      console.log('AuthService: Attempting login');
      const response = await api.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('AuthService: Login error:', error);
      throw error.response?.data || error.message;
    }
  },

  async logout() {
    try {
      await api.post('/logout');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('AuthService: Logout error:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};