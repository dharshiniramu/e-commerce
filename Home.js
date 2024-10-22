import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import './Home.css'; // Make sure to update this file for carousel, footer, and other styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// FeaturedBrands Component
const FeaturedBrands = () => {
  const brands = [
    { name: 'Nike', logo: 'https://w0.peakpx.com/wallpaper/70/991/HD-wallpaper-cool-jordan-collections-cool-nike-background-jordan-logo-nike-background-red-jordan-logo-thumbnail.jpg' },
    { name: 'Apple', logo: 'https://photos5.appleinsider.com/gallery/52883-105798-000-lead-Apple-Store-online-xl.jpg' },
    { name: 'Sony', logo: 'https://www.sony.com/en/brand/motionlogo/shared/img/thumb_video3.jpg' },
    { name: 'Samsung', logo: 'https://images.samsung.com/is/image/samsung/assets/in/about-us/brand/logo/mo/256_144_4.png?$512_N_PNG$' },
    { name: 'H&M', logo: 'https://assets.turbologo.com/blog/en/2021/07/07050018/hm-color-logo.png' },
    { name: 'Fossil', logo: 'https://1000logos.net/wp-content/uploads/2020/09/Fossil-Logo.jpg' }
  ];

  return (
    <section className="featured-brands">
      <h2>Featured Brands</h2>
      <div className="brands-grid">
        {brands.map((brand) => (
          <div key={brand.name} className="brand-item">
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
          </div>
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>MDP.in</p>
          <p>Your go-to place for the best products, amazing deals, and customer satisfaction!</p>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@mdpin.com</li>
            <li>Phone: +91 6369981523</li>
            <li>Address: 10/7, Eros Plaza, Eros Corporate Centre, Nehru Place, New Delhi-110019</li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// Home Component
const Home = () => {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.slice(0, 5)); // Featured Products
        setNewArrivals(response.data.slice(5, 8)); // New Arrivals
        setBestSellers(response.data.slice(7, 11)); // Best Sellers
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <img src="/path-to-hero-image.jpg" alt="Hero" className="hero-image" />
        <div className="hero-content">
          <h1>Discover Your Next Favorite Thing!</h1>
          <p>Discover amazing deals on top-quality products!</p>
          <button className="cta-button" onClick={handleShopNowClick}>Shop Now</button>
        </div>
      </div>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <Slider {...settings}>
          {products.map(product => (
            <div key={product._id} className="carousel-item" onClick={() => handleProductClick(product._id)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <Slider {...settings}>
          {newArrivals.map(product => (
            <div key={product._id} className="carousel-item" onClick={() => handleProductClick(product._id)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <Slider {...settings}>
          {bestSellers.map(product => (
            <div key={product._id} className="carousel-item" onClick={() => handleProductClick(product._id)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>



      {/* Featured Brands */}
      <FeaturedBrands />

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>"Great products and fast shipping. Will definitely buy again!"</p>
          <span>- Mathi</span>
        </div>
        <div className="testimonial">
          <p>"Amazing customer service and top-quality items. Highly recommend!"</p>
          <span>- Dharshini</span>
        </div>
        <div className="testimonial">
          <p>"I love the variety and the great deals. My go-to store!"</p>
          <span>- Pavithra</span>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
