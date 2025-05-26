import React, { useState, useEffect } from 'react';
import '../App.css';

const AddSubscriptionModal = ({ closeModal, saveSubscription, subscription }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    id: subscription ? subscription.id : null,
    name: subscription ? subscription.name : '',
    cost: subscription ? subscription.cost : '',
    freeTrial: subscription ? subscription.freeTrial : false,
    category: subscription ? subscription.category : '',
    chargeDate: subscription ? subscription.chargeDate : '',
    usageFrequency: subscription ? subscription.usageFrequency : '',
    usageHours: subscription ? subscription.usageHours : 0,
    importance: subscription ? subscription.importance : 'Optional',
    logo: subscription ? subscription.logo : 'https://via.placeholder.com/50',
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        id: subscription.id,
        name: subscription.name,
        cost: subscription.cost,
        freeTrial: subscription.freeTrial,
        category: subscription.category,
        chargeDate: subscription.chargeDate,
        usageFrequency: subscription.usageFrequency,
        usageHours: subscription.usageHours,
        importance: subscription.importance,
        logo: subscription.logo,
      });
    }
  }, [subscription]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  };

  const handleNext = () => {
    if (currentTab < 2) setCurrentTab((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentTab > 0) setCurrentTab((prev) => prev - 1);
  };

  const handleSave = () => {
    saveSubscription(formData);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const renderTab = () => {
    switch (currentTab) {
      case 0: // Subscription Tab
        return (
          <div className="tab-content">
            <h2>Subscription</h2>
            <label>
              Subscription Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Monthly Cost:
              <span>R </span>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
              />
            </label>
            <label className="toggle-label">
              Free Trial:
              <input
                type="checkbox"
                name="freeTrial"
                checked={formData.freeTrial}
                onChange={handleInputChange}
              />
              <span className="toggle-slider"></span>
            </label>
            <label>
              Category:
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="streaming">Streaming</option>
                <option value="productivity">Productivity</option>
              </select>
            </label>
            <label>
              Charge Date:
              <input
                type="date"
                name="chargeDate"
                value={formData.chargeDate}
                onChange={handleInputChange}
              />
            </label>
          </div>
        );
      case 1: // Usage Tab
        return (
          <div className="tab-content">
            <h2>Usage</h2>
            <label>
              Usage Frequency:
              <select
                name="usageFrequency"
                value={formData.usageFrequency}
                onChange={handleInputChange}
              >
                <option value="">Select Frequency</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </label>
            {formData.usageFrequency && (
              <label>
                Hours per {formData.usageFrequency}:
                <input
                  type="range"
                  name="usageHours"
                  min="0"
                  max="100"
                  value={formData.usageHours}
                  onChange={handleInputChange}
                />
                <span>{formData.usageHours} hours</span>
              </label>
            )}
            <label>
              Importance:
              <select
                name="importance"
                value={formData.importance}
                onChange={handleInputChange}
              >
                <option value="Optional">Optional (Red)</option>
                <option value="Regular">Regular (Yellow)</option>
                <option value="Essential">Essential (Blue)</option>
              </select>
            </label>
          </div>
        );
      case 2: // Review Tab
        return (
          <div className="tab-content">
            <h2>Review</h2>
            <p>Subscription Name: {formData.name}</p>
            <p>Monthly Cost: R {formData.cost}</p>
            <p>Free Trial: {formData.freeTrial ? 'Yes' : 'No'}</p>
            <p>Category: {formData.category}</p>
            <p>Charge Date: {formData.chargeDate}</p>
            <p>Usage: {formData.usageHours} hours/{formData.usageFrequency}</p>
            <p>Importance: {formData.importance}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="tab-nav">
          <span
            className={currentTab === 0 ? 'active-tab' : ''}
            onClick={() => handleTabClick(0)}
          >
            Subscription
          </span>
          <span
            className={currentTab === 1 ? 'active-tab' : ''}
            onClick={() => handleTabClick(1)}
          >
            Usage
          </span>
          <span
            className={currentTab === 2 ? 'active-tab' : ''}
            onClick={() => handleTabClick(2)}
          >
            Review
          </span>
        </div>
        {renderTab()}
        <div className="modal-footer">
          <button onClick={closeModal}>Cancel</button>
          {currentTab > 0 && (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {currentTab < 2 && <button onClick={handleNext}>Next</button>}
          {currentTab === 2 && <button onClick={handleSave}>{subscription ? 'Save' : 'Add'}</button>}
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;