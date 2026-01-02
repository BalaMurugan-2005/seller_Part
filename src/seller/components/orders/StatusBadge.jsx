import React from 'react';
import { 
  Clock, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  AlertCircle 
} from 'lucide-react';

const StatusBadge = ({ status, size = 'md' }) => {
  const config = {
    pending: {
      color: 'bg-gray-100 text-gray-800',
      icon: Clock,
      text: 'Pending'
    },
    processing: {
      color: 'bg-blue-100 text-blue-800',
      icon: Clock,
      text: 'Processing'
    },
    packed: {
      color: 'bg-amber-100 text-amber-800',
      icon: Package,
      text: 'Packed'
    },
    shipped: {
      color: 'bg-purple-100 text-purple-800',
      icon: Truck,
      text: 'Shipped'
    },
    delivered: {
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
      text: 'Delivered'
    },
    cancelled: {
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
      text: 'Cancelled'
    },
    returned: {
      color: 'bg-orange-100 text-orange-800',
      icon: AlertCircle,
      text: 'Returned'
    }
  };

  const { color, icon: Icon, text } = config[status] || config.pending;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${color} ${sizeClasses[size]}`}>
      <Icon size={size === 'sm' ? 12 : 14} className="mr-1.5" />
      {text}
    </span>
  );
};

export default StatusBadge;