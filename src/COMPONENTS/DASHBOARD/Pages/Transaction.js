// Transaction.js
import React, { useState } from 'react';
import '../Style/Transaction.css';

const Transaction = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      seller: "Marielle's SodaHouse",
      productName: "Sprite Lemon-Lime",
      quantity: 20,
      price: 10,
      totalAmount: 200,
      dateOrdered: "4/2/2025",
      image: null
    },
    {
      id: 2,
      seller: "Marielle's SodaHouse",
      productName: "Coca-Cola Zero Limited Edition",
      quantity: 20,
      price: 10,
      totalAmount: 200,
      dateOrdered: "4/2/2025",
      image: null
    },
    {
      id: 3,
      seller: "Marielle's SodaHouse",
      productName: "Coca-Cola Zero Limited Edition",
      quantity: 20,
      price: 10,
      totalAmount: 200,
      dateOrdered: "4/2/2025",
      image: null
    },
    {
      id: 4,
      seller: "Marielle's SodaHouse",
      productName: "Coca-Cola Zero Limited Edition",
      quantity: 20,
      price: 10,
      totalAmount: 200,
      dateOrdered: "4/2/2025",
      image: null
    },
    {
      id: 5,
      seller: "Marielle's SodaHouse",
      productName: "Premium Beverage",
      quantity: 15,
      price: 12,
      totalAmount: 180,
      dateOrdered: "4/1/2025",
      image: null
    }
  ]);

  const handleActionClick = (transactionId) => {
    console.log(`Action clicked for transaction ${transactionId}`);
    // Add your action logic here (pause, cancel, etc.)
  };

  const formatCurrency = (amount) => {
    return `$${amount}`;
  };

  const getProductIcon = (productName) => {
    if (productName.toLowerCase().includes('sprite')) {
      return '🥤';
    } else if (productName.toLowerCase().includes('coca') || productName.toLowerCase().includes('coke')) {
      return '🥤';
    }
    return '🍹';
  };

  return (
    <div className="transaction-container">
      {/* Background Decorative Circles */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>
      <div className="bg-circle bg-circle-4"></div>

      <div className="transaction-content">
        {/* Header */}
        <div className="transaction-header">
          <div className="header-icon">💳</div>
          <h1 className="transaction-title">Recent Transactions</h1>
        </div>

        {/* Transaction List */}
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              {/* Product Image */}
              <div className="product-image">
                {transaction.image ? (
                  <img src={transaction.image} alt={transaction.productName} />
                ) : (
                  <span className="product-placeholder">
                    {getProductIcon(transaction.productName)}
                  </span>
                )}
              </div>

              {/* Transaction Details */}
              <div className="transaction-details">
                <div className="seller-name">
                  Seller: {transaction.seller}
                </div>
                <div className="transaction-info">
                  <div className="info-item">
                    <span className="info-label">Quantity:</span>
                    <span className="info-value">{transaction.quantity}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Price:</span>
                    <span className="info-value price-value">
                      {formatCurrency(transaction.price)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total Amount:</span>
                    <span className="info-value total-amount">
                      {formatCurrency(transaction.totalAmount)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date Ordered:</span>
                    <span className="info-value date-value">
                      {transaction.dateOrdered}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className="action-button"
                onClick={() => handleActionClick(transaction.id)}
                title="Pause Transaction"
              >
                <div className="pause-icon"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;