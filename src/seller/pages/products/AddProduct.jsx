import React, { useState } from 'react';
import { 
  ChevronRight, 
  Upload, 
  X,
  Package,
  Tag,
  DollarSign,
  Layers,
  Truck,
  Eye,
  Save
} from 'lucide-react';

const AddProduct = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    comparePrice: '',
    costPerItem: '',
    profit: '',
    sku: '',
    barcode: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    hasVariants: false,
    inventory: 0,
    lowStockThreshold: 10,
    status: 'draft'
  });

  const steps = [
    { id: 1, title: 'Product Info' },
    { id: 2, title: 'Pricing' },
    { id: 3, title: 'Inventory' },
    { id: 4, title: 'Shipping' },
    { id: 5, title: 'Media' },
    { id: 6, title: 'Variants' },
  ];

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Beauty',
    'Sports',
    'Books',
    'Automotive'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter product title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe your product"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter brand name"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compare at Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="comparePrice"
                    value={productData.comparePrice}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost per Item
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="costPerItem"
                    value={productData.costPerItem}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {productData.price && productData.costPerItem && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-xl font-bold text-green-700">
                      ₹{(productData.price - productData.costPerItem).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Margin %</p>
                    <p className="text-xl font-bold text-green-700">
                      {((productData.price - productData.costPerItem) / productData.price * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  type="text"
                  name="sku"
                  value={productData.sku}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., SKU-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Barcode (ISBN, UPC, GTIN)
                </label>
                <input
                  type="text"
                  name="barcode"
                  value={productData.barcode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter barcode"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="inventory"
                  value={productData.inventory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter stock quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  value={productData.lowStockThreshold}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Default: 10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasVariants"
                  name="hasVariants"
                  checked={productData.hasVariants}
                  onChange={(e) => setProductData(prev => ({
                    ...prev,
                    hasVariants: e.target.checked
                  }))}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label htmlFor="hasVariants" className="ml-2 text-sm font-medium text-gray-700">
                  This product has variants (size, color, etc.)
                </label>
              </div>
              
              {productData.hasVariants && (
                <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    Product variants will be configured in step 6
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveStep(6)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Configure Variants Now →
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Status
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={productData.status === 'draft'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Draft</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={productData.status === 'active'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="archived"
                    checked={productData.status === 'archived'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Archived</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Shipping Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={productData.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (cm)
                </label>
                <input
                  type="number"
                  name="length"
                  value={productData.length}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (cm)
                </label>
                <input
                  type="number"
                  name="width"
                  value={productData.width}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={productData.height}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <Truck className="text-blue-500 mt-0.5 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-blue-800">Shipping Information</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Shipping charges are calculated automatically based on these dimensions and weight.
                    Make sure to enter accurate measurements to avoid shipping cost discrepancies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
        <p className="text-gray-600">Add a new product to your catalog</p>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${activeStep >= step.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  {step.id}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  activeStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  activeStep > step.id ? 'bg-indigo-600' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div>
            <button
              type="button"
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              className={`px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 ${
                activeStep === 1 ? 'invisible' : ''
              }`}
            >
              Previous
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Save size={16} className="inline mr-2" />
              Save as Draft
            </button>
            
            {activeStep < steps.length ? (
              <button
                type="button"
                onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Next Step
                <ChevronRight size={16} className="inline ml-2" />
              </button>
            ) : (
              <button
                type="button"
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Publish Product
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Product Preview</h3>
        <div className="flex items-start space-x-6">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package size={40} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">
              {productData.title || 'Product Title'}
            </h4>
            <p className="text-gray-600 mt-1">
              {productData.description || 'Product description will appear here...'}
            </p>
            <div className="mt-4">
              <span className="text-2xl font-bold">₹{productData.price || '0.00'}</span>
              {productData.comparePrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ₹{productData.comparePrice}
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded ${
                productData.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {productData.status || 'Draft'}
              </span>
              <span>Stock: {productData.inventory || 0}</span>
              <span>SKU: {productData.sku || 'Not set'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;