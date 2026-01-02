import axios from 'axios';

const API_BASE_URL = 'https://api.yourmarketplace.com/seller/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('seller_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Seller endpoints
export const sellerApi = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  register: (sellerData) => api.post('/auth/register', sellerData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  
  // Profile
  getProfile: () => api.get('/profile'),
  updateProfile: (profileData) => api.put('/profile', profileData),
  updateKYC: (kycData) => api.post('/profile/kyc', kycData),
  
  // Dashboard
  getDashboardStats: () => api.get('/dashboard/stats'),
  getRecentOrders: (limit = 10) => api.get(`/dashboard/recent-orders?limit=${limit}`),
  getSalesChart: (period = '30d') => api.get(`/dashboard/sales-chart?period=${period}`),
  
  // Settings
  getSettings: () => api.get('/settings'),
  updateSettings: (settings) => api.put('/settings', settings),
  
  // Payouts
  getPayouts: () => api.get('/payouts'),
  requestWithdrawal: (amount) => api.post('/payouts/withdraw', { amount }),
  getPayoutHistory: (params) => api.get('/payouts/history', { params }),
  
  // Documents
  uploadDocument: (type, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};