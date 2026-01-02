import React, { useState } from 'react';
import { 
  Package, 
  CheckCircle, 
  Printer, 
  Download,
  AlertCircle,
  Box,
  Truck,
  User,
  MapPin,
  Phone,
  X,
  ChevronRight
} from 'lucide-react';

const Packaging = () => {
  const [packingItems, setPackingItems] = useState([
    { id: 1, name: 'Wireless Headphones', quantity: 1, packed: true },
    { id: 2, name: 'Carrying Case', quantity: 1, packed: true },
    { id: 3, name: 'USB-C Cable', quantity: 1, packed: false },
    { id: 4, name: 'User Manual', quantity: 1, packed: false },
    { id: 5, name: 'Warranty Card', quantity: 1, packed: false },
  ]);

  const [packagingMaterials, setPackagingMaterials] = useState([
    { id: 1, name: 'Box (Medium)', quantity: 1, used: true },
    { id: 2, name: 'Bubble Wrap', quantity: 2, used: true },
    { id: 3, name: 'Packaging Tape', quantity: 1, used: false },
    { id: 4, name: 'Fragile Sticker', quantity: 1, used: false },
    { id: 5, name: 'Invoice Copy', quantity: 1, used: false },
  ]);

  const orderDetails = {
    orderId: 'ORD-7894',
    customer: 'Rahul Sharma',
    date: 'Dec 12, 2023 • 10:30 AM',
    amount: '₹2,499',
    shipping: 'Standard Delivery (3-5 days)',
    payment: 'Paid • Credit Card',
    address: '123, MG Road, Bangalore, Karnataka - 560001',
    phone: '+91 9876543210',
    email: 'rahul.sharma@example.com',
    weight: '0.8 kg',
    dimensions: '15 × 10 × 5 cm'
  };

  const toggleItemPacked = (id) => {
    setPackingItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const toggleMaterialUsed = (id) => {
    setPackagingMaterials(materials =>
      materials.map(material =>
        material.id === id ? { ...material, used: !material.used } : material
      )
    );
  };

  const packedCount = packingItems.filter(item => item.packed).length;
  const totalItems = packingItems.length;
  const allPacked = packedCount === totalItems;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Packaging</h1>
          <p className="text-gray-600">Pack order #ORD-7894 for shipping</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer size={16} className="mr-2" />
            Print Label
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Download Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Packing Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Packing Progress */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Packing Checklist</h2>
                <p className="text-sm text-gray-600">Mark items as packed</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${allPacked ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {packedCount}/{totalItems} Packed
              </div>
            </div>

            <div className="space-y-3">
              {packingItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    item.packed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleItemPacked(item.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                        item.packed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {item.packed && <CheckCircle size={14} className="text-white" />}
                    </button>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                    </div>
                  </div>
                  {item.packed && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle size={16} className="mr-1" />
                      <span className="text-sm font-medium">Packed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium mb-4">Packaging Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packagingMaterials.map((material) => (
                  <div
                    key={material.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      material.used ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleMaterialUsed(material.id)}
                        className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${
                          material.used
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {material.used && <CheckCircle size={12} className="text-white" />}
                      </button>
                      <div>
                        <div className="text-sm font-medium">{material.name}</div>
                        <div className="text-xs text-gray-600">Qty: {material.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions & Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold mb-4">Packing Instructions</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <AlertCircle className="text-amber-500 mt-0.5 mr-3" size={18} />
                <div>
                  <p className="font-medium">Handle with Care</p>
                  <p className="text-sm text-gray-600 mt-1">
                    This product contains fragile components. Use sufficient bubble wrap.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Box className="text-blue-500 mt-0.5 mr-3" size={18} />
                <div>
                  <p className="font-medium">Include All Accessories</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Ensure USB cable, user manual, and warranty card are included.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Truck className="text-green-500 mt-0.5 mr-3" size={18} />
                <div>
                  <p className="font-medium">Shipping Label Placement</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Place the shipping label on the top of the box. Add "Fragile" sticker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Total</span>
                <span className="text-lg font-bold">{orderDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Method</span>
                <span className="font-medium">{orderDetails.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className="text-green-600 font-medium">{orderDetails.payment}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium mb-4">Package Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span>{orderDetails.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions</span>
                  <span>{orderDetails.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span>₹49</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Customer Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="text-gray-400 mr-3" size={18} />
                <div>
                  <p className="font-medium">{orderDetails.customer}</p>
                  <p className="text-sm text-gray-600">{orderDetails.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-gray-400 mr-3 mt-0.5" size={18} />
                <div>
                  <p className="font-medium">Shipping Address</p>
                  <p className="text-sm text-gray-600 mt-1">{orderDetails.address}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-gray-400 mr-3" size={18} />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{orderDetails.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="gift-wrap"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label htmlFor="gift-wrap" className="ml-2 text-sm">
                  Add gift wrapping (₹99)
                </label>
              </div>
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="insurance"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label htmlFor="insurance" className="ml-2 text-sm">
                  Add shipping insurance (₹49)
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              <button
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
                  allPacked
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!allPacked}
              >
                <Package className="mr-2" size={20} />
                {allPacked ? 'Confirm & Mark as Packed' : 'Complete Packing First'}
                <ChevronRight className="ml-2" size={20} />
              </button>
              
              <button className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Generate Shipping Label
              </button>
              
              <button className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                Save as Draft
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-3">Next Steps</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                    1
                  </div>
                  <span>Complete packing checklist</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2">
                    2
                  </div>
                  <span className="text-gray-500">Print shipping label</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2">
                    3
                  </div>
                  <span className="text-gray-500">Schedule courier pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packaging;