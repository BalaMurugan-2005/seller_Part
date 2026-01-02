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

// Payout endpoints
export const payoutApi = {
  // Balance & Overview
  getBalance: () => api.get('/payouts/balance'),
  getOverview: () => api.get('/payouts/overview'),
  
  // Withdrawals
  requestWithdrawal: (amount) => api.post('/payouts/withdraw', { amount }),
  cancelWithdrawal: (withdrawalId) => api.delete(`/payouts/withdraw/${withdrawalId}`),
  getWithdrawalHistory: (params) => api.get('/payouts/withdrawals', { params }),
  
  // Payout History
  getPayouts: (params) => api.get('/payouts/history', { params }),
  getPayout: (id) => api.get(`/payouts/${id}`),
  downloadInvoice: (payoutId) => api.get(`/payouts/${payoutId}/invoice`, {
    responseType: 'blob'
  }),
  
  // Bank Details
  getBankDetails: () => api.get('/payouts/bank-details'),
  updateBankDetails: (bankData) => api.put('/payouts/bank-details', bankData),
  verifyBankAccount: (verificationData) => api.post('/payouts/verify-bank', verificationData),
  
  // Tax Information
  getTaxInfo: () => api.get('/payouts/tax-info'),
  updateTaxInfo: (taxData) => api.put('/payouts/tax-info', taxData),
  
  // Settings
  getPayoutSettings: () => api.get('/payouts/settings'),
  updatePayoutSettings: (settings) => api.put('/payouts/settings', settings),
  
  // Transaction Details
  getTransaction: (transactionId) => api.get(`/transactions/${transactionId}`),
  getTransactions: (params) => api.get('/transactions', { params }),
  
  // Reports
  generatePayoutReport: (params) => api.post('/payouts/report', params),
  downloadStatement: (params) => api.get('/payouts/statement', {
    params,
    responseType: 'blob'
  }),
  
  // Fees & Charges
  getFeeStructure: () => api.get('/payouts/fees'),
  getProcessingFees: (amount) => api.get(`/payouts/processing-fees?amount=${amount}`),
  
  // Notifications
  getPayoutNotifications: () => api.get('/payouts/notifications'),
  markNotificationRead: (notificationId) => api.put(`/payouts/notifications/${notificationId}/read`),
};