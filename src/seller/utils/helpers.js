import { ORDER_STATUS_COLORS, CURRENCIES, DATE_FORMATS } from './constants';

export const formatCurrency = (amount, currency = 'INR') => {
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.INR;
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyConfig.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  return formatter.format(amount);
};

export const formatDate = (date, format = DATE_FORMATS.DISPLAY) => {
  const dateObj = new Date(date);
  
  if (format === DATE_FORMATS.DISPLAY) {
    return dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
  
  if (format === DATE_FORMATS.FULL) {
    return dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  
  return dateObj.toISOString().split('T')[0];
};

export const getStatusColor = (status) => {
  return ORDER_STATUS_COLORS[status] || 'gray';
};

export const generateOrderId = () => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}${random}`;
};

export const calculateProfit = (price, cost) => {
  if (!price || !cost) return { amount: 0, percentage: 0 };
  
  const amount = price - cost;
  const percentage = (amount / price) * 100;
  
  return {
    amount: parseFloat(amount.toFixed(2)),
    percentage: parseFloat(percentage.toFixed(1))
  };
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\D/g, ''));
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const calculateTax = (amount, taxRate = 18) => {
  const tax = (amount * taxRate) / 100;
  return {
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat((amount + tax).toFixed(2))
  };
};

export const generateSKU = (productName, variant = '') => {
  const prefix = productName.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  const variantCode = variant ? variant.substring(0, 2).toUpperCase() : '00';
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  
  return `${prefix}-${timestamp}-${variantCode}-${random}`;
};

export const calculateAge = (dateString) => {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};