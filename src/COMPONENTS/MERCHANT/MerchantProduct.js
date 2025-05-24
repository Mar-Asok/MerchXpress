import React, { useState } from 'react';
import MerchantSidebar from './MerchantSidebar';
import '../DASHBOARD/Style/MerchantProducts.css';
import AddProductModal from './AddProductModal';
import '../DASHBOARD/Style/Notification.css';

function MerchantProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Product Name', category: 'Category', quantity: 46, amount: '$2', status: 'In stock', image: 'placeholder_product.png' },
    { id: 2, name: 'Product Name', category: 'Category', quantity: 46, amount: '$2', status: 'In stock', image: 'placeholder_product.png' },
    { id: 3, name: 'Product Name', category: 'Category', quantity: 46, amount: '$2', status: 'In stock', image: 'placeholder_product.png' },
    { id: 4, name: 'Product Name', category: 'Category', quantity: 46, amount: '$2', status: 'In stock', image: 'placeholder_product.png' },
  ]);
  const [notification, setNotification] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now(), status: newProduct.status || '' }]);
    closeModal();
    setNotification('Product added successfully!');
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    console.log('New product submitted:', newProduct);
  };

  return (
    <div className="products-page-with-sidebar">
      <MerchantSidebar />
      <div className="products-content">
        <h2>Your Products</h2>
        <div className="products-table-card">
          <ul className="products-table-header">
            <li className="product">Product</li>
            <li className="category">Category</li>
            <li className="quantity">Quantity</li>
            <li className="amount">Amount</li>
            <li className="status">Status</li>
          </ul>
          <ul className="products-table-body">
            {products.map((product) => (
              <li key={product.id} className="product-row">
                <div className="product">
                  <div className="product-image">
                    <img src={`/images/${product.image}`} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.png"; }} />
                  </div>
                  <span>{product.name}</span>
                </div>
                <span className="category">{product.category}</span>
                <span className="quantity">{product.quantity}</span>
                <span className="amount">{product.amount}</span>
                <div className="status">
                  <span className={`status-select ${product.status?.toLowerCase()?.replace(' ', '-')}`}>
                    {product.status} ▾
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="add-product-button-area">
            <button className="add-product-button" onClick={openModal}>
              <i className="fas fa-plus-circle"></i> Add Product
            </button>
          </div>
        </div>

        {isModalOpen && <AddProductModal onClose={closeModal} onSubmit={handleAddProduct} />}
        {notification && <div className="notification success">{notification}</div>}
      </div>
    </div>
  );
}

export default MerchantProducts;