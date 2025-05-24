import React from 'react';
import MerchantSidebar from './MerchantSidebar';
import '../DASHBOARD/Style/MerchantSalesHistory.css';

function MerchantSalesHistory() {
  const sales = [
    { id: 1, product: 'Cascading Ruffle Halter top', category: 'Apparel', amount: '$160', date: '04/25/2025', customer: 'Babalo Naniningil', status: 'Shipped', image: 'halter_top.png' },
    { id: 2, product: 'Cascading Ruffle Halter top', category: 'Apparel', amount: '$160', date: '04/25/2025', customer: 'Babalo Naniningil', status: 'Shipped', image: 'halter_top.png' },
    { id: 3, product: 'Cascading Ruffle Halter top', category: 'Apparel', amount: '$160', date: '04/25/2025', customer: 'Babalo Naniningil', status: 'Shipped', image: 'halter_top.png' },
    { id: 4, product: 'Cascading Ruffle Halter top', category: 'Apparel', amount: '$160', date: '04/25/2025', customer: 'Babalo Naniningil', status: 'Shipped', image: 'halter_top.png' },
    // Add more sales data here
  ];

  return (
    <div className="sales-history-page-with-sidebar">
      <MerchantSidebar />
      <div className="sales-history-content">
        <h2>Recently Sold</h2>
        <div className="sales-table-card">
          <ul className="sales-table-header">
            <li className="product">Product</li>
            <li className="category">Category</li>
            <li className="amount">Amount</li>
            <li className="date">Date</li>
            <li className="customer">Customer</li>
            <li className="status">Status</li>
          </ul>
          <ul className="sales-table-body">
            {sales.map((sale) => (
              <li key={sale.id} className="sale-row">
                <div className="product">
                  <div className="product-image">
                    <img src={`/images/${sale.image}`} alt={sale.product} onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.png"; }} />
                  </div>
                  <span>{sale.product}</span>
                </div>
                <span className="category">{sale.category}</span>
                <span className="amount">{sale.amount}</span>
                <span className="date">{sale.date}</span>
                <span className="customer">{sale.customer}</span>
                <span className={`status-pill ${sale.status.toLowerCase().replace(' ', '-')}`}>{sale.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MerchantSalesHistory;