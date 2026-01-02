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

// Product endpoints
export const productApi = {
  // Products
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  bulkUpdateProducts: (updates) => api.put('/products/bulk', updates),
  
  // Inventory
  getInventory: (params) => api.get('/inventory', { params }),
  updateStock: (productId, stockData) => api.put(`/inventory/${productId}/stock`, stockData),
  bulkUpdateStock: (updates) => api.put('/inventory/bulk-stock', updates),
  getLowStockAlerts: () => api.get('/inventory/low-stock'),
  
  // Categories & Attributes
  getCategories: () => api.get('/categories'),
  getAttributes: (categoryId) => api.get(`/categories/${categoryId}/attributes`),
  
  // Variants
  getVariants: (productId) => api.get(`/products/${productId}/variants`),
  createVariant: (productId, variantData) => api.post(`/products/${productId}/variants`, variantData),
  updateVariant: (variantId, variantData) => api.put(`/variants/${variantId}`, variantData),
  deleteVariant: (variantId) => api.delete(`/variants/${variantId}`),
  
  // Images
  uploadProductImages: (productId, images) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    return api.post(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteProductImage: (productId, imageId) => 
    api.delete(`/products/${productId}/images/${imageId}`),
  
  // Bulk Operations
  bulkUploadProducts: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/products/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  exportProducts: (params) => api.get('/products/export', { 
    params,
    responseType: 'blob' 
  }),
};