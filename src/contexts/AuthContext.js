import React, { createContext, useContext, useState, useEffect } from 'react';
// Correctly import getCsrfCookie as a named export from api.js
import { authAPI, getCsrfCookie } from '../services/api'; 

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to initialize the application's authentication state
  useEffect(() => {
    const initApp = async () => {
      // Step 1: Attempt to get the CSRF cookie from the backend.
      // This is essential for Laravel Sanctum's SPA authentication flow.
      await getCsrfCookie();
      // Step 2: After obtaining the cookie, initialize the authentication state.
      initializeAuth();
    };
    initApp();
  }, [initializeAuth]); // Added initializeAuth to dependency array to satisfy ESLint

  /**
   * Initializes the authentication state by checking for existing tokens
   * and user data in local storage, and verifying the token with the backend.
   */
  const initializeAuth = async () => {
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        // If token and user data exist, set the user and verify the token
        setUser(JSON.parse(savedUser));
        await authAPI.getUser(); // This call will fail if the token is invalid/expired
      } catch (error) {
        // If token verification fails, clear all authentication data
        console.error('Token verification failed:', error);
        clearAuthData();
      }
    }
    setLoading(false); // Authentication initialization is complete
  };

  /**
   * Clears all authentication-related data from local storage and state.
   */
  const clearAuthData = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  /**
   * Handles user login.
   * @param {object} credentials - User's email and password.
   * @returns {object} - Success status and user data or error message.
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.login(credentials);
      const { user, token } = response.data;
      
      // Store authentication data upon successful login
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      // Construct a user-friendly error message from the backend response
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.errors?.email?.[0] ||
                           'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user registration.
   * @param {object} userData - User's registration details.
   * @returns {object} - Success status and user data or error message.
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.register(userData);
      const { user, token } = response.data;
      
      // Store authentication data upon successful registration
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      // Construct a user-friendly error message from the backend response
      const errorMessage = error.response?.data?.message || 
                           'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user logout.
   */
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData(); // Always clear auth data on logout attempt
    }
  };

  /**
   * Refreshes the authentication token.
   * @returns {boolean} - True if token refresh was successful, false otherwise.
   */
  const refreshToken = async () => {
    try {
      const response = await authAPI.refresh();
      const { user, token } = response.data;
      
      // Update token and user data in local storage and state
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return true;
    } catch (error) {
      clearAuthData(); // Clear auth data if refresh fails
      return false;
    }
  };

  // The value object provided by the AuthContext
  const value = {
    user,
    login,
    register,
    logout,
    refreshToken,
    loading,
    error,
    isAuthenticated: !!user, // Convenience boolean for checking authentication status
    clearError: () => setError(null), // Function to clear current error message
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
