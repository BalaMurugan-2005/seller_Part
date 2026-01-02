import { useState, useEffect } from 'react';
import { sellerApi } from '../services/seller.api';

export const useSellerAuth = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('seller_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await sellerApi.getProfile();
      setSeller(response.data);
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('seller_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await sellerApi.login({ email, password });
      const { token, seller } = response.data;
      
      localStorage.setItem('seller_token', token);
      setSeller(seller);
      return { success: true, data: seller };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await sellerApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('seller_token');
      setSeller(null);
    }
  };

  const register = async (sellerData) => {
    try {
      setLoading(true);
      const response = await sellerApi.register(sellerData);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await sellerApi.updateProfile(profileData);
      setSeller(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    seller,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!seller,
  };
};