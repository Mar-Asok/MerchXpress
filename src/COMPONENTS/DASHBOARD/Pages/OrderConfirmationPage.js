// src/COMPONENTS/DASHBOARD/Pages/OrderConfirmationPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Style/OrderConfirmationPage.css'; // Create this CSS file

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from navigation state
    if (location.state && location.state.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    } else {
      // If no order details, redirect to market or cart
      console.warn("No order details found. Redirecting to market.");
      navigate('/market');
    }
  }, [location.state, navigate]);

  if (!orderDetails) {
    return (
      <div className="order-confirmation-page">
        <p>Loading order details or redirecting...</p>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <h1>🎉 Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been successfully placed.</p>
          <p>Order ID: <strong>#{orderDetails.id}</strong></p>
        </div>

        <div className="order-details-section">
          <h2>Order Summary</h2>
          <div className="summary-items-list">
            {orderDetails.items && orderDetails.items.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.product_name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₱{orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Delivery Fee:</span>
              <span>₱{orderDetails.delivery_fee.toFixed(2)}</span>
            </div>
            <div className="total-row final-total-row">
              <span>Total Paid:</span>
              <span>₱{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="customer-info-section">
          <h2>Customer & Shipping Information</h2>
          <p><strong>Name:</strong> {orderDetails.first_name} {orderDetails.last_name}</p>
          <p><strong>Email:</strong> {orderDetails.email}</p>
          <p><strong>Phone:</strong> {orderDetails.phone}</p>
          <p><strong>Shipping Address:</strong> {orderDetails.street}, {orderDetails.barangay}, {orderDetails.city}, {orderDetails.province}, {orderDetails.zip_code}</p>
          <p><strong>Payment Method:</strong> {orderDetails.payment_method.toUpperCase()}</p>
          {orderDetails.order_notes && <p><strong>Notes:</strong> {orderDetails.order_notes}</p>}
        </div>

        <div className="confirmation-footer">
          <button className="back-to-market-btn" onClick={() => navigate('/market')}>
            Continue Shopping
          </button>
          {/* You might add a button to view past orders if you implement that feature */}
          {/* <button className="view-orders-btn" onClick={() => navigate('/dashboard/my-orders')}>
            View My Orders
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;