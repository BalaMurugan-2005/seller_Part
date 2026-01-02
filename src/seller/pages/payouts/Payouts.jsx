import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Download, 
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Banknote,
  Calendar
} from 'lucide-react';

const Payouts = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  const payoutData = {
    balance: {
      available: '₹42,856',
      pending: '₹18,942',
      lastPayout: '₹24,914',
      nextPayout: 'Dec 15, 2023'
    },
    stats: [
      { label: 'Total Earned', value: '₹1,24,856', change: '+12.5%' },
      { label: 'Processing Fees', value: '₹4,256', change: '-2.1%' },
      { label: 'Tax Deducted', value: '₹12,486', change: '+5.3%' },
      { label: 'Net Received', value: '₹1,08,114', change: '+11.2%' },
    ],
    history: [
      { id: 'PAY-001', date: 'Dec 10, 2023', amount: '₹24,914', status: 'completed', method: 'Bank Transfer' },
      { id: 'PAY-002', date: 'Dec 3, 2023', amount: '₹18,756', status: 'completed', method: 'Bank Transfer' },
      { id: 'PAY-003', date: 'Nov 26, 2023', amount: '₹22,489', status: 'completed', method: 'Bank Transfer' },
      { id: 'PAY-004', date: 'Nov 19, 2023', amount: '₹19,432', status: 'completed', method: 'Bank Transfer' },
      { id: 'PAY-005', date: 'Dec 12, 2023', amount: '₹18,942', status: 'processing', method: 'Bank Transfer' },
    ],
    upcoming: [
      { date: 'Dec 15, 2023', amount: '₹18,942', status: 'scheduled' },
      { date: 'Dec 22, 2023', amount: '₹22,156', status: 'estimated' },
      { date: 'Dec 29, 2023', amount: '₹24,891', status: 'estimated' },
    ]
  };

  const bankDetails = {
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX-XXXX-1234',
    accountName: 'John Electronics Store',
    ifscCode: 'HDFC0001234',
    branch: 'MG Road, Bangalore'
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Completed' },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Clock, text: 'Processing' },
      scheduled: { color: 'bg-amber-100 text-amber-800', icon: Calendar, text: 'Scheduled' },
      estimated: { color: 'bg-gray-100 text-gray-800', icon: Clock, text: 'Estimated' },
      failed: { color: 'bg-red-100 text-red-800', icon: AlertCircle, text: 'Failed' }
    };
    const { color, icon: Icon, text } = config[status];
    return (
      <div className={`px-3 py-1 rounded-full flex items-center ${color}`}>
        <Icon size={14} className="mr-1.5" />
        <span className="text-xs font-medium">{text}</span>
      </div>
    );
  };

  const handleWithdraw = () => {
    // In real app, this would call an API
    alert(`Withdrawal request for ₹${withdrawAmount} submitted!`);
    setWithdrawAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
          <p className="text-gray-600">Manage your earnings and withdrawals</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Statements
          </button>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-3xl font-bold mt-2">{payoutData.balance.available}</p>
                <p className="text-sm opacity-90 mt-2">Ready to withdraw</p>
              </div>
              <Wallet size={48} className="opacity-90" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm opacity-90">Pending Balance</p>
                <p className="text-xl font-semibold mt-1">{payoutData.balance.pending}</p>
                <p className="text-xs opacity-75 mt-1">Including recent orders</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Last Payout</p>
                <p className="text-xl font-semibold mt-1">{payoutData.balance.lastPayout}</p>
                <p className="text-xs opacity-75 mt-1">Processed on Dec 10</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {payoutData.stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center text-sm ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change.startsWith('+') ? (
                      <ArrowUpRight size={16} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={16} className="mr-1" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Withdraw Funds</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Withdraw
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter amount"
                  max={payoutData.balance.available.replace('₹', '').replace(',', '')}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Min: ₹500</span>
                <span>Max: {payoutData.balance.available}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setWithdrawAmount('5000')}
                className="w-full py-2.5 text-center border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ₹5,000
              </button>
              <button
                onClick={() => setWithdrawAmount('10000')}
                className="w-full py-2.5 text-center border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ₹10,000
              </button>
              <button
                onClick={() => setWithdrawAmount(payoutData.balance.available.replace('₹', '').replace(',', ''))}
                className="w-full py-2.5 text-center border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Withdraw All
              </button>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) < 500}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                withdrawAmount && parseFloat(withdrawAmount) >= 500
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Request Withdrawal
            </button>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2" />
                <span>Withdrawals are processed within 24-48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Bank Account Details</h3>
            <p className="text-sm text-gray-600">Funds will be transferred to this account</p>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Update Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Banknote size={20} className="text-gray-400 mr-3" />
                <span>{bankDetails.bankName}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <CreditCard size={20} className="text-gray-400 mr-3" />
                <span>{bankDetails.accountNumber}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span>{bankDetails.accountName}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IFSC Code
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <code className="text-sm">{bankDetails.ifscCode}</code>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span>{bankDetails.branch}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Payout Date
              </label>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <Calendar size={20} className="text-amber-600 mr-3" />
                <span className="font-medium">{payoutData.balance.nextPayout}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Payout History</h3>
              <p className="text-sm text-gray-600">Recent transactions and payouts</p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payout ID
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payoutData.history.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium">{payout.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">{payout.date}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">{payout.amount}</div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(payout.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">{payout.method}</div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700">
                      Download Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Payouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Upcoming Payouts</h3>
          <div className="space-y-4">
            {payoutData.upcoming.map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">{payout.date}</div>
                    <div className="text-sm text-gray-600">Scheduled payout</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{payout.amount}</div>
                  {getStatusBadge(payout.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Payout Schedule</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-800">Weekly Payouts</div>
              <div className="text-sm text-blue-600 mt-1">
                Every Friday at 4 PM
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">Processing Time</div>
              <div className="text-sm text-green-600 mt-1">
                1-2 business days
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="font-medium text-amber-800">Minimum Threshold</div>
              <div className="text-sm text-amber-600 mt-1">
                ₹500 minimum balance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payouts;