import React, { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

const ProductTable = ({ products, onSelect, selectedProducts, onBulkAction }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' },
      draft: { color: 'bg-blue-100 text-blue-800', text: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-800', text: 'Archived' },
      out_of_stock: { color: 'bg-red-100 text-red-800', text: 'Out of Stock' }
    };
    const { color, text } = config[status] || config.draft;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  const getStockIndicator = (stock) => {
    if (stock === 0) {
      return (
        <div className="flex items-center">
          <span className="text-red-600 font-medium">{stock}</span>
          <AlertTriangle size={14} className="ml-1 text-red-500" />
        </div>
      );
    }
    if (stock < 10) {
      return (
        <div className="flex items-center">
          <span className="text-amber-600 font-medium">{stock}</span>
          <AlertTriangle size={14} className="ml-1 text-amber-500" />
        </div>
      );
    }
    return <span className="text-green-600 font-medium">{stock}</span>;
  };

  const getSalesTrend = (salesChange) => {
    if (salesChange > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp size={14} className="mr-1" />
          <span className="text-xs font-medium">+{salesChange}%</span>
        </div>
      );
    } else if (salesChange < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown size={14} className="mr-1" />
          <span className="text-xs font-medium">{salesChange}%</span>
        </div>
      );
    }
    return <span className="text-gray-500 text-xs">-</span>;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onChange={() => onSelect(products.length > 0 ? 'all' : [])}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th 
                className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('sku')}
              >
                SKU
                {sortConfig.key === 'sku' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                Category
                {sortConfig.key === 'category' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('price')}
              >
                Price
                {sortConfig.key === 'price' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('stock')}
              >
                Stock
                {sortConfig.key === 'stock' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales Trend
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr 
                key={product.id} 
                className={`hover:bg-gray-50 ${selectedProducts.includes(product.id) ? 'bg-blue-50' : ''}`}
              >
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => onSelect(product.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center mr-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">ID: {product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {product.sku}
                  </code>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm">{product.category}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="font-medium">{product.price}</span>
                    {product.comparePrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {product.comparePrice}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {getStockIndicator(product.stock)}
                    <div className="ml-3 w-20">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            product.stock === 0 ? 'bg-red-500' :
                            product.stock < 10 ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(product.status)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{product.sales} sold</span>
                    {getSalesTrend(product.salesChange)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onBulkAction('view', product.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                      title="View"
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button 
                      onClick={() => onBulkAction('edit', product.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit size={16} className="text-blue-600" />
                    </button>
                    <button 
                      onClick={() => onBulkAction('delete', product.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                    <div className="relative">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <MoreVertical size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="py-12 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Add your first product to start selling</p>
          <button 
            onClick={() => onBulkAction('add')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add New Product
          </button>
        </div>
      )}

      {selectedProducts.length > 0 && (
        <div className="border-t border-gray-100 p-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
              </span>
              <select 
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white"
                onChange={(e) => onBulkAction('update-status', e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Update Status</option>
                <option value="active">Set as Active</option>
                <option value="inactive">Set as Inactive</option>
                <option value="archived">Archive</option>
                <option value="draft">Set as Draft</option>
              </select>
              <button 
                onClick={() => onBulkAction('delete-selected')}
                className="text-sm px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Selected
              </button>
            </div>
            <button 
              onClick={() => onSelect([])}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;