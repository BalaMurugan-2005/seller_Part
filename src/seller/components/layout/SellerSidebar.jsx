import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3,
  Wallet, 
  User,
  Settings,
  FileText,
  TrendingUp,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/seller/products', icon: Package },
  { name: 'Inventory', href: '/seller/inventory', icon: Package },
  { name: 'Orders', href: '/seller/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
  { name: 'Payouts', href: '/seller/payouts', icon: Wallet },
  { name: 'Reports', href: '/seller/reports', icon: FileText },
  { name: 'Profile', href: '/seller/profile', icon: User },
  { name: 'Settings', href: '/seller/settings', icon: Settings },
];

const SellerSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`
      ${collapsed ? 'w-20' : 'w-64'}
      bg-white border-r border-gray-200 flex flex-col transition-all duration-300
    `}>
      <div className="p-6 border-b border-gray-100">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <h1 className="text-xl font-bold text-indigo-600">Seller Hub</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `
              flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-700 hover:bg-gray-100'
              }
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className={`${collapsed ? 'hidden' : 'block'} p-3 bg-amber-50 rounded-lg`}>
          <div className="flex items-start">
            <AlertCircle className="text-amber-500 mt-0.5" size={16} />
            <div className="ml-2">
              <p className="text-xs font-medium text-amber-800">2 Low Stock Items</p>
              <button className="text-xs text-amber-600 hover:text-amber-700 mt-1">
                View Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;