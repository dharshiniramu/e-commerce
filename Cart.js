import React from 'react';
import { useCart } from './context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Access cart and removeFromCart from CartContext

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) =>
        total + (product.discountedPrice ? product.discountedPrice : product.price) * product.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((product) => (
            <div key={product._id} className="cart-item">
              <img src={product.image} alt={product.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h2 className="cart-item-name">{product.name}</h2>
                <p className="cart-item-price">
                  ${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)} x {product.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${calculateTotal()}</h3>
          <button className="checkout-button">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
