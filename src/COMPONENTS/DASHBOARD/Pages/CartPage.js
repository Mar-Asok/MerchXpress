// COMPONENTS/DASHBOARD/Pages/CartPage.js
import React, { useEffect } from 'react'; // Import useEffect for debugging
import { useNavigate } from 'react-router-dom';
import '../Style/CartPage.css';

const CartPage = ({ cart, removeItem, updateQuantity }) => {
  const navigate = useNavigate();

  // Debugging: Log the cart whenever it changes in CartPage
  useEffect(() => {
    console.log("CartPage: Cart state received (on render/update):", cart);
    if (cart.length > 0) {
      cart.forEach(item => {
        console.log(`  CartPage: Item in cart - ID: "${item.id}", Name: "${item.name}", Quantity: ${item.quantity}`);
      });
    } else {
      console.log("CartPage: Cart is currently empty.");
    }
  }, [cart]); // Dependency array includes 'cart' so it runs when cart changes

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button
          className="back-to-market-btn"
          onClick={() => navigate('/market')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckoutForItem = (itemToCheckout) => {
    navigate('/dashboard/checkout', { state: { itemsToCheckout: [itemToCheckout] } });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Ensure newQuantity is a number and at least 1
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    console.log(`CartPage: Updating quantity for item ID: "${itemId}" to ${quantity}`); // Debugging
    if (updateQuantity) {
      updateQuantity(itemId, quantity);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul className="cart-items-list">
        {cart.map(item => (
          // IMPORTANT: key should be truly unique and stable. item.id is used.
          <li key={item.id} className="cart-item">
            <div className="item-details">
              <img src={item.image || '/images/default-product.jpg'} alt={item.name} className="item-image" />
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">₱{item.price.toFixed(2)}</span>
                <div className="item-quantity">
                  <label>Quantity: </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="quantity-input"
                  />
                </div>
              </div>
            </div>
            <span className="item-total">₱{(item.price * item.quantity).toFixed(2)}</span>
            <div className="item-actions">
                <button
                    className="remove-item"
                    onClick={() => {
                        console.log(`CartPage: Clicked Remove for item ID: "${item.id}"`); // <--- CRITICAL CHECK
                        removeItem(item.id);
                    }}
                >
                    Remove
                </button>
                <button
                    className="checkout-item-btn"
                    onClick={() => handleCheckoutForItem(item)}
                >
                    Checkout Item
                </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <strong>Total for all items in cart: ₱{cartTotal}</strong>
        {/* If you want a "Checkout All" button, uncomment this: */}
        {/* <button className="checkout-button" onClick={() => navigate('/dashboard/checkout', { state: { itemsToCheckout: cart } })}>
          Proceed to Checkout All Items
        </button> */}
      </div>
    </div>
  );
};

export default CartPage;