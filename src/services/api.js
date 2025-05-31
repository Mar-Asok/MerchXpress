import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Get CSRF token before making requests
export const getCsrfToken = async () => {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
  }
};

// Auth API calls
export const authAPI = {
  signup: async (userData) => {
    await getCsrfToken();
    return api.post('/signup', userData);
  },
  
  login: async (credentials) => {
    await getCsrfToken();
    return api.post('/login', credentials);
  },
  
  logout: async () => {
    return api.post('/logout');
  },
  
  getUser: async () => {
    return api.get('/user');
  },
};

export default api;