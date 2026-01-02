import React from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  Truck
} from 'lucide-react';
import SalesChart from '../../components/charts/SalesChart';
import OrderCard from '../../components/orders/OrderCard';

const SellerDashboard = () => {
  const kpiData = [
    {
      title: 'Total Sales',
      value: '₹1,24,856',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Orders Today',
      value: '42',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Orders',
      value: '18',
      change: '-3.1%',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Low Stock Alerts',
      value: '7',
      change: '+2',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-7894',
      customer: 'Rahul Sharma',
      date: 'Today, 10:30 AM',
      amount: '₹2,499',
      items: 2,
      status: 'processing',
      payment: 'Paid'
    },
    {
      id: 'ORD-7893',
      customer: 'Priya Patel',
      date: 'Today, 09:15 AM',
      amount: '₹1,899',
      items: 1,
      status: 'packed',
      payment: 'Paid'
    },
    {
      id: 'ORD-7892',
      customer: 'Amit Verma',
      date: 'Yesterday, 4:45 PM',
      amount: '₹4,299',
      items: 3,
      status: 'shipped',
      payment: 'Paid'
    },
    {
      id: 'ORD-7891',
      customer: 'Sneha Reddy',
      date: 'Yesterday, 2:30 PM',
      amount: '₹899',
      items: 1,
      status: 'delivered',
      payment: 'Paid'
    }
  ];

  const quickActions = [
    { label: 'Add New Product', icon: Package, color: 'bg-indigo-600 hover:bg-indigo-700' },
    { label: 'Process Orders', icon: ShoppingCart, color: 'bg-green-600 hover:bg-green-700' },
    { label: 'Update Stock', icon: Package, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Withdraw Funds', icon: DollarSign, color: 'bg-purple-600 hover:bg-purple-700' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className={`text-sm font-medium ${kpi.value.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold mt-4">{kpi.value}</p>
            <p className="text-gray-600 text-sm mt-1">{kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Charts and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Revenue Overview</h2>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
              </select>
            </div>
            <SalesChart />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`w-full ${action.color} text-white rounded-lg p-4 flex items-center justify-between transition-colors`}
              >
                <span className="font-medium">{action.label}</span>
                <action.icon size={20} />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Store Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Order Completion</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Inventory Turnover</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All Orders →
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Payout Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Payout Summary</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold mt-1">₹42,856</p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                Withdraw Funds
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Payout</p>
              <p className="text-2xl font-bold mt-1">₹18,942</p>
              <p className="text-sm text-gray-500 mt-1">Scheduled for Dec 15</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Store Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                <span className="text-sm">Conversion Rate</span>
              </div>
              <span className="font-medium">3.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Truck className="text-blue-500 mr-2" size={16} />
                <span className="text-sm">Avg Delivery Time</span>
              </div>
              <span className="font-medium">2.4 days</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="text-purple-500 mr-2" size={16} />
                <span className="text-sm">Avg Order Value</span>
              </div>
              <span className="font-medium">₹1,850</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;