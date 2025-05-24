// COMPONENTS/DASHBOARD/Pages/CartPage.js
import React from 'react';
import '../Style/CartPage.css'; // Import CSS for styling

const CartPage = ({ cart, removeItem }) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        {/* Optionally add a link back to the market */}
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul className="cart-items-list">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">₱{item.price.toFixed(2)}</span>
              <span className="item-quantity">Quantity: {item.quantity}</span>
            </div>
            <span className="item-total">₱{(item.price * item.quantity).toFixed(2)}</span>
            <button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <strong>Total: ₱{cartTotal}</strong>
        <button className="checkout-button">Proceed to Checkout</button> {/* Add checkout functionality later */}
      </div>
    </div>
  );
};

export default CartPage;