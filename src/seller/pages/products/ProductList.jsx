import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [search, setSearch] = useState('');

  const products = [
    {
      id: 1,
      image: 'https://via.placeholder.com/60',
      name: 'Wireless Bluetooth Headphones',
      sku: 'SKU-001',
      category: 'Electronics',
      price: '₹2,499',
      stock: 24,
      status: 'active',
      sales: 142
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/60',
      name: 'Casual Running Shoes',
      sku: 'SKU-002',
      category: 'Footwear',
      price: '₹1,899',
      stock: 8,
      status: 'active',
      sales: 89
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/60',
      name: 'Organic Green Tea',
      sku: 'SKU-003',
      category: 'Food',
      price: '₹349',
      stock: 0,
      status: 'out_of_stock',
      sales: 256
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/60',
      name: 'Yoga Mat Premium',
      sku: 'SKU-004',
      category: 'Fitness',
      price: '₹1,199',
      stock: 42,
      status: 'active',
      sales: 67
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/60',
      name: 'Smart Watch Series 5',
      sku: 'SKU-005',
      category: 'Electronics',
      price: '₹4,999',
      stock: 15,
      status: 'active',
      sales: 34
    }
  ];

  const toggleProductSelection = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      out_of_stock: { color: 'bg-red-100 text-red-800', text: 'Out of Stock' },
      draft: { color: 'bg-gray-100 text-gray-800', text: 'Draft' }
    };
    const { color, text } = config[status] || config.draft;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Bulk Upload
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Plus size={16} className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search products by name, SKU, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Kitchen</option>
            </select>
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg">
              <option>All Status</option>
              <option>Active</option>
              <option>Out of Stock</option>
              <option>Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
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
                  Price
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{product.sku}</code>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm">{product.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium">{product.price}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`font-medium ${
                        product.stock === 0 ? 'text-red-600' : 
                        product.stock < 10 ? 'text-amber-600' : 
                        'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                      {product.stock < 10 && product.stock > 0 && (
                        <AlertTriangle size={14} className="ml-2 text-amber-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm">{product.sales} units</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100">
                  Update Status
                </button>
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100">
                  Update Price
                </button>
                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">48</span> products
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
    </div>
  );
};

export default ProductList;