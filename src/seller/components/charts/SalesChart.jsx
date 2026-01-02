import React from 'react';

const SalesChart = () => {
  const data = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 82000 },
    { month: 'Mar', revenue: 75000 },
    { month: 'Apr', revenue: 92000 },
    { month: 'May', revenue: 88000 },
    { month: 'Jun', revenue: 105000 },
    { month: 'Jul', revenue: 98000 },
    { month: 'Aug', revenue: 112000 },
    { month: 'Sep', revenue: 125000 },
    { month: 'Oct', revenue: 118000 },
    { month: 'Nov', revenue: 132000 },
    { month: 'Dec', revenue: 148000 },
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const minRevenue = Math.min(...data.map(d => d.revenue));

  return (
    <div className="w-full">
      <div className="relative h-64">
        {/* Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-12 gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-gray-100"></div>
          ))}
        </div>
        
        {/* Chart Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end h-48 space-x-1 px-2">
          {data.map((item, index) => {
            const height = ((item.revenue - minRevenue) / (maxRevenue - minRevenue)) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative group">
                  <div
                    className="w-10 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg transition-all duration-300 hover:opacity-90"
                    style={{ height: `${height}%`, minHeight: '10px' }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    ₹{item.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">{item.month}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-500 rounded mr-2"></div>
          <span>Monthly Revenue</span>
        </div>
        <div>
          <span className="font-medium">₹{maxRevenue.toLocaleString()}</span> Peak
        </div>
      </div>
    </div>
  );
};

export default SalesChart;