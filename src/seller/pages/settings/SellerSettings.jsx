import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Truck,
  Globe,
  CreditCard,
  Smartphone,
  Mail,
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const SellerSettings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      lowStockAlerts: true,
      paymentNotifications: true,
      marketingEmails: false,
      smsAlerts: false,
      weeklyReports: true
    },
    storePreferences: {
      autoArchiveOrders: true,
      requireOrderConfirmation: false,
      allowCancellations: true,
      holidayMode: false,
      vacationMessage: 'Our store is currently on vacation. Orders will be processed after Dec 25, 2023.',
      maxOrderQuantity: 10
    },
    shipping: {
      defaultCarrier: 'DTDC',
      shippingZones: [
        { zone: 'Local', rate: '₹49', deliveryTime: '1-2 days' },
        { zone: 'Regional', rate: '₹99', deliveryTime: '2-4 days' },
        { zone: 'National', rate: '₹149', deliveryTime: '4-7 days' }
      ],
      freeShippingThreshold: '₹999',
      packagingHandlingFee: '₹29'
    },
    account: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginNotifications: true,
      apiAccess: false
    }
  });

  const [activeTab, setActiveTab] = useState('notifications');

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };

  const handleInputChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'store-preferences', label: 'Store Preferences', icon: Globe },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Email Notifications</h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <div className="font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-600">
                        Receive email notifications for {key.toLowerCase().replace(/([a-z])([A-Z])/g, '$1 $2')}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('notifications', key)}
                      className="relative"
                    >
                      {value ? (
                        <ToggleRight className="text-green-500" size={40} />
                      ) : (
                        <ToggleLeft className="text-gray-400" size={40} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">SMS & Push Notifications</h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).slice(3).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <div className="font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-600">
                        {key.includes('sms') ? 'SMS alerts' : 'Mobile push notifications'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('notifications', key)}
                      className="relative"
                    >
                      {value ? (
                        <ToggleRight className="text-green-500" size={40} />
                      ) : (
                        <ToggleLeft className="text-gray-400" size={40} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'store-preferences':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Order Management</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-archive Orders</div>
                    <div className="text-sm text-gray-600">
                      Automatically archive orders after 90 days
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('storePreferences', 'autoArchiveOrders')}
                    className="relative"
                  >
                    {settings.storePreferences.autoArchiveOrders ? (
                      <ToggleRight className="text-green-500" size={40} />
                    ) : (
                      <ToggleLeft className="text-gray-400" size={40} />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Allow Order Cancellations</div>
                    <div className="text-sm text-gray-600">
                      Customers can cancel orders within 1 hour
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('storePreferences', 'allowCancellations')}
                    className="relative"
                  >
                    {settings.storePreferences.allowCancellations ? (
                      <ToggleRight className="text-green-500" size={40} />
                    ) : (
                      <ToggleLeft className="text-gray-400" size={40} />
                    )}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Order Quantity
                  </label>
                  <input
                    type="number"
                    value={settings.storePreferences.maxOrderQuantity}
                    onChange={(e) => handleInputChange('storePreferences', 'maxOrderQuantity', e.target.value)}
                    className="w-32 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Holiday Mode</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Holiday Mode</div>
                    <div className="text-sm text-gray-600">
                      Temporarily disable new orders
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('storePreferences', 'holidayMode')}
                    className="relative"
                  >
                    {settings.storePreferences.holidayMode ? (
                      <ToggleRight className="text-green-500" size={40} />
                    ) : (
                      <ToggleLeft className="text-gray-400" size={40} />
                    )}
                  </button>
                </div>

                {settings.storePreferences.holidayMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vacation Message
                    </label>
                    <textarea
                      value={settings.storePreferences.vacationMessage}
                      onChange={(e) => handleInputChange('storePreferences', 'vacationMessage', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Shipping Configuration</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Shipping Carrier
                  </label>
                  <select
                    value={settings.shipping.defaultCarrier}
                    onChange={(e) => handleInputChange('shipping', 'defaultCarrier', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  >
                    <option>DTDC</option>
                    <option>Blue Dart</option>
                    <option>Delhivery</option>
                    <option>Ecom Express</option>
                    <option>Shiprocket</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Free Shipping Threshold
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="text"
                      value={settings.shipping.freeShippingThreshold}
                      onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Packaging & Handling Fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="text"
                      value={settings.shipping.packagingHandlingFee}
                      onChange={(e) => handleInputChange('shipping', 'packagingHandlingFee', e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Shipping Zones</h3>
              <div className="space-y-4">
                {settings.shipping.shippingZones.map((zone, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Zone</div>
                      <div className="font-medium">{zone.zone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Shipping Rate</div>
                      <div className="font-medium">{zone.rate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Delivery Time</div>
                      <div className="font-medium">{zone.deliveryTime}</div>
                    </div>
                    <div className="flex items-center">
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">
                        Edit Zone
                      </button>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                  + Add Shipping Zone
                </button>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('account', 'twoFactorAuth')}
                    className="relative"
                  >
                    {settings.account.twoFactorAuth ? (
                      <ToggleRight className="text-green-500" size={40} />
                    ) : (
                      <ToggleLeft className="text-gray-400" size={40} />
                    )}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={settings.account.sessionTimeout}
                    onChange={(e) => handleInputChange('account', 'sessionTimeout', e.target.value)}
                    className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg"
                  >
                    <option>15</option>
                    <option>30</option>
                    <option>60</option>
                    <option>120</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Login Notifications</div>
                    <div className="text-sm text-gray-600">
                      Get notified for new logins
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('account', 'loginNotifications')}
                    className="relative"
                  >
                    {settings.account.loginNotifications ? (
                      <ToggleRight className="text-green-500" size={40} />
                    ) : (
                      <ToggleLeft className="text-gray-400" size={40} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">API Access</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable API Access</div>
                    <div className="text-sm text-gray-600">
                      Allow third-party applications to access your store data
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('account', 'apiAccess')}
                    className="relative"
                  >
                    {settings.account.apiAccess ? (
                      <ToggleRight className="text-green-500" size={40} />
                    ) : (
                      <ToggleLeft className="text-gray-400" size={40} />
                    )}
                  </button>
                </div>
                
                {settings.account.apiAccess && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">API Key</div>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">
                        Regenerate Key
                      </button>
                    </div>
                    <code className="text-sm bg-white p-3 rounded border border-gray-300 block">
                      sk_live_1234567890abcdef
                    </code>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  Deactivate Account
                </button>
                <button className="w-full py-3 border border-red-600 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Delete Account Permanently
                </button>
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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your store settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Mail size={20} className="text-gray-400" />
              <div>
                <div className="font-medium">Need Help?</div>
                <div className="text-sm text-gray-600">Contact our support team</div>
              </div>
            </div>
            <button className="w-full py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium">
              Contact Support
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {renderTabContent()}
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSettings;