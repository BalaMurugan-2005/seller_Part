import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  MoreVertical
} from 'lucide-react';

const SellerOrders = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orders = [
    {
      id: 'ORD-7894',
      customer: 'Rahul Sharma',
      date: 'Today, 10:30 AM',
      items: 2,
      amount: '₹2,499',
      status: 'processing',
      payment: 'paid',
      delivery: 'Standard'
    },
    {
      id: 'ORD-7893',
      customer: 'Priya Patel',
      date: 'Today, 09:15 AM',
      items: 1,
      amount: '₹1,899',
      status: 'packed',
      payment: 'paid',
      delivery: 'Express'
    },
    {
      id: 'ORD-7892',
      customer: 'Amit Verma',
      date: 'Yesterday, 4:45 PM',
      items: 3,
      amount: '₹4,299',
      status: 'shipped',
      payment: 'paid',
      delivery: 'Standard'
    },
    {
      id: 'ORD-7891',
      customer: 'Sneha Reddy',
      date: 'Yesterday, 2:30 PM',
      items: 1,
      amount: '₹899',
      status: 'delivered',
      payment: 'paid',
      delivery: 'Standard'
    },
    {
      id: 'ORD-7890',
      customer: 'Rajesh Kumar',
      date: 'Dec 10, 11:20 AM',
      items: 4,
      amount: '₹6,499',
      status: 'processing',
      payment: 'pending',
      delivery: 'Express'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Orders', count: 128 },
    { key: 'processing', label: 'Processing', count: 24 },
    { key: 'packed', label: 'Packed', count: 18 },
    { key: 'shipped', label: 'Shipped', count: 42 },
    { key: 'delivered', label: 'Delivered', count: 44 }
  ];

  const stats = {
    totalOrders: 128,
    todayOrders: 8,
    pendingOrders: 24,
    revenueToday: '₹18,942'
  };

  const getStatusConfig = (status) => {
    const configs = {
      processing: { color: 'bg-blue-100 text-blue-800', icon: Clock, text: 'Processing' },
      packed: { color: 'bg-amber-100 text-amber-800', icon: Package, text: 'Packed' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck, text: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle, text: 'Cancelled' }
    };
    return configs[status] || configs.processing;
  };

  const getPaymentBadge = (payment) => {
    return payment === 'paid' 
      ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Paid</span>
      : <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Pending</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export Orders
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold mt-1">{stats.totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Orders</p>
              <p className="text-2xl font-bold mt-1 text-green-600">{stats.todayOrders}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Clock className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertCircle className="text-amber-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold mt-1">{stats.revenueToday}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeFilter === filter.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeFilter === filter.key
                    ? 'bg-indigo-500'
                    : 'bg-gray-300'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="search"
                placeholder="Search orders by ID or customer..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const Icon = statusConfig.icon;
                
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500">Delivery: {order.delivery}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium">{order.customer}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">{order.date}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">{order.items} item{order.items > 1 ? 's' : ''}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium">{order.amount}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-full flex items-center ${statusConfig.color}`}>
                          <Icon size={14} className="mr-1.5" />
                          <span className="text-xs font-medium">{statusConfig.text}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getPaymentBadge(order.payment)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {order.status === 'processing' && (
                          <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                            Process
                          </button>
                        )}
                        {order.status === 'packed' && (
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                            Ship Now
                          </button>
                        )}
                        <button className="p-1.5 hover:bg-gray-100 rounded">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">{stats.totalOrders}</span> orders
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Bulk Order Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium">Print Shipping Labels</div>
            <div className="text-sm text-gray-500">Generate labels for selected orders</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium">Update Status</div>
            <div className="text-sm text-gray-500">Mark as packed/shipped</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium">Send Notifications</div>
            <div className="text-sm text-gray-500">Notify customers</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium">Create Manifest</div>
            <div className="text-sm text-gray-500">For courier pickup</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;