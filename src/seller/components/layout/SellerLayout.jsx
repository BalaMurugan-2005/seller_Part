import React from 'react';
import SellerSidebar from './SellerSidebar';
import SellerHeader from './SellerHeader';

const SellerLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <div className="flex-1 flex flex-col">
        <SellerHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;