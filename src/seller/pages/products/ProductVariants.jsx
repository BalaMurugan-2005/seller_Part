import React, { useState } from 'react';
import { Plus, Trash2, Edit, Copy, Check } from 'lucide-react';

const ProductVariants = () => {
  const [variants, setVariants] = useState([
    {
      id: 1,
      sku: 'AUDIO-001-BLK',
      attributes: { color: 'Black', size: 'Regular' },
      price: '2499',
      comparePrice: '2999',
      stock: 15,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      sku: 'AUDIO-001-WHT',
      attributes: { color: 'White', size: 'Regular' },
      price: '2499',
      comparePrice: '2999',
      stock: 8,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      sku: 'AUDIO-001-PRO',
      attributes: { color: 'Black', size: 'Pro' },
      price: '2999',
      comparePrice: '3499',
      stock: 5,
      image: 'https://via.placeholder.com/100'
    }
  ]);

  const [newVariant, setNewVariant] = useState({
    color: '',
    size: '',
    price: '',
    comparePrice: '',
    stock: '',
    sku: ''
  });

  const [editingId, setEditingId] = useState(null);

  const colorOptions = ['Black', 'White', 'Blue', 'Red', 'Gray'];
  const sizeOptions = ['Regular', 'Large', 'Small', 'Pro'];

  const handleAddVariant = () => {
    if (!newVariant.color || !newVariant.size || !newVariant.price) return;

    const variant = {
      id: variants.length + 1,
      sku: newVariant.sku || `AUDIO-001-${newVariant.color.toUpperCase().substring(0, 3)}`,
      attributes: { color: newVariant.color, size: newVariant.size },
      price: newVariant.price,
      comparePrice: newVariant.comparePrice,
      stock: newVariant.stock || 0,
      image: 'https://via.placeholder.com/100'
    };

    setVariants([...variants, variant]);
    setNewVariant({
      color: '',
      size: '',
      price: '',
      comparePrice: '',
      stock: '',
      sku: ''
    });
  };

  const handleDeleteVariant = (id) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const handleDuplicateVariant = (variant) => {
    const duplicated = {
      ...variant,
      id: variants.length + 1,
      sku: `${variant.sku}-COPY`
    };
    setVariants([...variants, duplicated]);
  };

  const handleBulkUpdate = (field, value) => {
    setVariants(variants.map(v => ({ ...v, [field]: value })));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Variants</h1>
        <p className="text-gray-600">Manage different variants of your product</p>
      </div>

      {/* Add New Variant Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Variant</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <select
              value={newVariant.color}
              onChange={(e) => setNewVariant({...newVariant, color: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Color</option>
              {colorOptions.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <select
              value={newVariant.size}
              onChange={(e) => setNewVariant({...newVariant, size: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Size</option>
              {sizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              value={newVariant.price}
              onChange={(e) => setNewVariant({...newVariant, price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="2499"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compare Price (₹)
            </label>
            <input
              type="number"
              value={newVariant.comparePrice}
              onChange={(e) => setNewVariant({...newVariant, comparePrice: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="2999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              value={newVariant.stock}
              onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="10"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleAddVariant}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {newVariant.color && newVariant.size && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium">Variant Preview:</div>
            <div className="text-sm text-gray-600 mt-1">
              SKU: AUDIO-001-{newVariant.color.toUpperCase().substring(0,3)}
              | Color: {newVariant.color} | Size: {newVariant.size}
              | Price: ₹{newVariant.price}
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Bulk Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Price
            </label>
            <div className="flex">
              <input
                type="number"
                placeholder="New price"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg"
              />
              <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200">
                Apply
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Stock
            </label>
            <div className="flex">
              <input
                type="number"
                placeholder="New stock"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg"
              />
              <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200">
                Apply
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Set Status
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Active</option>
              <option>Inactive</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              Apply to Selected
            </button>
          </div>
        </div>
      </div>

      {/* Variants Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Product Variants</h3>
            <div className="text-sm text-gray-600">
              {variants.length} variant{variants.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Variant
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Attributes
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  SKU
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {variants.map((variant) => (
                <tr key={variant.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-3">
                        <img
                          src={variant.image}
                          alt="Variant"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Variant #{variant.id}</div>
                        <div className="text-sm text-gray-500">ID: {variant.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {Object.entries(variant.attributes).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <span className="text-sm text-gray-600 capitalize w-16">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">₹{variant.price}</div>
                      {variant.comparePrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{variant.comparePrice}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-medium ${
                      variant.stock === 0 
                        ? 'text-red-600' 
                        : variant.stock < 10 
                        ? 'text-amber-600' 
                        : 'text-green-600'
                    }`}>
                      {variant.stock} units
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {variant.sku}
                    </code>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingId(variant.id)}
                        className="p-1.5 hover:bg-gray-100 rounded"
                      >
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDuplicateVariant(variant)}
                        className="p-1.5 hover:bg-gray-100 rounded"
                      >
                        <Copy size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteVariant(variant.id)}
                        className="p-1.5 hover:bg-gray-100 rounded"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600">Total Variants</div>
              <div className="text-2xl font-bold">{variants.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Stock</div>
              <div className="text-2xl font-bold">
                {variants.reduce((sum, v) => sum + parseInt(v.stock), 0)} units
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Average Price</div>
              <div className="text-2xl font-bold">
                ₹{(variants.reduce((sum, v) => sum + parseInt(v.price), 0) / variants.length).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;