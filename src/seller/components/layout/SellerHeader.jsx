import React, { useState } from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';

const SellerHeader = () => {
  const [notifications] = useState([
    { id: 1, text: 'New order #ORD-7894 received', time: '5 min ago' },
    { id: 2, text: 'Product "Wireless Headphones" is low in stock', time: '1 hour ago' },
    { id: 3, text: 'Payout of ₹15,423 processed', time: '2 hours ago' },
  ]);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search products, orders, or reports..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <HelpCircle size={20} />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold">JD</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John's Store</p>
              <p className="text-xs text-gray-500">Premium Seller</p>
            </div>
            <ChevronDown size={20} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-4 flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-gray-600">Store Active</span>
        </div>
        <div className="text-gray-600">
          <span className="font-medium">₹1,24,856</span> This month
        </div>
        <div className="text-gray-600">
          <span className="font-medium">128</span> Orders pending
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;