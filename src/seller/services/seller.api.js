// MOCK API IMPLEMENTATION
const mockDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const mockUser = {
  _id: 'mock_seller_id_123',
  name: 'Demo Seller',
  email: 'seller@example.com',
  role: 'seller',
  storeName: 'Demo Store',
  status: 'active',
  kycStatus: 'verified'
};

const mockToken = 'mock_jwt_token_123456789';

export const sellerApi = {
  // Auth
  login: async (credentials) => {
    await mockDelay();
    if (credentials.email === 'fail@test.com') {
      throw { response: { data: { message: 'Invalid credentials' } } };
    }
    return { data: { token: mockToken, seller: mockUser } };
  },

  register: async (sellerData) => {
    await mockDelay(1500);
    return { data: { message: 'Registration successful', seller: { ...mockUser, ...sellerData } } };
  },

  logout: async () => {
    await mockDelay(500);
    return { data: { message: 'Logged out successfully' } };
  },

  refreshToken: async () => {
    await mockDelay(500);
    return { data: { token: mockToken } };
  },

  // Profile
  getProfile: async () => {
    await mockDelay(800);
    // Check if we "have" a token in localstorage to simulate auth failure if needed
    if (!localStorage.getItem('seller_token')) {
      throw { response: { data: { message: 'Unauthorized' } } };
    }
    return { data: mockUser };
  },

  updateProfile: async (profileData) => {
    await mockDelay();
    return { data: { ...mockUser, ...profileData } };
  },

  updateKYC: async (kycData) => {
    await mockDelay();
    return { data: { message: 'KYC submitted' } };
  },

  // Dashboard
  getDashboardStats: async () => {
    await mockDelay();
    return {
      data: {
        totalSales: 15430,
        totalOrders: 45,
        pendingOrders: 12,
        products: 28
      }
    };
  },

  getRecentOrders: async (limit = 10) => {
    await mockDelay();
    return {
      data: Array(5).fill(null).map((_, i) => ({
        _id: `order_${i}`,
        orderId: `#ORD-${1000 + i}`,
        customer: { name: 'John Doe' },
        amount: 1200 + i * 100,
        status: ['pending', 'processing', 'delivered'][i % 3],
        createdAt: new Date().toISOString()
      }))
    };
  },

  getSalesChart: async (period = '30d') => {
    await mockDelay();
    return {
      data: Array(7).fill(null).map((_, i) => ({
        date: `2024-03-0${i + 1}`,
        sales: Math.floor(Math.random() * 5000)
      }))
    };
  },

  // Settings
  getSettings: async () => {
    await mockDelay();
    return { data: { notifications: true, currency: 'INR' } };
  },

  updateSettings: async (settings) => {
    await mockDelay();
    return { data: settings };
  },

  // Payouts
  getPayouts: async () => {
    await mockDelay();
    return { data: { balance: 5000, history: [] } };
  },

  requestWithdrawal: async (amount) => {
    await mockDelay();
    return { data: { message: 'Withdrawal requested' } };
  },

  getPayoutHistory: async (params) => {
    await mockDelay();
    return { data: [] };
  },

  // Documents
  uploadDocument: async (type, file) => {
    await mockDelay(2000);
    return { data: { url: 'https://via.placeholder.com/150', type } };
  },
};