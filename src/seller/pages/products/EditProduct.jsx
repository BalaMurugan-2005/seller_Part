import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save,
  Eye,
  Package,
  Tag,
  DollarSign,
  Layers,
  Truck
} from 'lucide-react';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    comparePrice: '',
    costPrice: '',
    sku: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    inventory: 0,
    lowStockThreshold: 10,
    status: 'active',
    tags: [],
    images: []
  });

  useEffect(() => {
    // In a real app, fetch product data by ID
    const fetchProduct = async () => {
      setLoading(true);
      // Mock API call
      setTimeout(() => {
        setProductData({
          title: 'Wireless Bluetooth Headphones',
          description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
          category: 'Electronics',
          brand: 'AudioPro',
          price: '2499',
          comparePrice: '2999',
          costPrice: '1500',
          sku: 'AUDIO-001-BLK',
          weight: '0.5',
          length: '20',
          width: '15',
          height: '5',
          inventory: 24,
          lowStockThreshold: 10,
          status: 'active',
          tags: ['electronics', 'audio', 'wireless', 'headphones'],
          images: [
            'https://via.placeholder.com/400',
            'https://via.placeholder.com/400',
            'https://via.placeholder.com/400'
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Package },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'inventory', label: 'Inventory', icon: Layers },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'seo', label: 'SEO', icon: Tag },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagAdd = (tag) => {
    if (tag && !productData.tags.includes(tag)) {
      setProductData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    // In real app, make API call to update product
    console.log('Saving product:', productData);
    alert('Product updated successfully!');
    navigate('/seller/products');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                rows={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                placeholder="Describe your product in detail"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Sports">Sports</option>
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="Brand name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {productData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add a tag"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTagAdd(e.target.value.toLowerCase());
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  className="px-4 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    handleTagAdd(input.value.toLowerCase());
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compare at Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                  <input
                    type="number"
                    name="comparePrice"
                    value={productData.comparePrice}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                  <input
                    type="number"
                    name="costPrice"
                    value={productData.costPrice}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Price Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost Price</span>
                  <span>₹{productData.costPrice || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selling Price</span>
                  <span className="font-medium">₹{productData.price || '0'}</span>
                </div>
                {productData.comparePrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compare Price</span>
                    <span className="text-gray-500 line-through">₹{productData.comparePrice}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Profit</span>
                    <span className="text-green-600">
                      ₹{(productData.price - productData.costPrice).toFixed(2)}
                      ({((productData.price - productData.costPrice) / productData.price * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU (Stock Keeping Unit)
              </label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                placeholder="e.g., AUDIO-001-BLK"
              />
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Stock *
                </label>
                <input
                  type="number"
                  name="inventory"
                  value={productData.inventory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Stock Status</div>
                  <div className={`text-sm font-medium ${
                    productData.inventory === 0 
                      ? 'text-red-600' 
                      : productData.inventory <= productData.lowStockThreshold 
                      ? 'text-amber-600' 
                      : 'text-green-600'
                  }`}>
                    {productData.inventory === 0 
                      ? 'Out of Stock' 
                      : productData.inventory <= productData.lowStockThreshold 
                      ? 'Low Stock' 
                      : 'In Stock'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{productData.inventory}</div>
                  <div className="text-sm text-gray-600">units available</div>
                </div>
              </div>
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
                    value="inactive"
                    checked={productData.status === 'inactive'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Inactive</span>
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

      case 'shipping':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Shipping Dimensions</h3>
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <Truck className="text-blue-500 mt-0.5 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-blue-800">Shipping Information</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Shipping costs are calculated automatically based on weight and dimensions.
                    Volumetric weight: {(productData.length * productData.width * productData.height) / 5000} kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Title
              </label>
              <input
                type="text"
                defaultValue={`Buy ${productData.title} Online | Best Price in India`}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                defaultValue={productData.description.substring(0, 160)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                defaultValue={productData.title.toLowerCase().replace(/\s+/g, '-')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/seller/products')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">Update product details and settings</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.open(`/product/${id}`, '_blank')}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Eye size={16} className="mr-2" />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Product Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Product Preview</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {productData.images[0] ? (
                <img
                  src={productData.images[0]}
                  alt={productData.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex mt-4 space-x-2">
              {productData.images.slice(0, 3).map((img, index) => (
                <div key={index} className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold">{productData.title}</h2>
            <div className="mt-2 flex items-center space-x-4">
              <span className="text-3xl font-bold">₹{productData.price}</span>
              {productData.comparePrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{productData.comparePrice}
                </span>
              )}
              {productData.comparePrice && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  Save ₹{(productData.comparePrice - productData.price).toFixed(2)}
                </span>
              )}
            </div>
            <div className="mt-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                productData.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {productData.status}
              </span>
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {productData.inventory} in stock
              </span>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-600">{productData.description}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">SKU</div>
                <div className="font-medium">{productData.sku}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Category</div>
                <div className="font-medium">{productData.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Brand</div>
                <div className="font-medium">{productData.brand}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Weight</div>
                <div className="font-medium">{productData.weight} kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;