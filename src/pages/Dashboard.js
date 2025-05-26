// src/pages/Dashboard.js
import React from 'react';
import '../App.css';

const Dashboard = () => {
  return (
    <div className="dashboard-grid">
      <div className="grid-item">Active Subscriptions: 16</div>
      <div className="grid-item">New Subscriptions This Month: 6</div>
      <div className="grid-item">Free Trials Signed Up For This Month: 2</div>
      <div className="grid-item">Total Spent This Month: R470.00</div>
      <div className="grid-item">Low Usage Time: Subscription rarely used</div>
      <div className="grid-item">Add Subscription</div>
    </div>
  );
};

export default Dashboard;