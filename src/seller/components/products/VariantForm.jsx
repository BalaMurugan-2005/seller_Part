import React, { useState } from 'react';
import { Plus, Trash2, X, Hash, Palette, Ruler } from 'lucide-react';

const VariantForm = () => {
  const [variants, setVariants] = useState([
    { id: 1, type: 'Color', values: ['Black', 'White'], required: true },
    { id: 2, type: 'Size', values: ['S', 'M', 'L'], required: true },
    { id: 3, type: 'Material', values: ['Cotton', 'Polyester'], required: false }
  ]);

  const [newVariant, setNewVariant] = useState({
    type: '',
    values: '',
    required: true
  });

  const [variantCombinations, setVariantCombinations] = useState([
    { id: 1, combination: 'Black-S', price: '2499', stock: 10, sku: 'PROD-001-BLK-S' },
    { id: 2, combination: 'Black-M', price: '2499', stock: 15, sku: 'PROD-001-BLK-M' },
    { id: 3, combination: 'Black-L', price: '2499', stock: 8, sku: 'PROD-001-BLK-L' },
    { id: 4, combination: 'White-S', price: '2499', stock: 12, sku: 'PROD-001-WHT-S' },
    { id: 5, combination: 'White-M', price: '2499', stock: 18, sku: 'PROD-001-WHT-M' },
    { id: 6, combination: 'White-L', price: '2499', stock: 5, sku: 'PROD-001-WHT-L' }
  ]);

  const addVariant = () => {
    if (!newVariant.type.trim()) return;

    const values = newVariant.values
      .split(',')
      .map(v => v.trim())
      .filter(v => v);

    const variant = {
      id: variants.length + 1,
      type: newVariant.type,
      values: values,
      required: newVariant.required
    };

    setVariants([...variants, variant]);
    setNewVariant({ type: '', values: '', required: true });
  };

  const removeVariant = (id) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const removeValue = (variantId, valueIndex) => {
    setVariants(variants.map(variant => {
      if (variant.id === variantId) {
        const newValues = [...variant.values];
        newValues.splice(valueIndex, 1);
        return { ...variant, values: newValues };
      }
      return variant;
    }));
  };

  const addValue = (variantId, value) => {
    if (!value.trim()) return;
    
    setVariants(variants.map(variant => {
      if (variant.id === variantId) {
        return { 
          ...variant, 
          values: [...variant.values, value.trim()] 
        };
      }
      return variant;
    }));
  };

  const updateVariantCombination = (id, field, value) => {
    setVariantCombinations(combinations =>
      combinations.map(combination =>
        combination.id === id
          ? { ...combination, [field]: value }
          : combination
      )
    );
  };

  const generateVariants = () => {
    // In a real app, this would generate all possible combinations
    alert('Generating variant combinations...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Product Variants</h3>
        <p className="text-gray-600">Define variant options like size, color, material, etc.</p>
      </div>

      {/* Add New Variant */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-medium mb-4">Add Variant Option</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variant Type
            </label>
            <input
              type="text"
              value={newVariant.type}
              onChange={(e) => setNewVariant({...newVariant, type: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              placeholder="e.g., Color, Size, Material"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Values (comma separated)
            </label>
            <input
              type="text"
              value={newVariant.values}
              onChange={(e) => setNewVariant({...newVariant, values: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              placeholder="e.g., Black, White, Blue"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={addVariant}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
            >
              <Plus size={20} />
              <span className="ml-2">Add Variant</span>
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={newVariant.required}
            onChange={(e) => setNewVariant({...newVariant, required: e.target.checked})}
            className="h-4 w-4 text-indigo-600"
          />
          <label htmlFor="required" className="ml-2 text-sm text-gray-600">
            This variant is required for purchase
          </label>
        </div>
      </div>

      {/* Variant List */}
      <div className="space-y-4">
        {variants.map((variant) => (
          <div key={variant.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-50 rounded-lg mr-3">
                  {variant.type === 'Color' && <Palette className="text-indigo-600" size={20} />}
                  {variant.type === 'Size' && <Ruler className="text-indigo-600" size={20} />}
                  {!['Color', 'Size'].includes(variant.type) && <Hash className="text-indigo-600" size={20} />}
                </div>
                <div>
                  <div className="font-medium">{variant.type}</div>
                  <div className="text-sm text-gray-600">
                    {variant.required ? 'Required' : 'Optional'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeVariant(variant.id)}
                className="p-2 hover:bg-red-50 rounded-lg text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {variant.values.map((value, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-800"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => removeValue(variant.id, index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Add new value"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addValue(variant.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousSibling;
                  addValue(variant.id, input.value);
                  input.value = '';
                }}
                className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Variant Combinations */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Variant Combinations</h4>
              <p className="text-sm text-gray-600">Set prices and inventory for each variant</p>
            </div>
            <button
              onClick={generateVariants}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Generate Combinations
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">
                  Combination
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">
                  Price (₹)
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">
                  Stock
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">
                  SKU
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {variantCombinations.map((combination) => (
                <tr key={combination.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium">{combination.combination}</div>
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="number"
                      value={combination.price}
                      onChange={(e) => updateVariantCombination(combination.id, 'price', e.target.value)}
                      className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="number"
                      value={combination.stock}
                      onChange={(e) => updateVariantCombination(combination.id, 'stock', e.target.value)}
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="text"
                      value={combination.sku}
                      onChange={(e) => updateVariantCombination(combination.id, 'sku', e.target.value)}
                      className="w-40 px-3 py-1.5 border border-gray-300 rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bulk Update Price
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
                Bulk Update Stock
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

            <div className="flex items-end">
              <button className="w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                Copy Prices from First Variant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-medium mb-4">Variant Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{variants.length}</div>
            <div className="text-sm text-gray-600">Variant Types</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {variants.reduce((total, v) => total + v.values.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Options</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {variantCombinations.length}
            </div>
            <div className="text-sm text-gray-600">Combinations</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {variantCombinations.reduce((total, c) => total + parseInt(c.stock), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantForm;