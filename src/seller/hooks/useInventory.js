import { useState, useCallback } from 'react';
import { productApi } from '../services/product.api';

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchInventory = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await productApi.getInventory(params);
      setInventory(response.data.products);
      setStats(response.data.stats);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch inventory');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStock = useCallback(async (productId, stockData) => {
    try {
      setLoading(true);
      const response = await productApi.updateStock(productId, stockData);
      
      // Update local state
      setInventory(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, ...response.data }
          : product
      ));
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update stock');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkUpdateStock = useCallback(async (updates) => {
    try {
      setLoading(true);
      const response = await productApi.bulkUpdateStock(updates);
      
      // Update local state
      setInventory(prev => prev.map(product => {
        const update = updates.find(u => u.productId === product.id);
        return update ? { ...product, currentStock: update.newStock } : product;
      }));
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Bulk update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLowStockAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productApi.getLowStockAlerts();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch alerts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchInventory = useCallback(async (query) => {
    try {
      setLoading(true);
      const response = await productApi.getInventory({ search: query });
      setInventory(response.data.products);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      const response = await productApi.getInventory({ category });
      setInventory(response.data.products);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Filter failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportInventory = useCallback(async (params) => {
    try {
      const response = await productApi.exportProducts(params);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inventory-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Export failed');
      throw err;
    }
  }, []);

  return {
    inventory,
    stats,
    loading,
    error,
    fetchInventory,
    updateStock,
    bulkUpdateStock,
    getLowStockAlerts,
    searchInventory,
    filterByCategory,
    exportInventory,
  };
};