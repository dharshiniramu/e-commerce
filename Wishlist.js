import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.productId !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="wishlist">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-items">
          {wishlist.map(item => (
            <li key={item.productId} className="wishlist-item">
              <div className="wishlist-item-info">
                <img src={item.image} alt={item.name} className="wishlist-item-image" />
                <div className="wishlist-item-details">
                  <h2>{item.name}</h2>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <button className="view-product-button" onClick={() => handleViewProduct(item.productId)}>View Product</button>
                  <button className="remove-button" onClick={() => handleRemoveFromWishlist(item.productId)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;