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

// Order endpoints
export const orderApi = {
  // Orders
  getOrders: (params) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
  bulkUpdateOrders: (updates) => api.put('/orders/bulk', updates),
  
  // Order Actions
  processOrder: (id) => api.post(`/orders/${id}/process`),
  packOrder: (id) => api.post(`/orders/${id}/pack`),
  shipOrder: (id, shippingData) => api.post(`/orders/${id}/ship`, shippingData),
  cancelOrder: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
  
  // Packaging
  getPackingList: (orderId) => api.get(`/orders/${orderId}/packing-list`),
  updatePackingStatus: (orderId, items) => api.put(`/orders/${orderId}/packing`, { items }),
  generateShippingLabel: (orderId) => api.post(`/orders/${orderId}/shipping-label`),
  
  // Shipping
  getShippingMethods: () => api.get('/shipping/methods'),
  updateShippingMethod: (orderId, methodId) => api.put(`/orders/${orderId}/shipping`, { methodId }),
  trackOrder: (orderId) => api.get(`/orders/${orderId}/tracking`),
  
  // Returns & Refunds
  getReturns: (params) => api.get('/returns', { params }),
  processReturn: (returnId, decision) => api.post(`/returns/${returnId}/process`, { decision }),
  issueRefund: (orderId, refundData) => api.post(`/orders/${orderId}/refund`, refundData),
  
  // Reports
  getOrderReport: (params) => api.get('/orders/report', { params }),
  exportOrders: (params) => api.get('/orders/export', { 
    params,
    responseType: 'blob' 
  }),
  
  // Customer Communication
  sendOrderUpdate: (orderId, message) => api.post(`/orders/${orderId}/notify`, { message }),
  getOrderMessages: (orderId) => api.get(`/orders/${orderId}/messages`),
  
  // Analytics
  getOrderAnalytics: (params) => api.get('/analytics/orders', { params }),
  getOrderTimeline: (orderId) => api.get(`/orders/${orderId}/timeline`),
};