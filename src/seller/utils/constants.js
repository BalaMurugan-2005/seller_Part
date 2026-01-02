export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.PACKED]: 'Packed',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.RETURNED]: 'Returned'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'gray',
  [ORDER_STATUS.PROCESSING]: 'blue',
  [ORDER_STATUS.PACKED]: 'amber',
  [ORDER_STATUS.SHIPPED]: 'purple',
  [ORDER_STATUS.DELIVERED]: 'green',
  [ORDER_STATUS.CANCELLED]: 'red',
  [ORDER_STATUS.RETURNED]: 'orange'
};

export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  OUT_OF_STOCK: 'out_of_stock'
};

export const PAYOUT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

export const KYC_STATUS = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Sports & Fitness',
  'Books & Media',
  'Automotive',
  'Toys & Games',
  'Food & Beverages',
  'Health & Wellness'
];

export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Delivery', days: '4-7', price: 49 },
  { id: 'express', name: 'Express Delivery', days: '2-3', price: 99 },
  { id: 'next_day', name: 'Next Day Delivery', days: '1', price: 199 },
  { id: 'free', name: 'Free Shipping', days: '5-8', price: 0 }
];

export const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore',
  'United Arab Emirates'
];

export const CURRENCIES = {
  INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  USD: { symbol: '$', code: 'USD', name: 'US Dollar' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound' },
  AUD: { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' }
};

export const DATE_FORMATS = {
  DISPLAY: 'DD MMM, YYYY',
  FULL: 'DD MMMM, YYYY hh:mm A',
  API: 'YYYY-MM-DD'
};