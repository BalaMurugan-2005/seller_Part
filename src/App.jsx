
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SellerRoutes from './seller/seller.routes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/seller/*" element={<SellerRoutes />} />
        <Route path="/" element={<Navigate to="/seller/dashboard" />} />
        <Route path="*" element={<Navigate to="/seller/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;