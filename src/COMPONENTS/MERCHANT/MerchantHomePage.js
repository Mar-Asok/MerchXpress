import React from 'react';
import MerchantSidebar from './MerchantSidebar';
import '../DASHBOARD/Style/MerchantHomePage.css';

function MerchantHomePage() {
  // Sample chart data
  const chartData = [
    { month: 'Jan', sales: 50 },
    { month: 'Feb', sales: 80 },
    { month: 'Mar', sales: 150 },
    { month: 'Apr', sales: 100 },
    { month: 'May', sales: 120 },
    { month: 'Jun', sales: 200 },
    { month: 'Jul', sales: 180 },
    { month: 'Aug', sales: 90 },
    { month: 'Sep', sales: 110 },
    { month: 'Oct', sales: 130 },
    { month: 'Nov', sales: 160 },
    { month: 'Dec', sales: 140 },
  ];

  const maxSales = Math.max(...chartData.map(data => data.sales));
  const chartHeight = 100; // Adjust as needed
  const chartWidth = 200; // Adjust as needed
  const barWidth = chartWidth / chartData.length;

  return (
    <div className="merchant-home-page-container">
      <MerchantSidebar />
      <div className="merchant-home-page-content">
        <header className="merchant-header">
          <div className="merchant-header-title">
            Merchant Shop Name <span role="img" aria-label="edit">✏️</span>
          </div>
        </header>

        <main className="merchant-main-content">
          <div className="dashboard-grid">
            {/* Sales Chart */}
            <div className="sales-chart-card">
              <div className="chart-header">
                <div className="monthly-selector">Monthly ▾</div>
              </div>
              <div className="chart-area">
                <svg width={chartWidth} height={chartHeight}>
                  {chartData.map((data, index) => {
                    const barHeight = (data.sales / maxSales) * chartHeight;
                    const x = index * barWidth;
                    const y = chartHeight - barHeight;
                    return (
                      <rect
                        key={index}
                        x={x}
                        y={y}
                        width={barWidth - 2}
                        height={barHeight}
                        fill="#81d4fa"
                      />
                    );
                  })}
                </svg>
                <div className="chart-labels">
                  {chartData.map((data, index) => (
                    <span key={index} style={{ position: 'absolute', bottom: '-15px', left: `${index * barWidth + barWidth / 2 - 10}px`, fontSize: '0.7em' }}>
                      {data.month}
                    </span>
                  ))}
                </div>
              </div>
              <div className="chart-summary">
                <div className="total-sales-label">Total Sales</div>
                <div className="sales-count">{chartData.reduce((sum, data) => sum + data.sales, 0)} units</div>
                <div className="sales-month">This Month</div>
                <div className="earnings-label">Earnings</div>
                <div className="earnings-amount">${chartData.reduce((sum, data) => sum + (data.sales * 25), 0).toFixed(2)}</div> {/* Assuming a price per unit */}
                <div className="earnings-month">This Month</div>
              </div>
            </div>

            {/* Current Balance */}
            <div className="balance-card">
              <div className="balance-header">Current Balance</div>
              <div className="balance-amount">1, 200, 000 .00</div>
              <button className="withdraw-button">Withdraw now</button>
            </div>

            {/* Sold Products */}
            <div className="info-card sold-products-card">
              <div className="info-icon">
                <span role="img" aria-label="shopping-bag" style={{ fontSize: '2em', color: '#4fc3f7' }}>🛍️</span>
              </div>
              <div className="info-value">590</div>
              <div className="info-label">Sold Products</div>
            </div>

            {/* New Orders */}
            <div className="info-card new-orders-card">
              <div className="info-icon">
                <span role="img" aria-label="clipboard-check" style={{ fontSize: '2em', color: '#ba68c8' }}>✔️</span>
              </div>
              <div className="info-value">15</div>
              <div className="info-label">New Orders</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MerchantHomePage;