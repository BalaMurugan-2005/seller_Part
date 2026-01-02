import { useState, useCallback, useEffect } from 'react';
import { sellerApi } from '../services/seller.api';

export const useSalesStats = (initialPeriod = '30d') => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState(initialPeriod);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await sellerApi.getDashboardStats();
      setStats(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchChartData = useCallback(async (selectedPeriod) => {
    try {
      setLoading(true);
      const response = await sellerApi.getSalesChart(selectedPeriod);
      setChartData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch chart data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePeriod = useCallback(async (newPeriod) => {
    setPeriod(newPeriod);
    await fetchChartData(newPeriod);
  }, [fetchChartData]);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchStats(),
        fetchChartData(period)
      ]);
    };
    
    loadData();
  }, [fetchStats, fetchChartData, period]);

  const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return null;
    const growth = ((current - previous) / previous) * 100;
    return {
      percentage: growth.toFixed(1),
      isPositive: growth >= 0,
      value: Math.abs(current - previous)
    };
  };

  const getTopProducts = useCallback((limit = 5) => {
    if (!stats?.topProducts) return [];
    return stats.topProducts.slice(0, limit);
  }, [stats]);

  const getSalesByCategory = useCallback(() => {
    if (!stats?.salesByCategory) return [];
    return stats.salesByCategory;
  }, [stats]);

  const getDailyAverage = useCallback(() => {
    if (!stats?.totalSales || !stats?.periodDays) return 0;
    return stats.totalSales / stats.periodDays;
  }, [stats]);

  const getConversionRate = useCallback(() => {
    if (!stats?.visitors || !stats?.orders) return 0;
    return (stats.orders / stats.visitors) * 100;
  }, [stats]);

  return {
    stats,
    chartData,
    period,
    loading,
    error,
    updatePeriod,
    calculateGrowth,
    getTopProducts,
    getSalesByCategory,
    getDailyAverage,
    getConversionRate,
    refresh: fetchStats
  };
};