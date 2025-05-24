// OrderStatus.js
import React, { useState } from 'react';
import '../Style/OrderStatus.css';
import '../Style/Transaction.css'; // Import Transaction's CSS

const OrderStatus = () => {
  // Sample order data with initial status
  const [orders, setOrders] = useState([
    { id: 1, orderName: 'Order #1001', quantity: 25, status: 'to ship' },
    { id: 2, orderName: 'Order #1002', quantity: 12, status: 'in transit' },
    { id: 3, orderName: 'Order #1003', quantity: 8, status: 'completed' },
    { id: 4, orderName: 'Order #1004', quantity: 15, status: 'to ship' },
    { id: 5, orderName: 'Order #1005', quantity: 30, status: 'in transit' },
    { id: 6, orderName: 'Order #1006', quantity: 5, status: 'completed' },
    { id: 7, orderName: 'Order #1007', quantity: 20, status: 'to ship' },
    { id: 8, orderName: 'Order #1008', quantity: 18, status: 'in transit' },
    { id: 9, orderName: 'Order #1009', quantity: 22, status: 'completed' },
  ]);

  const statusOptions = ['to ship', 'in transit', 'completed'];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in transit':
        return 'status-in-transit';
      case 'to ship':
        return 'status-to-ship';
      default:
        return 'status-default';
    }
  };

  const capitalizeStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="order-status-container transaction-container"> {/* Added transaction-container class */}
      {/* Background Decorative Circles */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>
      <div className="bg-circle bg-circle-4"></div>

      <div className="order-status-wrapper transaction-content"> {/* Using transaction-content for inner styling */}
        {/* Header */}
        <div className="header-grid">
          <div className="header-cell">Orders</div>
          <div className="header-cell">Quantity</div>
          <div className="header-cell">Status</div>
        </div>

        {/* Order Rows */}
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order.id} className="order-row">
              {/* Order Column */}
              <div className="order-cell">
                <div className="order-info">
                  {order.orderName}
                </div>
              </div>

              {/* Quantity Column */}
              <div className="order-cell">
                <div className="quantity-info">
                  {order.quantity}
                </div>
              </div>

              {/* Status Column */}
              <div className="order-cell">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={`status-dropdown ${getStatusClass(order.status)}`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {capitalizeStatus(status)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="summary-footer">
          <div className="summary-text">
            Total Orders: {orders.length} |
            To Ship: {orders.filter(o => o.status === 'to ship').length} |
            In Transit: {orders.filter(o => o.status === 'in transit').length} |
            Completed: {orders.filter(o => o.status === 'completed').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;