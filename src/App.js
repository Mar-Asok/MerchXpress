import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './COMPONENTS/LOGIN/LoginForm';
import SignupForm from './COMPONENTS/REGISTER/SignupForm';
import DashboardLayout from './COMPONENTS/DASHBOARD/Layout/DashboardLayout';
import Home from './COMPONENTS/DASHBOARD/Pages/home';
import MyProfile from './COMPONENTS/DASHBOARD/Pages/myprofile';
import OrderStatus from './COMPONENTS/DASHBOARD/Pages/OrderStatus';
import Transaction from './COMPONENTS/DASHBOARD/Pages/Transaction';
import Review from './COMPONENTS/DASHBOARD/Pages/Review';
import Feedback from './COMPONENTS/DASHBOARD/Pages/Feedback';
import Market from './COMPONENTS/DASHBOARD/Pages/market';
import CartPage from './COMPONENTS/DASHBOARD/Pages/CartPage'; // Import CartPage
import MerchantHomePage from './COMPONENTS/MERCHANT/MerchantHomePage'; // Import Merchant Dashboard
import MerchantProducts from './COMPONENTS/MERCHANT/MerchantProduct';
import MerchantSalesHistory from './COMPONENTS/MERCHANT/MerchantSalesHistory';
import MerchantRegistrationForm from './COMPONENTS/DASHBOARD/Pages/MerchantRegistrationForm'; // Import the registration form

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          <Route path="/dashboard" element={<DashboardLayout><Home /></DashboardLayout>} />
          <Route path="/dashboard/profile" element={<DashboardLayout><MyProfile /></DashboardLayout>} />
          <Route path="/dashboard/order-status" element={<DashboardLayout><OrderStatus /></DashboardLayout>} />
          <Route path="/dashboard/transactions" element={<DashboardLayout><Transaction /></DashboardLayout>} />
          <Route path="/dashboard/reviews" element={<DashboardLayout><Review /></DashboardLayout>} />
          <Route path="/dashboard/feedback" element={<DashboardLayout><Feedback /></DashboardLayout>} />
          <Route path="/market" element={<DashboardLayout><Market /></DashboardLayout>} />
          <Route path="/dashboard/cart" element={<DashboardLayout><CartPage /></DashboardLayout>} /> {/* Add this route */}

          {/* Merchant Routes */}
          <Route path="/merchant-dashboard" element={<MerchantHomePage />} />
          <Route path="/merchant/products" element={<MerchantProducts />} />
          <Route path="/merchant/sales" element={<MerchantSalesHistory />} />
          <Route path="/register" element={<MerchantRegistrationForm onClose={() => {}} onSubmit={() => {}} />} /> {/* New route for the registration form */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;