import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './context/CartContext';

import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [wishlistMessage, setWishlistMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.image); // Set initial main image
      } catch (error) {
        console.error('Error fetching the product', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleAddToWishlist = () => {
    const isProductInWishlist = wishlist.some((item) => item.productId === id);

    if (!isProductInWishlist) {
      const newProduct = {
        productId: id,
        name: product.name,
        image: product.image,
        price: product.discountedPrice || product.price,
      };

      const updatedWishlist = [...wishlist, newProduct];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlistMessage('Product added to wishlist!');
    } else {
      setWishlistMessage('Product is already in your wishlist.');
    }

    setTimeout(() => setWishlistMessage(''), 2000);
  };

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.productId !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleViewWishlist = () => {
    navigate('/wishlist');
  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product } });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="product-details">
      <div className="product-images">
        <img src={mainImage} alt={product.name} className="main-image" />
        <div className="thumbnails">
          {product.additionalImages && product.additionalImages.map((img, index) => (
            <div key={index} className="thumbnail">
              <img 
                src={img} 
                alt={`Thumbnail ${index}`} 
                onClick={() => handleImageClick(img)} 
              />
            </div>
          ))}
        </div>
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="price-section">
          {product.discountedPrice ? (
            <div className="price-container">
              <span className="discounted-price">₹{product.discountedPrice.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">
                  ₹{product.originalPrice.toFixed(2)}
                  {product.discountPercent && (
                    <span className="discount-percent"> {product.discountPercent}% off</span>
                  )}
                </span>
              )}
            </div>
          ) : (
            <span className="price">₹{product.price.toFixed(2)}</span>
          )}
        </div>
        <p className="description">{product.description}</p>
        
        {/* Add to Cart Button */}
        <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>        
        {/* Add to Wishlist Button */}
        <button onClick={handleAddToWishlist} className="add-to-wishlist-button">
          Add to Wishlist
        </button>

        {/* Buy Now Button */}
        <button onClick={handleBuyNow} className="buy-button">
          Buy Now
        </button>

        {wishlistMessage && <p className="wishlist-message">{wishlistMessage}</p>}
      </div>

      <div className="reviews">
        <h2>Customer Reviews</h2>
        {product.reviews && product.reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="rating">{'★'.repeat(review.rating)}</div>
            <p className="comment">{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="product-specifications">
        <div className="specifications-tabs">
          <div
            className={`specifications-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => handleTabChange('details')}
          >
            Details
          </div>
          <div
            className={`specifications-tab ${activeTab === 'additional' ? 'active' : ''}`}
            onClick={() => handleTabChange('additional')}
          >
            Additional Information
          </div>
        </div>
        <div className="specifications-content">
          {activeTab === 'details' && (
            <>
              <h3>Specifications</h3>
              <p>{product.specifications}</p>
            </>
          )}
          {activeTab === 'additional' && (
            <>
              <h3>Additional Information</h3>
              <p>{product.additionalInfo}</p>
            </>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default ProductDetails;