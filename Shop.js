import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('none');
  const [tempSortOption, setTempSortOption] = useState('none'); // Temporary sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching the products', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products]);

  const filterProducts = () => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setTempSortOption(e.target.value);
  };

  const applySort = () => {
    let sorted = [...filteredProducts];
    if (tempSortOption === 'asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (tempSortOption === 'desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (tempSortOption === 'low-high') {
      sorted.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
    } else if (tempSortOption === 'high-low') {
      sorted.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
    }
    setFilteredProducts(sorted);
    setSortOption(tempSortOption); // Save the selected sort option
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="shop-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="sorting-container">
          <select value={tempSortOption} onChange={handleSortChange} className="sort-select">
            <option value="none">Sort By</option>
            <option value="asc">Alphabetical (A-Z)</option>
            <option value="desc">Alphabetical (Z-A)</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
          <button onClick={applySort} className="apply-button">Apply</button>
        </div>
      </div>
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">
                  ${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
                </p>
                <Link to={`/products/${product._id}`} className="details-link">View Details</Link>
                <button onClick={() => handleAddToCart(product)} className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
