import React, { useState } from 'react';
import { 
  Download, 
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  FileText,
  Printer
} from 'lucide-react';

const RevenueReport = () => {
  const [dateRange, setDateRange] = useState('last_30_days');
  const [reportType, setReportType] = useState('detailed');

  const revenueData = {
    summary: {
      totalRevenue: '₹1,24,856',
      totalOrders: 342,
      averageOrderValue: '₹1,850',
      growthRate: '+12.5%'
    },
    byCategory: [
      { category: 'Electronics', revenue: '₹84,560', orders: 45, growth: '+18%' },
      { category: 'Fashion', revenue: '₹42,340', orders: 28, growth: '+8%' },
      { category: 'Home & Kitchen', revenue: '₹33,872', orders: 19, growth: '+15%' },
      { category: 'Sports', revenue: '₹25,320', orders: 14, growth: '+12%' },
      { category: 'Others', revenue: '₹13,908', orders: 9, growth: '+5%' }
    ],
    monthlyTrend: [
      { month: 'Jan', revenue: 65000, orders: 35 },
      { month: 'Feb', revenue: 82000, orders: 44 },
      { month: 'Mar', revenue: 75000, orders: 40 },
      { month: 'Apr', revenue: 92000, orders: 50 },
      { month: 'May', revenue: 88000, orders: 48 },
      { month: 'Jun', revenue: 105000, orders: 56 },
      { month: 'Jul', revenue: 98000, orders: 53 },
      { month: 'Aug', revenue: 112000, orders: 60 },
      { month: 'Sep', revenue: 125000, orders: 67 },
      { month: 'Oct', revenue: 118000, orders: 64 },
      { month: 'Nov', revenue: 132000, orders: 71 },
      { month: 'Dec', revenue: 148000, orders: 78 }
    ],
    topProducts: [
      { product: 'Wireless Headphones', revenue: '₹35,458', units: 142, growth: '+25%' },
      { product: 'Smart Watch', revenue: '₹44,521', units: 89, growth: '+18%' },
      { product: 'Running Shoes', revenue: '₹12,743', units: 67, growth: '+12%' },
      { product: 'Yoga Mat', revenue: '₹5,395', units: 45, growth: '+8%' },
      { product: 'Green Tea', revenue: '₹1,186', units: 34, growth: '+5%' }
    ]
  };

  const dateRanges = [
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'last_quarter', label: 'Last quarter' },
    { value: 'last_year', label: 'Last year' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const reportTypes = [
    { value: 'summary', label: 'Summary', icon: BarChart3 },
    { value: 'detailed', label: 'Detailed', icon: FileText },
    { value: 'category', label: 'Category', icon: PieChart },
    { value: 'product', label: 'Product', icon: TrendingUp }
  ];

  const exportFormats = [
    { format: 'pdf', label: 'PDF Report' },
    { format: 'excel', label: 'Excel File' },
    { format: 'csv', label: 'CSV Data' },
    { format: 'print', label: 'Print Report' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Reports</h1>
          <p className="text-gray-600">Detailed analysis of your revenue and sales performance</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer size={16} className="mr-2" />
            Print
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex flex-wrap gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setDateRange(range.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setReportType(type.value)}
                    className={`flex items-center justify-center p-3 rounded-lg border ${
                      reportType === type.value
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {exportFormats.map((format) => (
                <button
                  key={format.format}
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Download size={16} className="mr-2" />
                  {format.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {dateRange === 'custom' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex items-end">
                <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Apply Range
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">{revenueData.summary.totalRevenue}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span className="font-medium">{revenueData.summary.growthRate}</span>
            <span className="text-gray-500 ml-1">from previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold mt-1">{revenueData.summary.totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {Math.round(revenueData.summary.totalOrders / 30)} orders/day avg
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold mt-1">{revenueData.summary.averageOrderValue}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span className="font-medium">+3.2%</span>
            <span className="text-gray-500 ml-1">increase</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold mt-1">3.8%</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <TrendingDown className="text-amber-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600">
            <TrendingDown size={16} className="mr-1" />
            <span className="font-medium">-0.2%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <p className="text-sm text-gray-600">Monthly revenue performance</p>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Revenue (₹)</option>
            <option>Orders</option>
            <option>Units Sold</option>
          </select>
        </div>

        <div className="h-80">
          <div className="flex items-end h-64 space-x-1">
            {revenueData.monthlyTrend.map((month, index) => {
              const maxRevenue = Math.max(...revenueData.monthlyTrend.map(m => m.revenue));
              const height = (month.revenue / maxRevenue) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative group w-8">
                    <div
                      className="w-8 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg transition-all duration-300 hover:opacity-90"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      ₹{month.revenue.toLocaleString()}
                      <br />
                      {month.orders} orders
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{month.month}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹75,000</span>
            <span>₹150,000</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Revenue by Category</h3>
              <p className="text-sm text-gray-600">Breakdown across product categories</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {revenueData.byCategory.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.category}</span>
                  <span>{category.revenue} ({category.orders} orders)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(index + 1) * 20}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{category.growth} growth</span>
                  <span>{((index + 1) * 20)}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Top Products</h3>
              <p className="text-sm text-gray-600">Highest revenue generating products</p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {revenueData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium">{product.product}</div>
                  <div className="text-sm text-gray-600">{product.units} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{product.revenue}</div>
                  <div className={`text-sm font-medium ${
                    product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.growth} growth
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Detailed Revenue Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Orders</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Revenue</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Avg Order Value</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Units Sold</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Conversion Rate</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {revenueData.monthlyTrend.slice(-6).map((month, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{month.month} 2023</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{month.orders}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">₹{month.revenue.toLocaleString()}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>₹{(month.revenue / month.orders).toFixed(0)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{month.orders * 3}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">3.8%</div>
                  </td>
                  <td className="py-3 px-4">
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
          <h4 className="font-medium mb-4">Revenue Distribution</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Product Sales</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Service Revenue</span>
                <span className="font-medium">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Other Revenue</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-medium mb-4">Customer Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">New Customers</span>
              <span className="font-medium">124</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Repeat Customers</span>
              <span className="font-medium">218</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Lifetime Value</span>
              <span className="font-medium">₹4,856</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Retention Rate</span>
              <span className="font-medium">68%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-medium mb-4">Performance Goals</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Revenue Target</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Growth Target</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Profit Margin</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;