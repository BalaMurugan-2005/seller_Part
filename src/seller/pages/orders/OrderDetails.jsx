import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Printer,
  Download,
  Truck,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '../../components/orders/StatusBadge';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    id: 'ORD-7894',
    date: 'Dec 12, 2023 • 10:30 AM',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 9876543210',
      address: '123, MG Road, Bangalore, Karnataka - 560001'
    },
    shipping: {
      method: 'Standard Delivery',
      cost: '₹49',
      estimatedDelivery: 'Dec 15-18, 2023',
      trackingNumber: 'TRK7894561230',
      carrier: 'DTDC'
    },
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        sku: 'AUDIO-001-BLK',
        price: '₹2,499',
        quantity: 1,
        total: '₹2,499',
        image: 'https://via.placeholder.com/80'
      },
      {
        id: 2,
        name: 'Carrying Case',
        sku: 'CASE-001',
        price: '₹299',
        quantity: 1,
        total: '₹299',
        image: 'https://via.placeholder.com/80'
      }
    ],
    totals: {
      subtotal: '₹2,798',
      shipping: '₹49',
      tax: '₹504',
      discount: '₹0',
      total: '₹2,850'
    },
    notes: 'Please deliver between 2 PM to 5 PM. Contact before delivery.',
    timeline: [
      { time: 'Dec 12, 10:30 AM', status: 'Order Placed', description: 'Order was placed by customer' },
      { time: 'Dec 12, 11:45 AM', status: 'Payment Received', description: 'Payment confirmed via Credit Card' },
      { time: 'Dec 12, 2:30 PM', status: 'Order Processing', description: 'Order is being processed' }
    ]
  });

  const [statusHistory, setStatusHistory] = useState([
    { status: 'placed', timestamp: 'Dec 12, 10:30 AM' },
    { status: 'paid', timestamp: 'Dec 12, 11:45 AM' },
    { status: 'processing', timestamp: 'Dec 12, 2:30 PM' }
  ]);

  const handleStatusChange = (newStatus) => {
    const newHistory = [
      ...statusHistory,
      { status: newStatus, timestamp: new Date().toLocaleString() }
    ];
    setStatusHistory(newHistory);
    setOrder({ ...order, status: newStatus });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <MessageSquare size={16} className="mr-2" />
            Contact Customer
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer size={16} className="mr-2" />
            Print Invoice
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download size={16} className="mr-2" />
            Download Packing Slip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Order Status</h3>
                <p className="text-sm text-gray-600">Current status and actions</p>
              </div>
              <StatusBadge status={order.status} size="lg" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Package className="text-gray-400 mr-3" size={20} />
                  <div>
                    <div className="font-medium">Ready to Process</div>
                    <div className="text-sm text-gray-600">Pack and prepare for shipping</div>
                  </div>
                </div>
                <button
                  onClick={() => handleStatusChange('packed')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Mark as Packed
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Truck className="text-gray-400 mr-3" size={20} />
                  <div>
                    <div className="font-medium">Ready to Ship</div>
                    <div className="text-sm text-gray-600">Generate shipping label</div>
                  </div>
                </div>
                <button
                  onClick={() => handleStatusChange('shipped')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Mark as Shipped
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-4">Status Timeline</h4>
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === statusHistory.length - 1 ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      {index < statusHistory.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium capitalize">{item.status}</div>
                        <div className="text-sm text-gray-500">{item.timestamp}</div>
                      </div>
                      {order.timeline[index] && (
                        <div className="text-sm text-gray-600 mt-1">
                          {order.timeline[index].description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">SKU: {item.sku}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.price}</div>
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    <div className="font-medium mt-1">{item.total}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="max-w-md ml-auto space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{order.totals.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.totals.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{order.totals.tax}</span>
                </div>
                {order.totals.discount !== '₹0' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-{order.totals.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>{order.totals.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Shipping */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Customer Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="text-gray-400 mr-3" size={20} />
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm text-gray-600">Customer</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="text-gray-400 mr-3" size={20} />
                <div>
                  <div className="font-medium">{order.customer.email}</div>
                  <div className="text-sm text-gray-600">Email</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-gray-400 mr-3" size={20} />
                <div>
                  <div className="font-medium">{order.customer.phone}</div>
                  <div className="text-sm text-gray-600">Phone</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-gray-400 mr-3 mt-0.5" size={20} />
                <div>
                  <div className="font-medium">Shipping Address</div>
                  <div className="text-sm text-gray-600 mt-1">{order.customer.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Shipping Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Truck className="text-gray-400 mr-3" size={20} />
                  <div>
                    <div className="font-medium">{order.shipping.method}</div>
                    <div className="text-sm text-gray-600">Shipping Method</div>
                  </div>
                </div>
                <div className="font-medium">{order.shipping.cost}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Estimated Delivery</div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="font-medium">{order.shipping.estimatedDelivery}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Tracking Number</div>
                <div className="font-medium">{order.shipping.trackingNumber}</div>
                <div className="text-sm text-gray-600 mt-1">Carrier: {order.shipping.carrier}</div>
              </div>
              
              <button className="w-full py-2.5 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                Update Tracking
              </button>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Payment Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="text-gray-400 mr-3" size={20} />
                  <div>
                    <div className="font-medium">{order.paymentMethod}</div>
                    <div className="text-sm text-gray-600">Payment Method</div>
                  </div>
                </div>
                <StatusBadge status={order.paymentStatus} />
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Transaction ID</div>
                <div className="font-medium">TXN7894561230</div>
              </div>
              
              <button className="w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                View Payment Details
              </button>
            </div>
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Order Notes</h3>
              <div className="flex items-start">
                <AlertCircle className="text-amber-500 mt-0.5 mr-3" size={20} />
                <div className="text-sm text-gray-600">{order.notes}</div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Process Order
              </button>
              <button className="w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                Create Return
              </button>
              <button className="w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;