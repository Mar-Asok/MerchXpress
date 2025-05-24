import React, { useState } from 'react';
import '../DASHBOARD/Style/AddProductModal.css'; // Create this CSS

function AddProductModal({ onClose, onSubmit }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null); // For image upload

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      description: productDescription,
      image: productImage ? productImage.name : 'placeholder_product.png', // Example
      // Add other relevant fields
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
  };

  return (
    <div className="add-product-modal-overlay">
      <div className="add-product-modal">
        <div className="modal-header">
          <h2>PRODUCT ADDITION</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="image-upload-area">
            <div className="upload-icon">
              <i className="fas fa-image fa-3x"></i>
              <i className="fas fa-plus"></i>
            </div>
            <label htmlFor="image-input" className="add-image-label">Add product image</label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {productImage && <p>Selected: {productImage.name}</p>}
          </div>
          <div className="input-fields">
            <input
              type="text"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <div className="price-quantity">
              <input
                type="number"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Product Quantity"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
            <textarea
              placeholder="Insert description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;