import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nestra_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('nestra_token', data.token);
      localStorage.setItem('nestra_user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', formData);
      localStorage.setItem('nestra_token', data.token);
      localStorage.setItem('nestra_user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success(`Welcome to Nestra, ${data.user.name.split(' ')[0]}!`);
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('nestra_token');
    localStorage.removeItem('nestra_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const saveProperty = async (propertyId) => {
    if (!user) return toast.error('Please login to save properties');
    try {
      const { data } = await api.post(`/auth/save-property/${propertyId}`);
      const updated = { ...user, savedProperties: data.savedProperties };
      localStorage.setItem('nestra_user', JSON.stringify(updated));
      setUser(updated);
      return data.saved;
    } catch { toast.error('Failed to save property'); }
  };

  const isSaved = (propertyId) => user?.savedProperties?.includes(propertyId);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, saveProperty, isSaved }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);