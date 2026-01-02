import React, { useState } from 'react';
import { 
  Download, 
  Calendar,
  Filter,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const DownloadReports = () => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '2023-12-01',
    end: '2023-12-31'
  });

  const reportTypes = [
    {
      id: 'sales',
      name: 'Sales Report',
      description: 'Detailed sales data with order information',
      icon: TrendingUp,
      format: ['pdf', 'excel', 'csv'],
      schedule: 'daily'
    },
    {
      id: 'revenue',
      name: 'Revenue Report',
      description: 'Revenue breakdown by product and category',
      icon: BarChart3,
      format: ['pdf', 'excel'],
      schedule: 'weekly'
    },
    {
      id: 'inventory',
      name: 'Inventory Report',
      description: 'Stock levels and inventory movement',
      icon: PieChart,
      format: ['excel', 'csv'],
      schedule: 'daily'
    },
    {
      id: 'customer',
      name: 'Customer Report',
      description: 'Customer insights and purchase history',
      icon: FileText,
      format: ['pdf', 'excel'],
      schedule: 'monthly'
    },
    {
      id: 'payout',
      name: 'Payout Report',
      description: 'Payout history and transaction details',
      icon: FileText,
      format: ['pdf', 'excel', 'csv'],
      schedule: 'weekly'
    },
    {
      id: 'performance',
      name: 'Performance Report',
      description: 'Store performance metrics and KPIs',
      icon: BarChart3,
      format: ['pdf'],
      schedule: 'monthly'
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Weekly Sales Report',
      type: 'sales',
      frequency: 'Weekly',
      nextRun: 'Tomorrow, 8:00 AM',
      format: 'PDF',
      status: 'active'
    },
    {
      id: 2,
      name: 'Monthly Revenue Report',
      type: 'revenue',
      frequency: 'Monthly',
      nextRun: 'Jan 1, 2024',
      format: 'Excel',
      status: 'active'
    },
    {
      id: 3,
      name: 'Daily Inventory Report',
      type: 'inventory',
      frequency: 'Daily',
      nextRun: 'Today, 9:00 PM',
      format: 'CSV',
      status: 'paused'
    }
  ];

  const recentDownloads = [
    {
      id: 1,
      name: 'Sales_Report_Dec_2023.pdf',
      date: 'Dec 15, 2023 • 10:30 AM',
      size: '2.4 MB',
      type: 'sales'
    },
    {
      id: 2,
      name: 'Inventory_Report_20231215.csv',
      date: 'Dec 15, 2023 • 8:15 AM',
      size: '1.8 MB',
      type: 'inventory'
    },
    {
      id: 3,
      name: 'Revenue_Report_Q4_2023.xlsx',
      date: 'Dec 10, 2023 • 4:45 PM',
      size: '3.2 MB',
      type: 'revenue'
    }
  ];

  const handleReportSelect = (reportId) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  const handleBulkDownload = () => {
    if (selectedReports.length === 0) {
      alert('Please select at least one report to download');
      return;
    }

    // In real app, this would generate and download reports
    alert(`Preparing ${selectedReports.length} report(s) for download...`);
    setSelectedReports([]);
  };

  const handleScheduleReport = (reportType) => {
    // In real app, this would open a scheduling modal
    alert(`Schedule ${reportType} report`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Download Reports</h1>
        <p className="text-gray-600">Generate and download business reports</p>
      </div>

      {/* Date Range Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Calendar className="text-gray-400" size={20} />
            <h3 className="font-medium">Select Date Range for Reports</h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">From:</span>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">To:</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded-lg"
              />
            </div>
            <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Report Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Select Reports</h3>
            <p className="text-sm text-gray-600">Choose reports to generate and download</p>
          </div>
          <div className="text-sm text-gray-600">
            {selectedReports.length} report{selectedReports.length !== 1 ? 's' : ''} selected
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            const isSelected = selectedReports.includes(report.id);
            
            return (
              <div
                key={report.id}
                onClick={() => handleReportSelect(report.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon size={20} className="text-gray-600" />
                  </div>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                  }`}>
                    {isSelected && <CheckCircle size={14} className="text-white" />}
                  </div>
                </div>
                <h4 className="font-medium">{report.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {report.format.map((format) => (
                      <span key={format} className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {format.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{report.schedule}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedReports(reportTypes.map(r => r.id))}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Select All Reports
            </button>
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Download as ZIP</option>
                <option>Combine into single PDF</option>
                <option>Separate files</option>
              </select>
              <button
                onClick={handleBulkDownload}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
              >
                <Download size={16} className="mr-2" />
                Download Selected ({selectedReports.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Scheduled Reports</h3>
            <p className="text-sm text-gray-600">Automated reports delivered on schedule</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            + New Schedule
          </button>
        </div>

        <div className="space-y-4">
          {scheduledReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg mr-4">
                  <Clock size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-gray-600">
                    {report.frequency} • Next: {report.nextRun} • Format: {report.format}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  report.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {report.status}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Downloads */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Recently Downloaded</h3>
        <div className="space-y-4">
          {recentDownloads.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-50 rounded-lg mr-4">
                  <FileText size={20} className="text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-sm text-gray-600">
                    Downloaded on {file.date} • {file.size}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Download size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <AlertCircle size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Advanced Report Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-3">Custom Reports</h4>
            <p className="text-sm text-gray-600 mb-4">
              Create custom reports with specific metrics and filters
            </p>
            <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
              Create Custom Report
            </button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-3">Email Reports</h4>
            <p className="text-sm text-gray-600 mb-4">
              Set up automatic email delivery for reports
            </p>
            <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
              Configure Email Delivery
            </button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium mb-3">API Access</h4>
            <p className="text-sm text-gray-600 mb-4">
              Access reports programmatically via API
            </p>
            <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
              View API Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReports;