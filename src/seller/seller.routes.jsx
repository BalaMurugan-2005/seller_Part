import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SellerLayout from './components/layout/SellerLayout';
import { useSellerAuth } from './hooks/useSellerAuth';

// Dashboard
import SellerDashboard from './pages/dashboard/SellerDashboard';

// Products
import ProductList from './pages/products/ProductList';
import AddProduct from './pages/products/AddProduct';
import EditProduct from './pages/products/EditProduct';
import ProductVariants from './pages/products/ProductVariants';
import BulkUpload from './pages/products/BulkUpload';

// Inventory
import InventoryManagement from './pages/inventory/InventoryManagement';

// Orders
import SellerOrders from './pages/orders/SellerOrders';
import OrderDetails from './pages/orders/OrderDetails';
import Packaging from './pages/orders/Packaging';

// Reports & Analytics
import SalesAnalytics from './pages/reports/SalesAnalytics';
import RevenueReport from './pages/reports/RevenueReport';
import DownloadReports from './pages/reports/DownloadReports';

// Payouts
import Payouts from './pages/payouts/Payouts';

// Profile
import SellerProfile from './pages/profile/SellerProfile';
import KYCVerification from './pages/profile/KYCVerification';
import BankDetails from './pages/profile/BankDetails';

// Settings
import SellerSettings from './pages/settings/SellerSettings';

// Auth
import SellerLogin from './pages/auth/SellerLogin';
import SellerRegister from './pages/auth/SellerRegister';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSellerAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/seller/login" />;
};

// Public Route Component (for auth pages when already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSellerAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/seller/dashboard" />;
};

const SellerRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <SellerLogin />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <SellerRegister />
          </PublicRoute>
        } 
      />

      {/* Protected Routes with Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <SellerDashboard />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <SellerDashboard />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Product Routes */}
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <ProductList />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/products/add" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <AddProduct />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/products/edit/:id" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <EditProduct />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/products/variants/:id?" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <ProductVariants />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/products/bulk-upload" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <BulkUpload />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Inventory Route */}
      <Route 
        path="/inventory" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <InventoryManagement />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Order Routes */}
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <SellerOrders />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/orders/:id" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <OrderDetails />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/orders/:id/pack" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <Packaging />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Analytics Routes */}
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <SalesAnalytics />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/reports/revenue" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <RevenueReport />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/reports/download" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <DownloadReports />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Payouts Route */}
      <Route 
        path="/payouts" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <Payouts />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Profile Routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <SellerProfile />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile/kyc" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <KYCVerification />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile/bank" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <BankDetails />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Settings Route */}
      <Route 
        path="/settings/*" 
        element={
          <ProtectedRoute>
            <SellerLayout>
              <SellerSettings />
            </SellerLayout>
          </ProtectedRoute>
        } 
      />

      {/* Catch-all redirects */}
      <Route path="*" element={<Navigate to="/seller/dashboard" />} />
    </Routes>
  );
};

export default SellerRoutes;