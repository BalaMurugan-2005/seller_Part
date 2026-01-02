import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderCard = ({ order }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="text-blue-500" size={16} />;
      case 'packed':
        return <Package className="text-amber-500" size={16} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={16} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'text-blue-700 bg-blue-50';
      case 'packed':
        return 'text-amber-700 bg-amber-50';
      case 'shipped':
        return 'text-purple-700 bg-purple-50';
      case 'delivered':
        return 'text-green-700 bg-green-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'packed':
        return 'Packed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">{order.id}</h3>
              <p className="text-sm text-gray-600">{order.customer}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p className="font-medium">{order.items} item{order.items > 1 ? 's' : ''}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount</p>
              <p className="font-medium">{order.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.payment === 'Paid' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {order.payment}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          {order.status === 'processing' && (
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
              Process Order
            </button>
          )}
          {order.status === 'packed' && (
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
              Ship Now
            </button>
          )}
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;