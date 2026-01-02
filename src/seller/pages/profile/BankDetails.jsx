import React, { useState } from 'react';
import { 
  Banknote, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Edit,
  Save,
  X,
  Shield
} from 'lucide-react';

const BankDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: 'John Electronics Store',
    accountNumber: '123456789012',
    confirmAccountNumber: '123456789012',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    branch: 'MG Road, Bangalore',
    accountType: 'current',
    upiId: 'johnstore@hdfc',
    verified: true,
    verificationStatus: 'verified'
  });

  const [verificationMethod, setVerificationMethod] = useState('instant');
  const [verificationStep, setVerificationStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Validate account numbers match
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      alert('Account numbers do not match!');
      return;
    }

    // In real app, make API call to save bank details
    setIsEditing(false);
    alert('Bank details updated successfully!');
  };

  const handleVerifyAccount = () => {
    setVerificationStep(2);
    // Simulate verification process
    setTimeout(() => {
      setVerificationStep(3);
      setBankDetails(prev => ({
        ...prev,
        verificationStatus: 'verified'
      }));
    }, 2000);
  };

  const accountTypes = [
    { value: 'savings', label: 'Savings Account' },
    { value: 'current', label: 'Current Account' },
    { value: 'salary', label: 'Salary Account' }
  ];

  const banks = [
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Account Details</h1>
          <p className="text-gray-600">Manage bank account for receiving payouts</p>
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
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Verification Status */}
      <div className={`rounded-xl border p-6 ${
        bankDetails.verificationStatus === 'verified'
          ? 'bg-green-50 border-green-200'
          : bankDetails.verificationStatus === 'pending'
          ? 'bg-amber-50 border-amber-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {bankDetails.verificationStatus === 'verified' ? (
              <CheckCircle className="text-green-600 mr-3" size={24} />
            ) : (
              <AlertCircle className="text-amber-600 mr-3" size={24} />
            )}
            <div>
              <h3 className="font-semibold">
                {bankDetails.verificationStatus === 'verified' 
                  ? 'Account Verified' 
                  : 'Account Verification Required'}
              </h3>
              <p className="text-sm opacity-75">
                {bankDetails.verificationStatus === 'verified'
                  ? 'Your bank account is verified and ready for payouts'
                  : 'Verify your account to enable payouts'}
              </p>
            </div>
          </div>
          {bankDetails.verificationStatus !== 'verified' && (
            <button
              onClick={handleVerifyAccount}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Verify Now
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bank Details Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Bank Account Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name *
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Account Number *
                </label>
                <input
                  type="text"
                  name="confirmAccountNumber"
                  value={bankDetails.confirmAccountNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <select
                  name="bankName"
                  value={bankDetails.bankName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50"
                >
                  <option value="">Select Bank</option>
                  {banks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={bankDetails.ifscCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  placeholder="HDFC0001234"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch Address
              </label>
              <input
                type="text"
                name="branch"
                value={bankDetails.branch}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {accountTypes.map((type) => (
                  <label key={type.value} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value={type.value}
                      checked={bankDetails.accountType === type.value}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-3">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID (Optional)
              </label>
              <input
                type="text"
                name="upiId"
                value={bankDetails.upiId}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-50"
                placeholder="username@bank"
              />
            </div>
          </div>
        </div>

        {/* Verification & Security */}
        <div className="space-y-6">
          {/* Verification Process */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Verification Process</h3>
            
            <div className="space-y-6">
              {/* Step Indicator */}
              <div className="flex items-center">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      verificationStep >= step
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        verificationStep > step ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step Content */}
              {verificationStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Choose Verification Method</h4>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="verificationMethod"
                          value="instant"
                          checked={verificationMethod === 'instant'}
                          onChange={() => setVerificationMethod('instant')}
                          className="h-4 w-4 text-indigo-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium">Instant Verification</div>
                          <div className="text-sm text-gray-600">Verify instantly using bank credentials</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="verificationMethod"
                          value="manual"
                          checked={verificationMethod === 'manual'}
                          onChange={() => setVerificationMethod('manual')}
                          className="h-4 w-4 text-indigo-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium">Manual Verification</div>
                          <div className="text-sm text-gray-600">Upload bank statement or cancelled cheque</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setVerificationStep(2)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Continue
                  </button>
                </div>
              )}

              {verificationStep === 2 && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <h4 className="font-medium mb-2">Verifying Your Account</h4>
                  <p className="text-gray-600">Please wait while we verify your bank details...</p>
                </div>
              )}

              {verificationStep === 3 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h4 className="font-medium mb-2">Verification Complete!</h4>
                  <p className="text-gray-600 mb-6">Your bank account has been successfully verified</p>
                  <button
                    onClick={() => setVerificationStep(1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Verify Another Account
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="text-green-600 mr-3" size={24} />
              <div>
                <h3 className="font-semibold">Security Information</h3>
                <p className="text-sm text-gray-600">Your financial data is protected</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Bank details are encrypted and stored securely</span>
              </div>
              <div className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>We never store your bank login credentials</span>
              </div>
              <div className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>All transactions are PCI DSS compliant</span>
              </div>
              <div className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>256-bit SSL encryption for all data transfers</span>
              </div>
            </div>
          </div>

          {/* Payout Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Payout Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Payout Schedule</span>
                <span className="font-medium">Weekly (Every Friday)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Time</span>
                <span className="font-medium">1-2 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Payout</span>
                <span className="font-medium">₹500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payout Fee</span>
                <span className="font-medium">₹10 per transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payouts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Recent Payouts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4">Dec 10, 2023</td>
                <td className="py-3 px-4 font-medium">₹24,914</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">TXN7894561230</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Dec 3, 2023</td>
                <td className="py-3 px-4 font-medium">₹18,756</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">TXN7894561229</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Nov 26, 2023</td>
                <td className="py-3 px-4 font-medium">₹22,489</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">TXN7894561228</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;