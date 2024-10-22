// client/src/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, price, discountedPrice, discountPercent, description, image } = product;

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${discountedPrice || price}</p>
        {discountedPrice && <p className="product-discount">Discount: {discountPercent}%</p>}
        <p className="product-description">{description}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
