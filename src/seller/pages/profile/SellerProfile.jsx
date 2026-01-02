import React, { useState } from 'react';
import { 
  User, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  CheckCircle,
  AlertCircle,
  Edit,
  Save,
  X,
  Upload,
  Camera
} from 'lucide-react';

const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    storeName: 'John Electronics Store',
    ownerName: 'John Doe',
    businessType: 'Private Limited',
    email: 'john@example.com',
    phone: '+91 9876543210',
    address: '123, MG Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
    website: 'www.johnelectronics.com',
    gstin: '29ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    description: 'Premium electronics retailer specializing in audio devices and smart gadgets.',
    storeCategory: 'Electronics',
    yearsInBusiness: '3',
    monthlyRevenue: '₹5-10 Lakhs'
  });

  const kycStatus = {
    basic: { status: 'verified', date: 'Dec 1, 2023' },
    business: { status: 'pending', date: 'Under review' },
    bank: { status: 'verified', date: 'Dec 3, 2023' },
    tax: { status: 'verified', date: 'Dec 5, 2023' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In real app, this would call an API
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const getStatusBadge = (status) => {
    const config = {
      verified: { color: 'bg-green-100 text-green-800', text: 'Verified' },
      pending: { color: 'bg-amber-100 text-amber-800', text: 'Pending' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
    };
    const { color, text } = config[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Profile</h1>
          <p className="text-gray-600">Manage your store information and KYC details</p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X size={16} className="inline mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save size={16} className="inline mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Edit size={16} className="inline mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                <Building size={48} className="text-indigo-600" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
                <Camera size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{profileData.storeName}</h2>
                <p className="text-gray-600 mt-1">{profileData.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-sm text-gray-600">Premium Seller</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center">
                <User className="text-gray-400 mr-3" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Owner</div>
                  <div className="font-medium">{profileData.ownerName}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="text-gray-400 mr-3" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">{profileData.email}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-gray-400 mr-3" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium">{profileData.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">KYC Verification Status</h3>
            <p className="text-sm text-gray-600">Complete verification for full access</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">Overall Status:</div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              Partially Verified
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(kycStatus).map(([key, value]) => (
            <div key={key} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="capitalize font-medium">{key} Details</div>
                {getStatusBadge(value.status)}
              </div>
              <div className="text-sm text-gray-600">
                {value.status === 'verified' ? 'Verified on' : 'Status'} {value.date}
              </div>
              {value.status === 'pending' && (
                <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Complete Now →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Store Information</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name *
              </label>
              <input
                type="text"
                name="storeName"
                value={profileData.storeName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                name="businessType"
                value={profileData.businessType}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option>Private Limited</option>
                <option>Partnership</option>
                <option>Proprietorship</option>
                <option>LLP</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg disabled:bg-gray-50 disabled:text-gray-500"
                />
                {isEditing && (
                  <button className="px-4 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50">
                    Verify
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="flex">
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg disabled:bg-gray-50 disabled:text-gray-500"
                />
                {isEditing && (
                  <button className="px-4 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50">
                    Verify
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Address *
            </label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={profileData.pincode}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500">
                  https://
                </span>
                <input
                  type="text"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Category
              </label>
              <select
                name="storeCategory"
                value={profileData.storeCategory}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Kitchen</option>
                <option>Beauty</option>
                <option>Sports</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GSTIN Number
              </label>
              <input
                type="text"
                name="gstin"
                value={profileData.gstin}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number
              </label>
              <input
                type="text"
                name="panNumber"
                value={profileData.panNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years in Business
              </label>
              <input
                type="text"
                name="yearsInBusiness"
                value={profileData.yearsInBusiness}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Description
            </label>
            <textarea
              name="description"
              value={profileData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Required Documents</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Upload className="mx-auto text-gray-400 mb-3" size={32} />
            <div className="font-medium mb-1">PAN Card</div>
            <div className="text-sm text-green-600 mb-2">Verified</div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">
              Update Document
            </button>
          </div>
          
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Upload className="mx-auto text-gray-400 mb-3" size={32} />
            <div className="font-medium mb-1">GST Certificate</div>
            <div className="text-sm text-green-600 mb-2">Verified</div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">
              Update Document
            </button>
          </div>
          
          <div className="p-4 border-2 border-dashed border-amber-300 rounded-lg text-center">
            <AlertCircle className="mx-auto text-amber-400 mb-3" size={32} />
            <div className="font-medium mb-1">Business License</div>
            <div className="text-sm text-amber-600 mb-2">Pending Review</div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">
              Upload Document
            </button>
          </div>
          
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Upload className="mx-auto text-gray-400 mb-3" size={32} />
            <div className="font-medium mb-1">Cancelled Cheque</div>
            <div className="text-sm text-green-600 mb-2">Verified</div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">
              Update Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;