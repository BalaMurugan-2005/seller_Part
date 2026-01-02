import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  Filter,
  BarChart3,
  DollarSign,
  ShoppingCart,
  Users,
  Package
} from 'lucide-react';

const SalesAnalytics = () => {
  const [dateRange, setDateRange] = useState('last_30_days');

  const analyticsData = {
    overview: [
      { label: 'Total Sales', value: '₹1,24,856', change: '+12.5%', trend: 'up' },
      { label: 'Orders', value: '342', change: '+8.2%', trend: 'up' },
      { label: 'Avg Order Value', value: '₹1,850', change: '+3.1%', trend: 'up' },
      { label: 'Conversion Rate', value: '3.8%', change: '-0.2%', trend: 'down' },
    ],
    topProducts: [
      { name: 'Wireless Headphones', sales: 142, revenue: '₹3,54,580', growth: '+25%' },
      { name: 'Smart Watch', sales: 89, revenue: '₹4,45,211', growth: '+18%' },
      { name: 'Running Shoes', sales: 67, revenue: '₹1,27,433', growth: '+12%' },
      { name: 'Yoga Mat', sales: 45, revenue: '₹53,955', growth: '+8%' },
      { name: 'Green Tea', sales: 34, revenue: '₹11,866', growth: '+5%' },
    ],
    salesByCategory: [
      { category: 'Electronics', value: '₹8,45,600', percentage: 42 },
      { category: 'Fashion', value: '₹4,23,400', percentage: 21 },
      { category: 'Home & Kitchen', value: '₹3,38,720', percentage: 17 },
      { category: 'Sports', value: '₹2,53,200', percentage: 13 },
      { category: 'Others', value: '₹1,39,080', percentage: 7 },
    ],
    dailySales: [
      { day: 'Mon', sales: 12542 },
      { day: 'Tue', sales: 23489 },
      { day: 'Wed', sales: 18956 },
      { day: 'Thu', sales: 27891 },
      { day: 'Fri', sales: 34567 },
      { day: 'Sat', sales: 41234 },
      { day: 'Sun', sales: 28901 },
    ]
  };

  const dateRanges = [
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'last_quarter', label: 'Last quarter' },
    { value: 'last_year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600">Track your sales performance and insights</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download size={16} className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Calendar className="text-gray-400" size={20} />
            <h3 className="font-medium">Select Date Range</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={`px-4 py-2 rounded-lg ${
                  dateRange === range.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {dateRange === 'custom' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.overview.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="text-green-600" size={24} />
                ) : (
                  <TrendingDown className="text-red-600" size={24} />
                )}
              </div>
            </div>
            <div className={`mt-4 flex items-center text-sm ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span className="font-medium">{stat.change}</span>
              <span className="text-gray-500 ml-1">from previous period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
              <p className="text-sm text-gray-600">Daily sales performance</p>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Revenue</option>
              <option>Orders</option>
              <option>Units Sold</option>
            </select>
          </div>
          
          <div className="h-64">
            <div className="flex items-end h-48 space-x-2">
              {analyticsData.dailySales.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-8 bg-indigo-500 rounded-t"
                    style={{ height: `${(day.sales / 50000) * 100}%` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-500">{day.day}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <span>₹0</span>
              <span>₹25,000</span>
              <span>₹50,000</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Sales by Category</h3>
              <p className="text-sm text-gray-600">Revenue distribution</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {analyticsData.salesByCategory.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.category}</span>
                  <span>{category.value} ({category.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
            <p className="text-sm text-gray-600">Best performers this period</p>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All Products →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Product</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Units Sold</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Revenue</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Growth</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium">{product.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Package size={16} className="text-gray-400 mr-2" />
                      <span>{product.sales} units</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-400 mr-2" />
                      <span className="font-medium">{product.revenue}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center ${product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth.startsWith('+') ? (
                        <TrendingUp size={16} className="mr-1" />
                      ) : (
                        <TrendingDown size={16} className="mr-1" />
                      )}
                      <span className="font-medium">{product.growth}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Users className="text-blue-500 mr-3" size={24} />
            <div>
              <h4 className="font-medium">Customer Metrics</h4>
              <p className="text-sm text-gray-600">Key customer insights</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">New Customers</span>
              <span className="font-medium">124</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Repeat Rate</span>
              <span className="font-medium">42%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Customer Value</span>
              <span className="font-medium">₹4,856</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <ShoppingCart className="text-green-500 mr-3" size={24} />
            <div>
              <h4 className="font-medium">Order Metrics</h4>
              <p className="text-sm text-gray-600">Order performance</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Processing Time</span>
              <span className="font-medium">2.4 hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cancellation Rate</span>
              <span className="font-medium text-red-600">3.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Return Rate</span>
              <span className="font-medium">1.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="text-purple-500 mr-3" size={24} />
            <div>
              <h4 className="font-medium">Performance Goals</h4>
              <p className="text-sm text-gray-600">Monthly targets</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Sales Target</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Order Target</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Growth Target</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Detailed Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium">Sales Report</div>
            <div className="text-sm text-gray-500">Detailed sales breakdown</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium">Inventory Report</div>
            <div className="text-sm text-gray-500">Stock levels and movement</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium">Customer Report</div>
            <div className="text-sm text-gray-500">Customer insights and behavior</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;