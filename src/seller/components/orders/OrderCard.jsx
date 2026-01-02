import React from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  User,
  MapPin,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

const OrderCard = ({ order, onAction }) => {
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: 'bg-gray-100 text-gray-800',
        icon: Clock,
        text: 'Pending',
        action: 'Process'
      },
      processing: {
        color: 'bg-blue-100 text-blue-800',
        icon: Package,
        text: 'Processing',
        action: 'Pack'
      },
      packed: {
        color: 'bg-amber-100 text-amber-800',
        icon: Package,
        text: 'Packed',
        action: 'Ship'
      },
      shipped: {
        color: 'bg-purple-100 text-purple-800',
        icon: Truck,
        text: 'Shipped',
        action: 'Track'
      },
      delivered: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: 'Delivered',
        action: 'View'
      },
      cancelled: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: 'Cancelled',
        action: 'View'
      }
    };
    return configs[status] || configs.pending;
  };

  const getPaymentBadge = (payment) => {
    return payment === 'paid' ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
        Paid
      </span>
    ) : payment === 'pending' ? (
      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
        Pending
      </span>
    ) : (
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
        Failed
      </span>
    );
  };

  const getDeliveryType = (type) => {
    const types = {
      standard: { color: 'text-gray-600', text: 'Standard' },
      express: { color: 'text-blue-600', text: 'Express' },
      next_day: { color: 'text-green-600', text: 'Next Day' },
      free: { color: 'text-purple-600', text: 'Free Shipping' }
    };
    const config = types[type] || types.standard;
    return <span className={`text-sm font-medium ${config.color}`}>{config.text}</span>;
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* Left Section - Order Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1.5 rounded-full flex items-center ${statusConfig.color}`}>
                  <StatusIcon size={14} className="mr-1.5" />
                  <span className="text-xs font-medium">{statusConfig.text}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{order.id}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Ordered on {order.date}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{order.amount}</div>
              <div className="text-sm text-gray-600">{order.items} item{order.items !== 1 ? 's' : ''}</div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User size={16} className="text-gray-400 mr-2" />
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm text-gray-600">{order.customer.email}</div>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="text-gray-400 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Shipping to</div>
                  <div className="font-medium">{order.customer.city}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Payment</div>
              <div className="mt-1">{getPaymentBadge(order.payment)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Delivery</div>
              <div className="mt-1">{getDeliveryType(order.deliveryType)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Est. Delivery</div>
              <div className="mt-1 font-medium">{order.estimatedDelivery}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Carrier</div>
              <div className="mt-1 font-medium">{order.carrier}</div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="mt-6 lg:mt-0 lg:ml-6 lg:w-64">
          <div className="space-y-3">
            <button
              onClick={() => onAction(statusConfig.action.toLowerCase(), order.id)}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                order.status === 'pending' || order.status === 'processing'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : order.status === 'packed'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {statusConfig.action} Order
              <ChevronRight size={18} className="ml-2" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onAction('view', order.id)}
                className="py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => onAction('contact', order.id)}
                className="py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                Contact Customer
              </button>
            </div>

            {order.hasIssues && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle size={16} className="text-red-500 mr-2" />
                  <span className="text-sm text-red-700">Delivery issue reported</span>
                </div>
              </div>
            )}

            {order.requiresAttention && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center">
                  <Clock size={16} className="text-amber-500 mr-2" />
                  <span className="text-sm text-amber-700">Requires attention</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600">Process Time</div>
                <div className="font-medium">{order.processTime}</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600">Priority</div>
                <div className={`font-medium ${
                  order.priority === 'high' ? 'text-red-600' :
                  order.priority === 'medium' ? 'text-amber-600' : 'text-gray-600'
                }`}>
                  {order.priority}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;