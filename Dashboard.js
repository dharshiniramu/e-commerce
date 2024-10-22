import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <span className="logo">amazon seller central</span>
        </div>
        <div className="header-right">
          <span className="language-selector">English</span>
          <span className="account">Account</span>
          <span className="help">Help</span>
        </div>
      </header>

      <nav className="nav">
        <span>Catalogue</span>
        <span>Inventory</span>
        <span>Pricing</span>
        <span>Orders</span>
        <span>Reports</span>
        <span>Performance</span>
        <span>Appstore</span>
        <span>B2B</span>
      </nav>

      <div className="main-content">
        <div className="left-panel">
          <div className="panel-section box">
            <h3>Your Orders</h3>
            <ul>
              <li>Pending</li>
              <li>Guaranteed Delivery Unshipped</li>
              <li>Unshipped</li>
              <li>Return Requests</li>
            </ul>
          </div>

          <div className="panel-section box">
            <h3>Performance</h3>
            <ul>
              <li>Buyer Messages</li>
              <li>A-to-Z Guarantee Claims</li>
              <li>Returns Performance</li>
            </ul>
          </div>
        </div>

        <div className="center-panel">
          <div className="news-section box">
            <h3>News</h3>
            <p>
              Celebrate this Diwali with 95% discount on FBA Storage...
            </p>
          </div>

          <div className="selling-coach box">
            <h3>Amazon Selling Coach</h3>
            <p>What type of products would you like to sell?</p>
            <input
              type="text"
              placeholder="Enter your preferences..."
            />
          </div>
        </div>

        <div className="right-panel">
          <div className="panel-section box">
            <h3>Payments Summary</h3>
            <p>Deposit method information is missing...</p>
          </div>

          <div className="panel-section box">
            <h3>Manage Your Case Log</h3>
            <p>View your case log</p>
          </div>

          <div className="panel-section box">
            <h3>Sales Summary</h3>
            <p>Sales summary info...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
