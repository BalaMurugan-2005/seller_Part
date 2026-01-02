import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp,
  Edit,
  Save,
  X
} from 'lucide-react';

const InventoryManagement = () => {
  const [editingId, setEditingId] = useState(null);
  const [editStock, setEditStock] = useState(0);
  const [search, setSearch] = useState('');

  const inventoryData = [
    {
      id: 1,
      product: 'Wireless Bluetooth Headphones',
      sku: 'SKU-001',
      category: 'Electronics',
      currentStock: 24,
      lowStockThreshold: 10,
      status: 'in_stock',
      soldLast30Days: 142,
      incomingStock: 50,
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      product: 'Casual Running Shoes',
      sku: 'SKU-002',
      category: 'Footwear',
      currentStock: 8,
      lowStockThreshold: 10,
      status: 'low_stock',
      soldLast30Days: 89,
      incomingStock: 100,
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      product: 'Organic Green Tea',
      sku: 'SKU-003',
      category: 'Food',
      currentStock: 0,
      lowStockThreshold: 20,
      status: 'out_of_stock',
      soldLast30Days: 256,
      incomingStock: 0,
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      product: 'Yoga Mat Premium',
      sku: 'SKU-004',
      category: 'Fitness',
      currentStock: 42,
      lowStockThreshold: 15,
      status: 'in_stock',
      soldLast30Days: 67,
      incomingStock: 0,
      lastUpdated: '5 hours ago'
    },
    {
      id: 5,
      product: 'Smart Watch Series 5',
      sku: 'SKU-005',
      category: 'Electronics',
      currentStock: 15,
      lowStockThreshold: 5,
      status: 'in_stock',
      soldLast30Days: 34,
      incomingStock: 25,
      lastUpdated: 'Today'
    }
  ];

  const stats = {
    totalValue: '₹5,42,856',
    lowStockItems: 7,
    outOfStock: 3,
    avgStockTurnover: '28 days'
  };

  const getStockStatus = (stock, threshold) => {
    if (stock === 0) return { color: 'text-red-600 bg-red-50', text: 'Out of Stock' };
    if (stock <= threshold) return { color: 'text-amber-600 bg-amber-50', text: 'Low Stock' };
    return { color: 'text-green-600 bg-green-50', text: 'In Stock' };
  };

  const handleEditStock = (item) => {
    setEditingId(item.id);
    setEditStock(item.currentStock);
  };

  const handleSaveStock = (id) => {
    // In a real app, you would make an API call here
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const getStockLevelColor = (stock, threshold) => {
    const percentage = (stock / threshold) * 100;
    if (stock === 0) return 'bg-red-500';
    if (percentage <= 100) return 'bg-amber-500';
    if (percentage <= 200) return 'bg-green-500';
    return 'bg-emerald-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your stock levels</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export CSV
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Update Bulk Stock
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Inventory Value</p>
              <p className="text-2xl font-bold mt-1">{stats.totalValue}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">{stats.lowStockItems}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="text-amber-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
              View Items →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold mt-1 text-red-600">{stats.outOfStock}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Package className="text-red-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
              Restock Now →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Stock Turnover</p>
              <p className="text-2xl font-bold mt-1">{stats.avgStockTurnover}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingDown className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Lower is better
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search products by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Kitchen</option>
            </select>
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg">
              <option>All Stock Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sold (30D)
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incoming
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventoryData.map((item) => {
                const status = getStockStatus(item.currentStock, item.lowStockThreshold);
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{item.product}</div>
                      <div className="text-xs text-gray-500 mt-1">Updated {item.lastUpdated}</div>
                    </td>
                    <td className="py-4 px-6">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{item.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {editingId === item.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(parseInt(e.target.value))}
                              className="w-24 px-3 py-1 border border-gray-300 rounded"
                            />
                            <button
                              onClick={() => handleSaveStock(item.id)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Save size={16} />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium">{item.currentStock}</span>
                            <button
                              onClick={() => handleEditStock(item)}
                              className="p-1.5 hover:bg-gray-100 rounded"
                            >
                              <Edit size={14} className="text-gray-500" />
                            </button>
                          </>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getStockLevelColor(item.currentStock, item.lowStockThreshold)}`}
                            style={{ width: `${Math.min(100, (item.currentStock / item.lowStockThreshold) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Low stock alert at {item.lowStockThreshold}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <span className="font-medium">{item.soldLast30Days}</span>
                        <div className="text-xs text-gray-500">units</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`text-sm ${item.incomingStock > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                        {item.incomingStock > 0 ? `+${item.incomingStock}` : 'None'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        View History
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="text-amber-600 mr-3" size={24} />
            <div>
              <h3 className="font-semibold text-amber-800">Low Stock Alerts</h3>
              <p className="text-sm text-amber-600">Products that need restocking soon</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium">
            Create Purchase Order
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inventoryData
            .filter(item => item.status === 'low_stock')
            .map(item => (
              <div key={item.id} className="bg-white rounded-lg border border-amber-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.product}</h4>
                    <p className="text-sm text-gray-600">Current: {item.currentStock} units</p>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-600 font-bold">Low Stock</div>
                    <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700">
                      Restock
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;