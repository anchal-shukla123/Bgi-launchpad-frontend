// Auth Context - Global authentication state
// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../api/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data:', e);
        apiService.logout();
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiService.login(email, password);
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiService.register(userData);
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
      setUser(null);
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
      // Force logout even if API call fails
      setUser(null);
      window.location.href = '/login';
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const isHOD = () => {
    return hasRole('HOD') || hasRole('ADMIN');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    isHOD,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;